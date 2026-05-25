import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Router } from 'express';
import { createUser, findUserByEmail, findUserById } from './db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'toastgen-dev-secret-change-in-production';
const router = Router();

// Middleware: require auth
export function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  try {
    const token = header.split(' ')[1];
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// POST /api/auth/register
router.post('/auth/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  const existing = findUserByEmail(email);
  if (existing) {
    return res.status(409).json({ error: 'An account with this email already exists' });
  }

  const hash = bcrypt.hashSync(password, 10);
  const result = createUser(email.toLowerCase().trim(), hash);

  const token = jwt.sign({ userId: result.lastInsertRowid }, JWT_SECRET, { expiresIn: '30d' });
  res.json({ token, credits: 1, email: email.toLowerCase().trim() });
});

// POST /api/auth/login
router.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  if (!bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '30d' });
  res.json({ token, credits: user.credits, email: user.email });
});

// GET /api/auth/me
router.get('/auth/me', requireAuth, (req, res) => {
  const user = findUserById(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ id: user.id, email: user.email, credits: user.credits, created_at: user.created_at });
});

export default router;
