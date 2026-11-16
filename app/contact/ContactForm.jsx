// app/contact/ContactForm.jsx
'use client';

import { useState } from 'react';
import { FaArrowUp, FaCheckCircle, FaExclamationCircle, FaSpinner } from 'react-icons/fa';

const card = 'rounded-3xl bg-gradient-to-b from-[#2a2a2a] to-[#222] border border-white/5';

export default function ContactForm() {
  const [formState, setFormState] = useState('idle'); // idle | submitting | success | error
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    _honey: '', // honeypot
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Honeypot check
    if (formData._honey) {
      setFormState('success'); // Silently succeed for bots
      return;
    }
    
    if (!validate()) return;
    
    setFormState('submitting');
    
    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
    
    if (!endpoint) {
      // Fallback to mailto
      const subject = encodeURIComponent(`Portfolio contact from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
      window.location.href = `mailto:harizhazril@gmail.com?subject=${subject}&body=${body}`;
      setFormState('success');
      return;
    }
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      
      if (response.ok) {
        setFormState('success');
        setFormData({ name: '', email: '', message: '', _honey: '' });
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <section className={`${card} p-8`} aria-labelledby="contact-form-heading">
      <h2 id="contact-form-heading" className="text-2xl font-bold mb-6">Send a Message</h2>
      
      {/* Status Messages */}
      {formState === 'success' && (
        <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center gap-3 text-green-400" role="status">
          <FaCheckCircle size={20} aria-hidden="true" />
          <div>
            <p className="font-medium">Message sent!</p>
            <p className="text-sm text-white/70">I'll get back to you within 1–2 business days.</p>
          </div>
        </div>
      )}
      
      {formState === 'error' && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-400" role="alert">
          <FaExclamationCircle size={20} aria-hidden="true" />
          <div>
            <p className="font-medium">Something went wrong</p>
            <p className="text-sm text-white/70">Please try again or email me directly at harizhazril@gmail.com</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Honeypot — hidden from humans, filled by bots */}
        <input
          type="text"
          name="_honey"
          id="_honey"
          tabIndex={-1}
          autoComplete="off"
          style={{ display: 'none' }}
          aria-hidden="true"
          value={formData._honey}
          onChange={handleChange}
        />

        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1.5">
            Name <span className="text-amber-400" aria-hidden="true">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
              errors.name ? 'border-red-500/50' : 'border-white/10 focus:border-amber-400'
            } text-white placeholder:text-white/30 transition focus:outline-none focus:ring-2 focus:ring-amber-400/20`}
            placeholder="Your name"
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-sm text-red-400" role="alert">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1.5">
            Email <span className="text-amber-400" aria-hidden="true">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
              errors.email ? 'border-red-500/50' : 'border-white/10 focus:border-amber-400'
            } text-white placeholder:text-white/30 transition focus:outline-none focus:ring-2 focus:ring-amber-400/20`}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-sm text-red-400" role="alert">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1.5">
            Message <span className="text-amber-400" aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : 'message-hint'}
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
              errors.message ? 'border-red-500/50' : 'border-white/10 focus:border-amber-400'
            } text-white placeholder:text-white/30 transition focus:outline-none focus:ring-2 focus:ring-amber-400/20 resize-y min-h-[120px]`}
            placeholder="What's on your mind?"
          />
          {errors.message ? (
            <p id="message-error" className="mt-1.5 text-sm text-red-400" role="alert">{errors.message}</p>
          ) : (
            <p id="message-hint" className="mt-1.5 text-sm text-white/40">Minimum 10 characters</p>
          )}
        </div>

        <button
          type="submit"
          disabled={formState === 'submitting'}
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-amber-400 text-black font-medium transition hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 flex items-center gap-2"
        >
          {formState === 'submitting' ? (
            <>
              <FaSpinner className="animate-spin" size={18} aria-hidden="true" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <FaArrowUp className="rotate-45" size={16} />
            </>
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-white/50">
        No form endpoint configured? The form falls back to a <code className="text-white/70">mailto:</code> link.
        Set <code className="text-white/70">NEXT_PUBLIC_FORM_ENDPOINT</code> to use Formspree/Web3Forms.
      </p>
    </section>
  );
}