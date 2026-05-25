import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.TURSO_URL || 'file:local.db',
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// Auto-create tables
await client.execute(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    credits INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now'))
  )
`);

await client.execute(`
  CREATE TABLE IF NOT EXISTS generations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    role TEXT,
    occasion TEXT,
    tone TEXT,
    length TEXT,
    names TEXT,
    speech TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  )
`);

// Users
export async function createUser(email, passwordHash) {
  const result = await client.execute({
    sql: 'INSERT INTO users (email, password_hash, credits) VALUES (?, ?, 1)',
    args: [email, passwordHash],
  });
  return { lastInsertRowid: Number(result.lastInsertRowid) };
}

export async function findUserByEmail(email) {
  const result = await client.execute({
    sql: 'SELECT * FROM users WHERE email = ?',
    args: [email],
  });
  return result.rows[0] || null;
}

export async function findUserById(id) {
  const result = await client.execute({
    sql: 'SELECT * FROM users WHERE id = ?',
    args: [id],
  });
  return result.rows[0] || null;
}

export async function getCredits(id) {
  const result = await client.execute({
    sql: 'SELECT credits FROM users WHERE id = ?',
    args: [id],
  });
  return result.rows[0]?.credits ?? 0;
}

export async function deductCredit(id) {
  await client.execute({
    sql: 'UPDATE users SET credits = credits - 1 WHERE id = ? AND credits > 0',
    args: [id],
  });
}

export async function addCredits(id, amount) {
  await client.execute({
    sql: 'UPDATE users SET credits = credits + ? WHERE id = ?',
    args: [amount, id],
  });
}

export async function logGeneration(userId, data, speechText) {
  await client.execute({
    sql: 'INSERT INTO generations (user_id, role, occasion, tone, length, names, speech) VALUES (?, ?, ?, ?, ?, ?, ?)',
    args: [userId, data.role || null, data.occasion || null, data.tone || null, data.length || null, data.names || null, speechText || null],
  });
}

export async function getGenerations(userId) {
  const result = await client.execute({
    sql: 'SELECT * FROM generations WHERE user_id = ? ORDER BY id DESC LIMIT 50',
    args: [userId],
  });
  return result.rows;
}
