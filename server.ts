import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { generateBilingualSection } from './server/geminiGenerator';
import type { SectionId } from './src/data/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VALID_SECTIONS: SectionId[] = ['1A', '1B', '2', '3'];

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'rrb-station-master-cen-08-2026' });
  });

  app.post('/api/generate-mock', async (req, res) => {
    try {
      const { sectionId, seed } = req.body as {
        sectionId?: string;
        seed?: string;
      };

      if (!sectionId || !VALID_SECTIONS.includes(sectionId as SectionId)) {
        res.status(400).json({
          error: 'Invalid sectionId. Must be one of: 1A, 1B, 2, 3.',
        });
        return;
      }

      const safeSeed =
        typeof seed === 'string' && seed.trim().length > 0
          ? seed.trim().slice(0, 64)
          : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

      const result = await generateBilingualSection(
        sectionId as SectionId,
        safeSeed
      );
      res.json(result);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Failed to generate bilingual mock section.';
      const status =
        message.includes('GEMINI_API_KEY') ? 503 : 500;
      res.status(status).json({ error: message });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
