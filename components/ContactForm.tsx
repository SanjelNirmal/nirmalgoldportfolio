
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus('sending');

    const now = new Date();
    const formattedTime = now.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    try {
      const templateParams = {
        name: formRef.current.user_name.value,
        message: formRef.current.message.value,
        time: formattedTime,
        email: formRef.current.user_email.value 
      };

      await emailjs.sendForm(
        'service_gb52pfl',
        'template_8152w0p',
        formRef.current!,
        'W3-mcQGJGknmFSSot'
      );


      setStatus('success');
      formRef.current.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center py-20"
          >
            <div className="mb-8 flex justify-center">
              
              <div className="w-16 h-16 border border-black/10 rounded-full flex items-center justify-center">
                
                <img
              src="/logo.png"
              alt="Nirmal Logo"
              className="w-8 md:w-12 object-contain transition-transform duration-500 group-hover:scale-110"
            />
              </div>
            </div>
            <h3 className="text-3xl font-serif italic mb-4 text-black">Signal Received.</h3>
            <p className="text-black/60 text-[10px] uppercase tracking-[0.4em]">We will connect soon.</p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-12 text-[9px] uppercase tracking-widest text-[#c5a059]/60 hover:text-[#c5a059] transition-colors font-bold"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form 
            key="form"
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 gap-12"
          >
            <div className="relative group">
              <input 
                required
                name="name"
                type="text" 
                placeholder="YOUR NAME" 
                className="w-full bg-transparent border-b border-black/10 py-6 text-sm tracking-widest uppercase focus:border-[#c5a059] transition-colors outline-none text-black placeholder:text-black/30 font-bold" 
              />
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c5a059] group-focus-within:w-full transition-all duration-700" />
            </div>

            <div className="relative group">
              <input 
                required
                name="email"
                type="email" 
                placeholder="YOUR EMAIL" 
                className="w-full bg-transparent border-b border-black/10 py-6 text-sm tracking-widest uppercase focus:border-[#c5a059] transition-colors outline-none text-black placeholder:text-black/30 font-bold" 
              />
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c5a059] group-focus-within:w-full transition-all duration-700" />
            </div>

            <div className="relative group">
              <textarea 
                required
                name="message"
                placeholder="THE VISION" 
                rows={4} 
                className="w-full bg-transparent border-b border-black/10 py-6 text-sm tracking-widest uppercase focus:border-[#c5a059] transition-colors outline-none text-black resize-none placeholder:text-black/30 font-bold" 
              />
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c5a059] group-focus-within:w-full transition-all duration-700" />
            </div>
            <input 
                type="hidden" 
                name="time" 
                value={new Date().toLocaleString()} 
            />

            <button 
              disabled={status === 'sending'}
              type="submit"
              className="relative mt-8 py-6 border border-black/10 hover:bg-[#c5a059] hover:text-white hover:border-[#c5a059] transition-all text-[10px] tracking-[0.5em] uppercase group overflow-hidden disabled:opacity-50 text-black font-bold"
            >
              <span className="relative z-10">
                {status === 'sending' ? 'Initializing...' : 'Initialize Contact'}
              </span>
              {status === 'error' && (
                <span className="block mt-2 text-[8px] text-red-500 tracking-normal capitalize">Transmission failed. Please retry.</span>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
