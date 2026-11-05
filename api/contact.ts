import type { IncomingMessage, ServerResponse } from 'http';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

export interface ContactPayload {
  name?: string;
  email?: string;
  topic?: string;
  message?: string;
  _gotcha?: string;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
  sanitized?: {
    name: string;
    email: string;
    topic: string;
    message: string;
  };
}

// In-memory rate limiting store
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (entry && now > entry.resetTime) {
    rateLimitMap.delete(ip);
  }

  const current = rateLimitMap.get(ip);
  if (!current) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return false;
  }

  current.count += 1;
  return true;
}

export function validateContactPayload(data: ContactPayload): ValidationResult {
  // 1. Spam Honeypot Check
  if (data._gotcha && data._gotcha.trim() !== '') {
    return { valid: false, error: 'Spam submission detected by honeypot verification.' };
  }

  // 2. Name validation
  const rawName = (data.name || '').trim();
  if (!rawName) {
    return { valid: false, error: 'Name is required.' };
  }
  if (rawName.length > 100) {
    return { valid: false, error: 'Name must not exceed 100 characters.' };
  }
  const sanitizedName = rawName.replace(/[\r\n]/g, ' ');

  // 3. Email validation
  const rawEmail = (data.email || '').trim().toLowerCase();
  if (!rawEmail) {
    return { valid: false, error: 'Email address is required.' };
  }
  if (rawEmail.length > 120) {
    return { valid: false, error: 'Email must not exceed 120 characters.' };
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(rawEmail)) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }
  const sanitizedEmail = rawEmail.replace(/[\r\n]/g, '');

  // 4. Topic / Subject validation
  const rawTopic = (data.topic || 'General Inquiry').trim();
  if (rawTopic.length > 150) {
    return { valid: false, error: 'Subject topic must not exceed 150 characters.' };
  }
  const sanitizedTopic = rawTopic.replace(/[\r\n]/g, ' ');

  // 5. Message validation
  const rawMessage = (data.message || '').trim();
  if (!rawMessage) {
    return { valid: false, error: 'Message content is required.' };
  }
  if (rawMessage.length < 5) {
    return { valid: false, error: 'Message must be at least 5 characters long.' };
  }
  if (rawMessage.length > 4000) {
    return { valid: false, error: 'Message must not exceed 4,000 characters.' };
  }

  return {
    valid: true,
    sanitized: {
      name: sanitizedName,
      email: sanitizedEmail,
      topic: sanitizedTopic,
      message: rawMessage,
    },
  };
}

export async function sendContactEmail(sanitized: {
  name: string;
  email: string;
  topic: string;
  message: string;
}): Promise<{ success: boolean; message: string; status: number }> {
  const recipientEmail =
    process.env.CONTACT_RECIPIENT_EMAIL || 'divyanshugangwar663@gmail.com';

  const web3formsKey =
    process.env.WEB3FORMS_ACCESS_KEY || process.env.VITE_WEB3FORMS_ACCESS_KEY;
  const resendKey = process.env.RESEND_API_KEY;

  // Option 1: Web3Forms Dispatch
  if (web3formsKey && web3formsKey.trim() !== '' && !web3formsKey.includes('your_')) {
    const payload = JSON.stringify({
      access_key: web3formsKey.trim(),
      name: sanitized.name,
      email: sanitized.email,
      reply_to: sanitized.email,
      subject: `[Portfolio Contact] ${sanitized.topic} — from ${sanitized.name}`,
      message: sanitized.message,
      from_name: 'Divyanshu Portfolio Contact Studio',
    });

    // Strategy A: Native system curl transport if available
    try {
      const curlBin = process.platform === 'win32' ? 'curl.exe' : 'curl';
      const args = [
        '-s',
        '-X', 'POST',
        'https://api.web3forms.com/submit',
        '-H', 'Content-Type: application/json',
        '-H', 'Accept: application/json',
        '-H', 'Origin: https://divyanshu-gangwar-portfolio.vercel.app',
        '-H', 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
        '--data-binary', payload,
      ];
      const { stdout } = await execFileAsync(curlBin, args);
      const data = JSON.parse(stdout) as { success?: boolean; message?: string };
      if (data.success) {
        return {
          success: true,
          message: data.message || 'Your inquiry was accepted and delivered successfully.',
          status: 200,
        };
      }
    } catch {
      // Fallback to fetch below
    }

    // Strategy B: Standard fetch transport with browser headers
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Origin: 'https://divyanshu-gangwar-portfolio.vercel.app',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
        },
        body: payload,
      });

      const data = (await response.json()) as { success?: boolean; message?: string; id?: string };
      if (response.ok && data.success) {
        return {
          success: true,
          message: data.message || 'Your inquiry was accepted and delivered successfully.',
          status: 200,
        };
      }

      return {
        success: false,
        message: data.message || 'Email delivery provider could not process the message.',
        status: response.status || 502,
      };
    } catch (err) {
      return {
        success: false,
        message: `Network error connecting to email provider: ${(err as Error).message}`,
        status: 502,
      };
    }
  }

  // Option 2: Resend API Dispatch
  if (resendKey && resendKey.trim() !== '' && !resendKey.includes('your_')) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendKey.trim()}`,
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: [recipientEmail],
          reply_to: sanitized.email,
          subject: `[Portfolio Contact] ${sanitized.topic} — from ${sanitized.name}`,
          text: `Inquiry from Portfolio Contact Studio:\n\nName: ${sanitized.name}\nEmail: ${sanitized.email}\nTopic: ${sanitized.topic}\n\nMessage:\n${sanitized.message}`,
        }),
      });

      const data = (await response.json()) as { success?: boolean; message?: string; id?: string };
      if (response.ok && data.id) {
        return {
          success: true,
          message: 'Your inquiry was accepted and delivered successfully.',
          status: 200,
        };
      }

      return {
        success: false,
        message: data.message || 'Resend delivery provider could not accept message.',
        status: response.status || 502,
      };
    } catch (err) {
      return {
        success: false,
        message: `Network error connecting to Resend: ${(err as Error).message}`,
        status: 502,
      };
    }
  }

  return {
    success: false,
    message:
      'Email delivery service is currently awaiting provider key setup. Please configure WEB3FORMS_ACCESS_KEY or RESEND_API_KEY in .env, or email divyanshugangwar663@gmail.com directly.',
    status: 503,
  };
}

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
