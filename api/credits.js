import { requireAuth } from '../lib/auth.js';
import { getCredits } from '../lib/db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://www.toastgen.org');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const userId = requireAuth(req);
    res.json({ credits: await getCredits(userId) });
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
}
