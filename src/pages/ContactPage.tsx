import { useState } from 'react';
import { Mail, MessageSquare, Send, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold font-heading text-charcoal mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-charcoal-light">
            Have questions, feedback, or need help? We'd love to hear from you.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="bg-white rounded-2xl p-6 border border-blush-dark/20 text-center">
            <div className="w-12 h-12 rounded-xl bg-blush flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6 text-champagne" />
            </div>
            <h3 className="font-bold font-heading text-charcoal mb-1">Email Us</h3>
            <p className="text-sm text-charcoal-light">hello@toastgen.com</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-blush-dark/20 text-center">
            <div className="w-12 h-12 rounded-xl bg-blush flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="w-6 h-6 text-champagne" />
            </div>
            <h3 className="font-bold font-heading text-charcoal mb-1">Response Time</h3>
            <p className="text-sm text-charcoal-light">Usually within 24 hours</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 border border-blush-dark/20 space-y-5">
          <h2 className="text-xl font-bold font-heading text-charcoal mb-2">Send a Message</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">Name</label>
              <input
                type="text" value={name} onChange={e => setName(e.target.value)} required
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-xl border border-charcoal/10 bg-ivory focus:outline-none focus:border-champagne focus:ring-2 focus:ring-champagne/20 transition-all text-charcoal placeholder:text-charcoal-light/40"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">Email</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-charcoal/10 bg-ivory focus:outline-none focus:border-champagne focus:ring-2 focus:ring-champagne/20 transition-all text-charcoal placeholder:text-charcoal-light/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">Message</label>
            <textarea
              value={message} onChange={e => setMessage(e.target.value)} required
              rows={5}
              placeholder="Tell us what's on your mind..."
              className="w-full px-4 py-3 rounded-xl border border-charcoal/10 bg-ivory focus:outline-none focus:border-champagne focus:ring-2 focus:ring-champagne/20 transition-all text-charcoal placeholder:text-charcoal-light/40 resize-y"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-coral to-champagne text-white font-bold rounded-xl hover:opacity-95 transition-all shadow-md shadow-coral/20 cursor-pointer"
          >
            {sent ? (
              <>
                <Check className="w-4 h-4" />
                Sent! We'll get back to you soon.
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Message
              </>
            )}
          </button>
        </form>
      </section>
      <Footer />
    </div>
  );
}
