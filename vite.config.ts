import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import {
  validateContactPayload,
  sendContactEmail,
  checkRateLimit,
} from './server/contactHandler.ts';

function contactApiPlugin(): Plugin {
  return {
    name: 'contact-api-middleware',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
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

        // Parse Request Body
        const chunks: Buffer[] = [];
        try {
          for await (const chunk of req) {
            chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
          }
          const raw = Buffer.concat(chunks).toString('utf-8');
          const bodyData = JSON.parse(raw);

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
        } catch {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, message: 'Invalid JSON payload.' }));
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  return {
    plugins: [
      react(),
      tailwindcss(),
      contactApiPlugin(),
    ],
  };
});
