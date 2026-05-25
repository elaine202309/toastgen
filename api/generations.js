import { requireAuth } from '../lib/auth.js';
import { getGenerations } from '../lib/db.js';

export default async function handler(req, res) {
  try {
    const userId = requireAuth(req);
    const items = await getGenerations(userId);
    res.json(items);
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
}
