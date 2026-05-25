import { kv } from '@vercel/kv';

export async function createUser(email, passwordHash) {
  const id = await kv.incr('user:id');
  const key = `user:${id}`;
  await kv.hset(key, { id, email, password_hash: passwordHash, credits: 1, created_at: new Date().toISOString() });
  await kv.set(`user:email:${email}`, id);
  return { lastInsertRowid: id };
}

export async function findUserByEmail(email) {
  const id = await kv.get(`user:email:${email}`);
  if (!id) return null;
  return kv.hgetall(`user:${id}`);
}

export async function findUserById(id) {
  return kv.hgetall(`user:${id}`);
}

export async function getCredits(id) {
  const credits = await kv.hget(`user:${id}`, 'credits');
  return credits || 0;
}

export async function deductCredit(id) {
  const user = await findUserById(id);
  if (user && user.credits > 0) {
    await kv.hset(`user:${id}`, { credits: user.credits - 1 });
  }
}

export async function logGeneration(userId, data, speechText) {
  const id = await kv.incr('gen:id');
  await kv.hset(`gen:${id}`, {
    id, user_id: userId,
    role: data.role || '', occasion: data.occasion || '',
    tone: data.tone || '', length: data.length || '',
    names: data.names || '', speech: speechText || '',
    created_at: new Date().toISOString(),
  });
  await kv.lpush(`gen:user:${userId}`, id);
}

export async function getGenerations(userId) {
  const ids = await kv.lrange(`gen:user:${userId}`, 0, 49);
  if (!ids.length) return [];
  const items = await Promise.all(ids.map(id => kv.hgetall(`gen:${id}`)));
  return items.filter(Boolean).sort((a, b) => b.id - a.id);
}
