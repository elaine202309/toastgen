import { requireAuth } from '../lib/auth.js';
import { findUserById, getCredits, deductCredit, logGeneration } from '../lib/db.js';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_URL = 'https://api.deepseek.com/v1/chat/completions';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://www.toastgen.org');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!DEEPSEEK_API_KEY) return res.status(500).json({ error: 'API key not configured' });

  try {
    const userId = requireAuth(req);
    const user = await findUserById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.credits < 1) return res.status(402).json({ error: 'No credits remaining.' });

    const response = await fetch(DEEPSEEK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${DEEPSEEK_API_KEY}` },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: req.body.messages,
        max_tokens: req.body.max_tokens || 1200,
        temperature: req.body.temperature ?? 0.85,
      }),
    });

    if (!response.ok) { const err = await response.text(); return res.status(response.status).json({ error: err }); }

    const data = await response.json();
    const speechText = data.choices?.[0]?.message?.content || '';
    await deductCredit(userId);
    await logGeneration(userId, { role: req.body.role, occasion: req.body.occasion, tone: req.body.tone, length: req.body.length, names: req.body.names || null }, speechText);

    data.credits_remaining = await getCredits(userId);
    res.json(data);
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
}
