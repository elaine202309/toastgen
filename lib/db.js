import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL || '',
  token: process.env.UPSTASH_REDIS_TOKEN || '',
});

export async function createUser(email, passwordHash) {
  const id = await redis.incr('user:id');
  const key = `user:${id}`;
  await redis.hset(key, { id: String(id), email, password_hash: passwordHash, credits: '1', created_at: new Date().toISOString() });
  await redis.set(`user:email:${email}`, id);
  return { lastInsertRowid: id };
}

export async function findUserByEmail(email) {
  const id = await redis.get(`user:email:${email}`);
  if (!id) return null;
  return redis.hgetall(`user:${id}`);
}

export async function findUserById(id) {
  const user = await redis.hgetall(`user:${id}`);
  return user?.id ? user : null;
}

export async function getCredits(id) {
  return Number(await redis.hget(`user:${id}`, 'credits')) || 0;
}

export async function deductCredit(id) {
  const credits = await getCredits(id);
  if (credits > 0) {
    await redis.hset(`user:${id}`, { credits: String(credits - 1) });
  }
}

export async function logGeneration(userId, data, speechText) {
  const id = await redis.incr('gen:id');
  await redis.hset(`gen:${id}`, {
    id: String(id), user_id: String(userId),
    role: data.role || '', occasion: data.occasion || '',
    tone: data.tone || '', length: data.length || '',
    names: data.names || '', speech: speechText || '',
    created_at: new Date().toISOString(),
  });
  await redis.lpush(`gen:user:${userId}`, id);
}

export async function getGenerations(userId) {
  const ids = await redis.lrange(`gen:user:${userId}`, 0, 49);
  if (!ids.length) return [];
  const items = await Promise.all(ids.map(id => redis.hgetall(`gen:${id}`)));
  return items.filter(Boolean).sort((a, b) => Number(b.id) - Number(a.id));
}
