import React, { useState, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaEnvelope, FaUser, FaRegPaperPlane, FaCheckCircle, FaExclamationCircle, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';

const initialForm = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const contactRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(contactRef, { once: true });

  if (isInView) controls.start('visible');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      setError('All fields are required.');
      return false;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    setError('');
    
    try {
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

  return (
    <section
      id="contact"
      ref={contactRef}
      className="relative min-h-screen flex flex-col justify-center py-16 bg-black overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-12 items-center justify-center">
        {/* Left Panel: Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={controls}
          variants={{ visible: { opacity: 1, x: 0, transition: { duration: 0.8, type: 'spring' } } }}
          className="w-full md:w-1/2 bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl flex flex-col gap-6 mb-8 md:mb-0"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 gradient-shimmer" style={{ background: 'linear-gradient(90deg, #06b6d4, #2563eb, #a78bfa, #f472b6)', WebkitBackgroundClip: 'text', color: 'transparent', backgroundClip: 'text' }}>Get in Touch</h2>
          <p className="text-gray-300 mb-6">Open to any adventure that involves learning and making cool stuff!</p>
          <div className="flex items-center gap-4 text-lg text-white">
            <FaEnvelope className="text-cyan-400 text-2xl" />
            <span>raunakkumarjha233@gmail.com</span>
          </div>
          <div className="flex items-center gap-4 text-lg text-white">
            <FaInstagram className="text-pink-400 text-2xl" />
            <span>@raunak.____.07</span>
          </div>
          <div className="flex items-center gap-4 text-lg text-white">
            <FaMapMarkerAlt className="text-purple-400 text-2xl" />
            <span>Gandhinagar, Gujarat 382045</span>
          </div>
          {/* Social icons row (optional, matching your theme) */}
          <div className="flex gap-4 mt-6">
            <a href="mailto:raunakkumarjha233@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform"><FaEnvelope className="text-cyan-400 text-2xl" /></a>
            <a href="https://instagram.com/raunak.____.07" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform"><FaInstagram className="text-pink-400 text-2xl" /></a>
            <a href="https://maps.google.com/?q=Gandhinagar, Gujarat 382045" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform"><FaMapMarkerAlt className="text-purple-400 text-2xl" /></a>
          </div>
        </motion.div>
        {/* Right Panel: Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 50 }}
          animate={controls}
          variants={{ visible: { opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.8, type: 'spring' } } }}
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl"
        >
          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-center gap-3 bg-black/30 rounded-xl px-4 py-3">
              <FaUser className="text-cyan-400 text-xl" />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-white placeholder-gray-400 text-lg"
                autoComplete="off"
                required
              />
            </div>
            <div className="flex items-center gap-3 bg-black/30 rounded-xl px-4 py-3">
              <FaEnvelope className="text-cyan-400 text-xl" />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-white placeholder-gray-400 text-lg"
                autoComplete="off"
                required
              />
            </div>
            <div className="flex items-center gap-3 bg-black/30 rounded-xl px-4 py-3">
              <FaRegPaperPlane className="text-cyan-400 text-xl" />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-white placeholder-gray-400 text-lg"
                autoComplete="off"
                required
              />
            </div>
            <div className="bg-black/30 rounded-xl px-4 py-3">
              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-white placeholder-gray-400 text-lg min-h-[120px] resize-none"
                required
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <FaExclamationCircle />
                {error}
              </div>
            )}
            {status === 'success' && (
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <FaCheckCircle />
                Message sent successfully!
              </div>
            )}
            <motion.button
              type="submit"
              disabled={status === 'loading'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex justify-center items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg text-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <span className="animate-pulse">Sending...</span>
              ) : (
                <>
                  <FaRegPaperPlane /> Send Message
                </>
              )}
            </motion.button>
          </div>
        </motion.form>
      </div>
      <style>{`
        .gradient-shimmer {
          background-size: 200% 100%;
          animation: shimmerMove 3s linear infinite;
        }
        @keyframes shimmerMove {
          0% { background-position: 0% 0; }
          100% { background-position: 100% 0; }
        }
      `}</style>
    </section>
  );
} 