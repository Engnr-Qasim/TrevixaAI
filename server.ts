import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { generateTripWithGemini } from './server/geminiService.js';

dotenv.config();
console.log("Gemini Key:", process.env.GEMINI_API_KEY);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check route
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      hasGeminiKey: !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY',
      timestamp: new Date().toISOString(),
    });
  });

  // Gemini AI Trip Generation endpoint
  app.post('/api/generate-trip', async (req, res) => {
    try {
      const tripParams = req.body || {};
      const generatedData = await generateTripWithGemini(tripParams);
      res.json({ success: true, data: generatedData });
    } catch (error: any) {
      console.error('Error generating trip with Gemini:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'An unexpected error occurred while generating the itinerary.',
      });
    }
  });

  // Vite development middleware or static serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Trevixa server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
