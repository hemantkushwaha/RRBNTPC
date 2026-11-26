import type { IncomingMessage, ServerResponse } from 'http';
import { generateBilingualSection } from '../server/geminiGenerator';
import type { SectionId } from '../src/data/types';

interface VercelRequest extends IncomingMessage {
  body?: { sectionId?: string; seed?: string } | string;
  method?: string;
}

interface VercelResponse extends ServerResponse {
  status: (code: number) => VercelResponse;
  json: (payload: unknown) => void;
}

const VALID_SECTIONS: SectionId[] = ['1A', '1B', '2', '3'];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
    return;
  }

  try {
    const body =
      typeof req.body === 'string' ? JSON.parse(req.body) : req.body ?? {};
    const { sectionId, seed } = body as { sectionId?: string; seed?: string };

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
    res.status(200).json(result);
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : 'Failed to generate bilingual mock section.';
    res.status(message.includes('GEMINI_API_KEY') ? 503 : 500).json({
      error: message,
    });
  }
}
