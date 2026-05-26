import { Router } from 'express';
import crypto from 'crypto';
import { addCredits } from './db.js';
import { requireAuth } from './auth.js';

const router = Router();
const CREEM_API_URL = 'https://api.creem.io/v1';
const CREEM_API_KEY = process.env.CREEM_API_KEY || '';
const CREEM_WEBHOOK_SECRET = process.env.CREEM_WEBHOOK_SECRET || '';

const PRODUCTS = {
  pro: process.env.CREEM_PRODUCT_PRO || '',
  premium: process.env.CREEM_PRODUCT_PREMIUM || '',
};

const CREDIT_AMOUNTS = { pro: 30, premium: 100 };

// Create checkout session
router.post('/checkout', requireAuth, async (req, res) => {
  try {
    const { tier } = req.body;
    const productId = PRODUCTS[tier];
    if (!productId) return res.status(400).json({ error: 'Invalid tier' });

    const response = await fetch(`${CREEM_API_URL}/checkouts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CREEM_API_KEY,
      },
      body: JSON.stringify({
        product_id: productId,
        units: 1,
        metadata: { userId: String(req.userId), tier },
        success_url: 'https://www.toastgen.org',
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({ error: err });
    }

    const data = await response.json();
    res.json({ checkout_url: data.checkout_url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Webhook handler — use raw body for signature verification
router.post('/webhook', (req, res, next) => {
  const contentType = req.headers['content-type'];
  if (contentType && contentType.includes('application/json')) {
    let raw = '';
    req.on('data', chunk => { raw += chunk; });
    req.on('end', async () => {
      try {
        const signature = req.headers['creem-signature'];
        if (signature && CREEM_WEBHOOK_SECRET) {
          const expected = crypto.createHmac('sha256', CREEM_WEBHOOK_SECRET).update(raw).digest('hex');
          if (signature !== expected) {
            return res.status(403).json({ error: 'Invalid signature' });
          }
        }
        const event = JSON.parse(raw);
        if (event.type === 'checkout.completed' && event.data?.object?.metadata) {
          const { userId, tier } = event.data.object.metadata;
          const credits = CREDIT_AMOUNTS[tier] || 0;
          if (userId && credits > 0) {
            await addCredits(Number(userId), credits);
            console.log(`Credited ${credits} to user ${userId} (tier: ${tier})`);
          }
        }
        res.json({ received: true });
      } catch (e) {
        res.status(500).json({ error: e.message });
      }
    });
  } else {
    next();
  }
});

export default router;
