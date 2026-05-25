const UPSTASH_URL = process.env.UPSTASH_REDIS_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_TOKEN;

async function upstash(cmd, ...args) {
  const res = await fetch(`${UPSTASH_URL}${cmd}/${args.join('/')}`, {
    headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
  });
  if (!res.ok) throw new Error(`Upstash error: ${res.status}`);
  return res.json();
}

async function upstashCmd(cmd, ...args) {
  const res = await fetch(`${UPSTASH_URL}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${UPSTASH_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify([cmd, ...args]),
  });
  if (!res.ok) throw new Error(`Upstash error: ${res.status}`);
  const data = await res.json();
  return data.result;
}

export async function createUser(email, passwordHash) {
  const id = await upstashCmd('INCR', 'user:id');
  await upstashCmd('HSET', `user:${id}`, 'id', String(id), 'email', email, 'password_hash', passwordHash, 'credits', '1', 'created_at', new Date().toISOString());
  await upstashCmd('SET', `user:email:${email}`, String(id));
  return { lastInsertRowid: id };
}

export async function findUserByEmail(email) {
  const id = await upstashCmd('GET', `user:email:${email}`);
  if (!id) return null;
  return upstashToObj(await upstashCmd('HGETALL', `user:${id}`));
}

export async function findUserById(id) {
  const data = await upstashCmd('HGETALL', `user:${id}`);
  return data && data.length > 0 ? upstashToObj(data) : null;
}

export async function getCredits(id) {
  return Number(await upstashCmd('HGET', `user:${id}`, 'credits')) || 0;
}

export async function deductCredit(id) {
  const credits = await getCredits(id);
  if (credits > 0) {
    await upstashCmd('HSET', `user:${id}`, 'credits', String(credits - 1));
  }
}

export async function logGeneration(userId, data, speechText) {
  const id = await upstashCmd('INCR', 'gen:id');
  await upstashCmd('HSET', `gen:${id}`, 'id', String(id), 'user_id', String(userId),
    'role', data.role || '', 'occasion', data.occasion || '', 'tone', data.tone || '',
    'length', data.length || '', 'names', data.names || '', 'speech', speechText || '',
    'created_at', new Date().toISOString());
  await upstashCmd('LPUSH', `gen:user:${userId}`, String(id));
}

export async function getGenerations(userId) {
  const ids = await upstashCmd('LRANGE', `gen:user:${userId}`, '0', '49');
  if (!ids || !ids.length) return [];
  const items = await Promise.all(ids.map(id => upstashCmd('HGETALL', `gen:${id}`)));
  return items.filter(Boolean).map(upstashToObj).sort((a, b) => Number(b.id) - Number(a.id));
}

function upstashToObj(arr) {
  const obj = {};
  for (let i = 0; i < arr.length; i += 2) obj[arr[i]] = arr[i + 1];
  return obj;
}
