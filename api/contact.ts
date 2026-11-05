import type { IncomingMessage, ServerResponse } from 'http';
import {
  validateContactPayload,
  sendContactEmail,
  checkRateLimit,
} from '../server/contactHandler';

export default async function handler(req: IncomingMessage & { body?: any }, res: ServerResponse) {
  // CORS & Methods
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, message: 'Method Not Allowed' }));
    return;
  }

  // Rate Limiting
  const clientIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    '127.0.0.1';

  if (!checkRateLimit(clientIp)) {
    res.statusCode = 429;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        success: false,
        message: 'Too many requests. Please wait a few minutes before submitting again.',
      })
    );
    return;
  }

  // Parse Body
  let bodyData: any = req.body;
  if (!bodyData) {
    try {
      const chunks: Buffer[] = [];
      for await (const chunk of req) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
      }
      const raw = Buffer.concat(chunks).toString('utf-8');
      bodyData = JSON.parse(raw);
    } catch {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: false, message: 'Invalid JSON payload.' }));
      return;
    }
  }

  // Validation & Sanitization
  const validation = validateContactPayload(bodyData);
  if (!validation.valid || !validation.sanitized) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, message: validation.error }));
    return;
  }

  // Dispatch Email
  const result = await sendContactEmail(validation.sanitized);
  res.statusCode = result.status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ success: result.success, message: result.message }));
}
