import { requireAuth } from '../lib/auth.js';
import { getCredits } from '../lib/db.js';

export default async function handler(req, res) {
  try {
    const userId = requireAuth(req);
    res.json({ credits: await getCredits(userId) });
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
}
