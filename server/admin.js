import { Router } from 'express';

const router = Router();
const UPSTASH_URL = process.env.UPSTASH_REDIS_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_TOKEN;
const ADMIN_KEY = process.env.ADMIN_KEY || 'toastgen-admin';

async function redis(cmd, ...args) {
  const res = await fetch(UPSTASH_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${UPSTASH_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify([cmd, ...args]),
  });
  if (!res.ok) throw new Error(`Upstash error: ${res.status}`);
  return (await res.json()).result;
}

function requireAdmin(req, res, next) {
  if (req.headers['x-admin-key'] !== ADMIN_KEY) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
}

router.get('/users', requireAdmin, async (_req, res) => {
  try {
    const total = Number(await redis('GET', 'user:id')) || 0;
    const users = [];
    for (let i = 1; i <= total; i++) {
      const raw = await redis('HGETALL', `user:${i}`);
      if (!raw || raw.length === 0) continue;
      const u = {};
      for (let j = 0; j < raw.length; j += 2) u[raw[j]] = raw[j + 1];
      const gens = await redis('LLEN', `gen:user:${i}`);
      users.push({ id: u.id, email: u.email, credits: Number(u.credits), generations: Number(gens || 0), created_at: u.created_at });
    }
    res.json({ total, users });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/stats', requireAdmin, async (_req, res) => {
  try {
    const users = await redis('GET', 'user:id') || '0';
    const gens = await redis('GET', 'gen:id') || '0';
    res.json({ users: Number(users), generations: Number(gens) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
