import express from 'express';
import path from 'node:path';
import dotenv from 'dotenv';
import api from './server/api.js';

if (process.argv.includes('--production')) process.env.NODE_ENV = 'production';

dotenv.config({ path: ['.env.local', '.env'], quiet: true });

async function startServer() {
  const app = express();
  app.disable('x-powered-by');
  app.use(api);

  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({ server: { middlewareMode: true }, appType: 'spa' });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve('dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => res.sendFile(path.join(distPath, 'index.html')));
  }

  const port = Number(process.env.PORT ?? 3000);
  app.listen(port, () => console.log(`Trevixa server listening on port ${port}.`));
}

startServer().catch(() => {
  console.error('Trevixa could not start.');
  process.exitCode = 1;
});
