import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'toastgen-dev-secret-change-in-production';

export function requireAuth(req) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    throw { status: 401, message: 'Authentication required' };
  }
  try {
    const token = header.split(' ')[1];
    const payload = jwt.verify(token, JWT_SECRET);
    return payload.userId;
  } catch {
    throw { status: 401, message: 'Invalid or expired token' };
  }
}

export function signToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '30d' });
}
