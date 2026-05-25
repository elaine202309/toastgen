import { put, list, del } from '@vercel/blob';

const BLOB_NAME = 'toastgen-data.json';
let cache = null;
let cacheLoaded = false;

async function readDB() {
  if (cacheLoaded) return cache;
  try {
    const { blobs } = await list({ prefix: BLOB_NAME, limit: 1 });
    if (blobs.length > 0) {
      const res = await fetch(blobs[0].url);
      cache = await res.json();
    }
  } catch {}
  if (!cache) {
    cache = { users: [], generations: [], nextUserId: 1, nextGenId: 1 };
  }
  cacheLoaded = true;
  return cache;
}

async function writeDB() {
  const blob = await put(BLOB_NAME, JSON.stringify(cache), {
    access: 'public',
    contentType: 'application/json',
  });
  // Delete old versions to keep only the latest
  const { blobs } = await list({ prefix: BLOB_NAME });
  for (const b of blobs) {
    if (b.url !== blob.url) await del(b.url);
  }
}

export async function createUser(email, passwordHash) {
  const db = await readDB();
  const id = db.nextUserId++;
  db.users.push({ id, email, password_hash: passwordHash, credits: 1, created_at: new Date().toISOString() });
  await writeDB();
  return { lastInsertRowid: id };
}

export async function findUserByEmail(email) {
  const db = await readDB();
  return db.users.find(u => u.email === email) || null;
}

export async function findUserById(id) {
  const db = await readDB();
  return db.users.find(u => u.id === id) || null;
}

export async function getCredits(id) {
  const db = await readDB();
  const user = db.users.find(u => u.id === id);
  return user ? user.credits : 0;
}

export async function deductCredit(id) {
  const db = await readDB();
  const user = db.users.find(u => u.id === id);
  if (user && user.credits > 0) {
    user.credits -= 1;
    await writeDB();
  }
}

export async function logGeneration(userId, data, speechText) {
  const db = await readDB();
  const id = db.nextGenId++;
  db.generations.push({
    id, user_id: userId,
    role: data.role || '', occasion: data.occasion || '',
    tone: data.tone || '', length: data.length || '',
    names: data.names || '', speech: speechText || '',
    created_at: new Date().toISOString(),
  });
  await writeDB();
}

export async function getGenerations(userId) {
  const db = await readDB();
  return db.generations
    .filter(g => g.user_id === userId)
    .sort((a, b) => b.id - a.id)
    .slice(0, 50);
}
