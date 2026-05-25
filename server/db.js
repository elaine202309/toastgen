import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, 'data.json');

function read() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ users: [], generations: [], nextId: 1 }));
  }
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(raw);
}

function write(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Users
export function createUser(email, passwordHash) {
  const db = read();
  const id = db.nextId++;
  db.users.push({ id, email, password_hash: passwordHash, credits: 1, created_at: new Date().toISOString() });
  write(db);
  return { lastInsertRowid: id };
}

export function findUserByEmail(email) {
  const db = read();
  return db.users.find(u => u.email === email.toLowerCase().trim()) || null;
}

export function findUserById(id) {
  const db = read();
  return db.users.find(u => u.id === id) || null;
}

export function getCredits(id) {
  const db = read();
  const user = db.users.find(u => u.id === id);
  return user ? user.credits : 0;
}

export function deductCredit(id) {
  const db = read();
  const user = db.users.find(u => u.id === id);
  if (user && user.credits > 0) {
    user.credits -= 1;
    write(db);
  }
}

export function addCredits(id, amount) {
  const db = read();
  const user = db.users.find(u => u.id === id);
  if (user) {
    user.credits += amount;
    write(db);
  }
}

export function logGeneration(userId, data, speechText) {
  const db = read();
  db.generations.push({
    id: db.generations.length + 1,
    user_id: userId,
    role: data.role || null,
    occasion: data.occasion || null,
    tone: data.tone || null,
    length: data.length || null,
    names: data.names || null,
    speech: speechText || null,
    created_at: new Date().toISOString(),
  });
  write(db);
}

export function getGenerations(userId) {
  const db = read();
  return db.generations
    .filter(g => g.user_id === userId)
    .sort((a, b) => b.id - a.id)
    .slice(0, 50); // last 50
}
