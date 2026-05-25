export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://www.toastgen.org');
  if (req.method === 'OPTIONS') return res.status(200).end();
  res.json({ pong: true, env: !!process.env.UPSTASH_REDIS_URL });
}
