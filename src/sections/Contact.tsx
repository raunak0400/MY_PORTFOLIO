import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaInstagram, FaMapMarkerAlt, FaPaperPlane, FaCheck, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';
import { MdErrorOutline } from 'react-icons/md';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_df4gq8y';
const EMAILJS_TEMPLATE_ID = 'template_mx9rpne';
const EMAILJS_PUBLIC_KEY = 'UI09JXtXFWladzDdu';

interface FormField {
  value: string;
  error: string;
}

interface FormState {
  name: FormField;
  email: FormField;
  subject: FormField;
  message: FormField;
}

const Contact = () => {
  const [form, setForm] = useState<FormState>({
    name: { value: '', error: '' },
    email: { value: '', error: '' },
    subject: { value: '', error: '' },
    message: { value: '', error: '' },
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState('');

  // Validate individual field
  const validateField = (name: string, value: string): string => {
    if (!value.trim()) return `${name === 'email' ? 'Email' : name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  // Handle input change with validation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    
    setForm(prev => ({
      ...prev,
      [name]: { value, error },
    }));
    
    if (submitError) setSubmitError('');
  };

  // Validate entire form
  const validateForm = (): boolean => {
    let isValid = true;
    const newForm = { ...form };
    
    (Object.keys(newForm) as Array<keyof FormState>).forEach((key) => {
      const error = validateField(key, newForm[key].value);
      if (error) isValid = false;
      newForm[key].error = error;
    });
    
    setForm(newForm);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setStatus('loading');
    setSubmitError('');
    
    try {
      console.log('Starting form submission...');
      
      // Try EmailJS first
      try {
        console.log('Attempting to send via EmailJS...');
        const emailjs = await import('@emailjs/browser');
        
        // Log the EmailJS configuration for debugging
        console.log('EmailJS Config:', {
          serviceId: EMAILJS_SERVICE_ID,
          templateId: EMAILJS_TEMPLATE_ID,
          publicKey: EMAILJS_PUBLIC_KEY ? '***' + EMAILJS_PUBLIC_KEY.slice(-4) : 'MISSING'
        });
        
        const templateParams = {
          from_name: form.name.value,
          from_email: form.email.value,
          subject: form.subject.value,
          message: form.message.value,
          to_name: 'Raunak Kumar Jha',
          reply_to: form.email.value
        };
        
        console.log('Sending with params:', templateParams);
        
        const result = await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          EMAILJS_PUBLIC_KEY
        );
        
        console.log('EmailJS result:', result);
        if (result.status === 200) {
          console.log('Email sent successfully via EmailJS');
          setStatus('success');
          setForm({
            name: { value: '', error: '' },
            email: { value: '', error: '' },
            subject: { value: '', error: '' },
            message: { value: '', error: '' },
          });
          return;
        } else {
          console.warn('EmailJS returned non-200 status:', result.status);
          throw new Error(`EmailJS returned status ${result.status}`);
        }
      } catch (emailjsError: any) {
        console.error('EmailJS failed:', {
          message: emailjsError.message,
          text: emailjsError.text,
          status: emailjsError.status,
          stack: emailjsError.stack
        });
        
        // If EmailJS fails, show a specific error if available
        if (emailjsError.text) {
          setSubmitError(`EmailJS Error: ${emailjsError.text}`);
          setStatus('error');
          return;
        }
        
        // Otherwise continue to fallback
        console.log('Falling back to Resend API...');
      }

      // Fallback to Resend API
      try {
        console.log('Attempting to send via Resend API...');
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name.value,
            email: form.email.value,
            subject: form.subject.value,
            message: form.message.value,
          }),
        });
        
        const responseData = await res.json().catch(() => ({}));
        console.log('Resend API response:', { status: res.status, data: responseData });
        
        if (res.ok) {
          console.log('Email sent successfully via Resend API');
          setStatus('success');
          setForm({
            name: { value: '', error: '' },
            email: { value: '', error: '' },
            subject: { value: '', error: '' },
            message: { value: '', error: '' },
          });
        } else {
          const errorMessage = responseData.message || responseData.error || 'Failed to send message';
          console.error('Resend API error:', errorMessage);
          throw new Error(`Resend API: ${errorMessage} (Status: ${res.status})`);
        }
      } catch (resendError: any) {
        console.error('Resend API failed:', resendError);
        throw new Error(`Fallback failed: ${resendError.message}`);
      }
      
    } catch (err: any) {
      console.error('Form submission error:', {
        message: err.message,
        stack: err.stack
      });
      
      setStatus('error');
      
      // Provide more specific error messages when possible
      if (err.message.includes('network')) {
        setSubmitError('Network error. Please check your internet connection and try again.');
      } else if (err.message.includes('EmailJS')) {
        setSubmitError('Failed to send email. Please try again or contact us directly.');
      } else {
        setSubmitError(`Failed to send message: ${err.message}`);
      }
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'tween',
        ease: 'easeOut',
        duration: 0.5,
      },
    },
  } as const;

  return (
    <section id="contact" className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-orange-900/20 to-amber-800/20" />
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-amber-500/10 to-orange-600/10"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(40px)',
              opacity: 0.3,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto px-4">
            Open to any adventure that involves learning and making cool stuff!
          </p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Panel - Contact Info */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-black/40 to-gray-900/60 backdrop-blur-xl rounded-2xl p-8 border border-white/5 shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 hover:border-amber-500/20"
            data-cursor-magnetic
            data-cursor-text="Contact"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">Let's Connect</h3>
            <p className="text-gray-300 mb-8 text-sm sm:text-base">
              I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology!
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4 group">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FaEnvelope className="text-white text-lg" />
                </div>
                <div>
                  <p className="text-white font-medium">Email</p>
                  <a 
                    href="mailto:contact@imraunak.dev" 
                    className="text-amber-400 hover:text-amber-300 transition-colors text-sm sm:text-base"
                    data-cursor-text="Email"
                  >
                    contact@imraunak.dev
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 group">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FaInstagram className="text-white text-lg" />
                </div>
                <div>
                  <p className="text-white font-medium">Instagram</p>
                  <a 
                    href="https://www.instagram.com/imraunak.dev/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 transition-colors text-sm sm:text-base"
                    data-cursor-text="Follow"
                  >
                    @imraunak.dev
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 group">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FaMapMarkerAlt className="text-white text-lg" />
                </div>
                <div>
                  <p className="text-white font-medium">Location</p>
                  <p className="text-gray-300 text-sm sm:text-base">Gandhinagar, Gujarat 382045</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Panel - Contact Form */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-black/40 to-gray-900/60 backdrop-blur-xl rounded-2xl p-8 border border-white/5 shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 hover:border-amber-500/20"
          >
            <motion.h3 
              className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Send Message
            </motion.h3>
            
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  className="flex flex-col items-center justify-center py-12 px-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  key="success"
                >
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                    <FaCheck className="text-green-400 text-3xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-300 mb-6">I'll get back to you as soon as possible.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                    data-cursor-magnetic
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  key="form"
                >
                  <div>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={form.name.value}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className={`w-full px-4 py-3 bg-black/30 border ${
                          form.name.error ? 'border-red-500' : 'border-white/10'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200`}
                        data-cursor-text="Type"
                      />
                      {form.name.error && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                          <MdErrorOutline className="text-xl" />
                        </div>
                      )}
                    </div>
                    {form.name.error && (
                      <p className="mt-1 text-sm text-red-400">{form.name.error}</p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={form.email.value}
                        onChange={handleChange}
                        placeholder="Your Email"
                        className={`w-full px-4 py-3 bg-black/30 border ${
                          form.email.error ? 'border-red-500' : 'border-white/10'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200`}
                        data-cursor-text="Type"
                      />
                      {form.email.error && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                          <MdErrorOutline className="text-xl" />
                        </div>
                      )}
                    </div>
                    {form.email.error && (
                      <p className="mt-1 text-sm text-red-400">{form.email.error}</p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <input
                        type="text"
                        name="subject"
                        value={form.subject.value}
                        onChange={handleChange}
                        placeholder="Subject"
                        className={`w-full px-4 py-3 bg-black/30 border ${
                          form.subject.error ? 'border-red-500' : 'border-white/10'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200`}
                        data-cursor-text="Type"
                      />
                      {form.subject.error && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                          <MdErrorOutline className="text-xl" />
                        </div>
                      )}
                    </div>
                    {form.subject.error && (
                      <p className="mt-1 text-sm text-red-400">{form.subject.error}</p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <textarea
                        name="message"
                        value={form.message.value}
                        onChange={handleChange}
                        placeholder="Your Message"
                        rows={5}
                        className={`w-full px-4 py-3 bg-black/30 border ${
                          form.message.error ? 'border-red-500' : 'border-white/10'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200 resize-none`}
                        data-cursor-text="Type"
                      />
                      {form.message.error && (
                        <div className="absolute right-3 top-4 text-red-500">
                          <MdErrorOutline className="text-xl" />
                        </div>
                      )}
                    </div>
                    {form.message.error && (
                      <p className="mt-1 text-sm text-red-400">{form.message.error}</p>
                    )}
                  </div>

                  <AnimatePresence>
                    {submitError && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start space-x-2"
                      >
                        <FaExclamationTriangle className="text-red-400 mt-0.5 flex-shrink-0" />
                        <p className="text-red-300 text-sm">{submitError}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all duration-300 ${
                      status === 'loading'
                        ? 'bg-amber-600/50 cursor-not-allowed'
                        : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg hover:shadow-amber-500/20'
                    }`}
                    data-cursor-magnetic
                    data-cursor-text="Send"
                  >
                    {status === 'loading' ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          Send Message
                        </span>
                        <FaPaperPlane className="text-sm group-hover:translate-x-1 transition-transform duration-200" />
                      </>
                    )}
                  </button>
                  
                  <p className="mt-4 text-center text-xs text-gray-400">
                    I'll get back to you within 24 hours
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
