// Vercel API route for contact form email delivery using Resend
import { Resend } from 'resend';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Check if API key exists
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({ error: 'Email service not configured.' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    console.log('Attempting to send email with data:', { name, email, subject, message: message.substring(0, 100) + '...' });
    
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['raunakkumarjha233@gmail.com'],
      subject: `[Portfolio] ${subject}`,
      reply_to: email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">New Contact Message from Portfolio</h2>
          <div style="background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff;">
              ${message.replace(/\n/g, '<br/>')}
            </div>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px; text-align: center;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `
    });
    
    console.log('Email sent successfully:', result);
    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Failed to send email:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      statusCode: error.statusCode
    });
    return res.status(500).json({ 
      error: 'Failed to send email. Please try again later.',
      details: error.message 
    });
  }
} 