/**
 * Client-side contact submission service.
 * Handles client-side validation, connects to /api/contact (or direct Web3Forms static fallback),
 * and provides clear feedback on submission status.
 */

export interface ContactFormData {
  name: string;
  email: string;
  topic: string;
  message: string;
  _gotcha?: string;
}

export interface ContactSubmissionResult {
  success: boolean;
  message: string;
}

/**
 * Validate form input on the client before network transmission.
 */
export function validateContactFormClient(data: ContactFormData): {
  valid: boolean;
  error?: string;
} {
  const name = data.name.trim();
  if (!name) {
    return { valid: false, error: 'Please enter your name.' };
  }
  if (name.length > 100) {
    return { valid: false, error: 'Name must not exceed 100 characters.' };
  }

  const email = data.email.trim();
  if (!email) {
    return { valid: false, error: 'Please enter your email address.' };
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Please enter a valid email format (e.g. name@company.com).' };
  }

  const message = data.message.trim();
  if (!message) {
    return { valid: false, error: 'Please enter your inquiry details.' };
  }
  if (message.length < 5) {
    return { valid: false, error: 'Message must be at least 5 characters long.' };
  }
  if (message.length > 4000) {
    return { valid: false, error: 'Message must not exceed 4,000 characters.' };
  }

  return { valid: true };
}

/**
 * Submit contact inquiry to the real backend / delivery service.
 */
export async function submitContactInquiry(
  data: ContactFormData
): Promise<ContactSubmissionResult> {
  // 1. Client-side validation
  const clientVal = validateContactFormClient(data);
  if (!clientVal.valid) {
    return { success: false, message: clientVal.error || 'Invalid form input.' };
  }

  // 2. Attempt local / serverless endpoint (/api/contact)
  try {
    const apiRes = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });

    // If endpoint exists and handles request
    if (apiRes.status !== 404) {
      let resultData: any;
      try {
        resultData = await apiRes.json();
      } catch {
        resultData = {};
      }

      if (apiRes.ok && resultData.success) {
        return {
          success: true,
          message:
            resultData.message ||
            'Your message was successfully received and forwarded to Divyanshu.',
        };
      }

      return {
        success: false,
        message:
          resultData.message ||
          'Email delivery provider could not process the request. Please email divyanshugangwar663@gmail.com directly.',
      };
    }
  } catch (err) {
    // If /api/contact is unavailable due to network or static hosting
    console.warn('Backend /api/contact unreachable, checking direct provider fallback:', err);
  }

  // 3. Fallback for pure static hosting: direct Web3Forms if client access key is present
  const staticKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (staticKey && staticKey.trim() !== '' && !staticKey.includes('your_')) {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: staticKey.trim(),
          name: data.name.trim(),
          email: data.email.trim(),
          reply_to: data.email.trim(),
          subject: `[Portfolio Contact] ${data.topic} — from ${data.name.trim()}`,
          message: data.message.trim(),
          botcheck: data._gotcha || '',
          from_name: 'Divyanshu Portfolio Contact Studio',
        }),
      });

      const resData = await response.json();
      if (response.ok && resData.success) {
        return {
          success: true,
          message: 'Your inquiry has been successfully transmitted and accepted for delivery.',
        };
      }

      return {
        success: false,
        message:
          resData.message ||
          'Delivery service could not accept the message. Please contact divyanshugangwar663@gmail.com directly.',
      };
    } catch (err) {
      return {
        success: false,
        message: `Network error connecting to email service: ${(err as Error).message}`,
      };
    }
  }

  // 4. No configured provider or unreachable
  return {
    success: false,
    message:
      'Email delivery service is currently awaiting provider configuration. Please reach out directly to divyanshugangwar663@gmail.com.',
  };
}
