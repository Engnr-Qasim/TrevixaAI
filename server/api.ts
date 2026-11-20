import express from 'express';
import { clerkMiddleware, getAuth } from '@clerk/express';
import { generateTripWithGemini, TripGenerationError } from './geminiService.js';
import { tripRequest } from './tripRequest.js';

const api = express();
api.disable('x-powered-by');
api.use('/api', (_req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

api.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

function allowedOrigins() {
  return (process.env.CLERK_AUTHORIZED_PARTIES ??
    (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000,http://127.0.0.1:3000'))
    .split(',').map(origin => origin.trim()).filter(Boolean);
}

api.post('/api/generate-trip', (req, res, next) => {
  if (!/^Bearer \S+$/i.test(req.get('authorization') ?? '')) {
    res.status(401).json({ success: false, error: 'Sign in to generate a trip.' });
    return;
  }

  const secretKey = process.env.CLERK_SECRET_KEY?.trim();
  const publishableKey = process.env.VITE_CLERK_PUBLISHABLE_KEY?.trim();
  const authorizedParties = allowedOrigins();

  if (!secretKey || !publishableKey || authorizedParties.length === 0) {
    res.status(503).json({ success: false, error: 'Trip authentication is temporarily unavailable.' });
    return;
  }

  clerkMiddleware({ secretKey, publishableKey, authorizedParties })(req, res, next);
}, (req, res, next) => {
  const auth = getAuth(req, { acceptsToken: 'session_token' });
  if (!auth.isAuthenticated || !auth.userId || !auth.sessionId ||
      !auth.sessionClaims.azp ||
      !allowedOrigins().includes(auth.sessionClaims.azp)) {
    res.status(401).json({ success: false, error: 'Your session could not be verified. Please sign in again.' });
    return;
  }
  if (!req.is('application/json')) {
    res.status(415).json({ success: false, error: 'Send trip details as JSON.' });
    return;
  }
  next();
}, express.json({ limit: '16kb' }), async (req, res) => {
  const result = tripRequest.safeParse(req.body);
  if (!result.success) {
    const fields = [...new Set(result.error.issues.map(issue => issue.path[0] ?? 'request'))];
    res.status(400).json({ success: false, error: `Check your trip details (${fields.join(', ')}).` });
    return;
  }
  try {
    res.json({ success: true, data: await generateTripWithGemini(result.data) });
  } catch (error) {
    const failure = error instanceof TripGenerationError ? error : new TripGenerationError(500, 'Trip generation failed. Please try again.');
    res.status(failure.status).json({ success: false, error: failure.message });
  }
});

api.use('/api', (_req, res) => {
  res.status(404).json({ success: false, error: 'API route not found.' });
});

const handleApiError: express.ErrorRequestHandler = (error, _req, res, _next) => {
  if (res.headersSent) {
    res.end();
    return;
  }
  const status = error.type === 'entity.too.large' ? 413 : error.type === 'entity.parse.failed' ? 400 : 503;
  const message = status === 413 ? 'Trip details are too large.' :
    status === 400 ? 'Trip details contain invalid JSON.' : 'Trip authentication is temporarily unavailable.';
  res.status(status).json({ success: false, error: message });
};
api.use(handleApiError);

export default api;
