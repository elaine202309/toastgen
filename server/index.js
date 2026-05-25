import express from 'express';
import cors from 'cors';
import authRouter, { requireAuth } from './auth.js';
import { findUserById, getCredits, deductCredit, logGeneration } from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_URL = 'https://api.deepseek.com/v1/chat/completions';

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Auth routes
app.use('/api', authRouter);

// Generate speech — requires auth + credits
app.post('/api/generate', requireAuth, async (req, res) => {
  if (!DEEPSEEK_API_KEY) {
    return res.status(500).json({ error: 'API key not configured on server' });
  }

  const user = findUserById(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  if (user.credits < 1) {
    return res.status(402).json({ error: 'No credits remaining. Please purchase more to continue.' });
  }

  try {
    const response = await fetch(DEEPSEEK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: req.body.messages,
        max_tokens: req.body.max_tokens || 1200,
        temperature: req.body.temperature ?? 0.85,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({ error: err });
    }

    // Deduct credit
    deductCredit(req.userId);

    // Log generation
    logGeneration(req.userId, {
      role: req.body.role,
      occasion: req.body.occasion,
      tone: req.body.tone,
      length: req.body.length,
    });

    const data = await response.json();
    const remaining = getCredits(req.userId);
    data.credits_remaining = remaining;
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get user credits
app.get('/api/credits', requireAuth, (req, res) => {
  res.json({ credits: getCredits(req.userId) });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`ToastGen API running on port ${port}`);
});
