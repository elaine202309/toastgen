import { requireAuth } from '../../lib/auth.js';
import { findUserById } from '../../lib/db.js';

export default async function handler(req, res) {
  try {
    const userId = requireAuth(req);
    const user = await findUserById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ id: user.id, email: user.email, credits: user.credits, created_at: user.created_at });
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
}
