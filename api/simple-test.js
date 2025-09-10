import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'RESEND_API_KEY not configured' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    console.log('Sending simple test email...');
    
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['raunakkumarjha233@gmail.com'],
      subject: 'Test Email from Portfolio',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Test Email</h2>
          <p>This is a test email from your portfolio.</p>
          <p>Time: ${new Date().toISOString()}</p>
          <p>If you receive this, Resend is working!</p>
        </div>
      `
    });

    console.log('Simple test email result:', result);
    return res.status(200).json({ 
      success: true, 
      message: 'Test email sent',
      result: result 
    });
  } catch (error) {
    console.error('Simple test email failed:', error);
    return res.status(500).json({ 
      error: 'Test email failed',
      details: error.message,
      code: error.code 
    });
  }
} 