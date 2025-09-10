// Test API endpoint to verify Resend configuration
import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check if API key exists
  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ 
      error: 'RESEND_API_KEY is not set',
      message: 'Please check your environment variables in Vercel'
    });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    // Test the API key by getting account info
    const result = await resend.domains.list();
    
    return res.status(200).json({ 
      success: true,
      message: 'Resend API key is working',
      domains: result.data
    });
  } catch (error) {
    console.error('Resend API test failed:', error);
    return res.status(500).json({ 
      error: 'Resend API test failed',
      details: error.message
    });
  }
} 