import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaInstagram, FaMapMarkerAlt, FaPaperPlane, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_df4gqy';
const EMAILJS_TEMPLATE_ID = 'template_mx9rpne';
const EMAILJS_PUBLIC_KEY = 'UI09JXtXFWladzDdu';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const initialForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  const validate = () => {
    if (!form.name || !form.email || !form.subject || !form.message) {
      setError('All fields are required.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus('loading');
    setError('');

    try {
      // Try EmailJS first (if configured)
      try {
        const emailjs = await import('@emailjs/browser');
        const result = await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            name: form.name,
            email: form.email,
            subject: form.subject,
            message: form.message,
            title: form.subject, // Add this if your template uses {{title}}
            time: new Date().toLocaleString() // Add this if your template uses {{time}}
          },
          EMAILJS_PUBLIC_KEY
        );
        
        console.log('EmailJS result:', result);
        if (result.status === 200) {
          setStatus('success');
          setForm(initialForm);
          return;
        }
      } catch (emailjsError) {
        console.error('EmailJS failed, trying Resend:', emailjsError);
      }

      // Fallback to Resend API
      console.log('Sending form data:', form);
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      
      console.log('Response status:', res.status);
      const data = await res.json();
      console.log('Response data:', data);
      
      if (res.ok) {
        setStatus('success');
        setForm(initialForm);
        console.log('Email sent successfully!');
      } else {
        setStatus('error');
        setError(data.error || 'Failed to send message. Please try again later.');
        console.error('API error:', data);
      }
    } catch (err) {
      console.error('Network error:', err);
      setStatus('error');
      setError('Network error. Please check your connection and try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  return (
    <section id="contact" className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Open to any adventure that involves learning and making cool stuff!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Panel - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-black/20 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
          >
            <h3 className="text-3xl font-bold text-white mb-6">Let's Connect</h3>
            <p className="text-gray-300 mb-8">
              I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology!
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <FaEnvelope className="text-white text-xl" />
                </div>
                <div>
                  <p className="text-white font-semibold">Email</p>
                  <p className="text-gray-300">raunakkumarjha233@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                  <FaInstagram className="text-white text-xl" />
                </div>
                <div>
                  <p className="text-white font-semibold">Instagram</p>
                  <p className="text-gray-300">@raunak.____.07</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                  <FaMapMarkerAlt className="text-white text-xl" />
                </div>
                <div>
                  <p className="text-white font-semibold">Location</p>
                  <p className="text-gray-300">Gandhinagar, Gujarat 382045</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Panel - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-black/20 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
          >
            <h3 className="text-3xl font-bold text-white mb-6">Send Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <FaEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              
              <div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <FaEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              
              <div>
                <div className="relative">
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <FaPaperPlane className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              
              <div>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={5}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3"
                >
                  <FaExclamationTriangle />
                  <span>{error}</span>
                </motion.div>
              )}

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 text-green-400 bg-green-400/10 border border-green-400/20 rounded-lg px-4 py-3"
                >
                  <FaCheck />
                  <span>Message sent successfully!</span>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 