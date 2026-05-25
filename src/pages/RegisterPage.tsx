import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, Loader2, AlertCircle, Gift } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await register(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-24 px-4 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Sparkles className="w-8 h-8 text-champagne mx-auto mb-4" />
            <h1 className="text-3xl font-bold font-heading text-charcoal">Create Your Account</h1>
            <p className="text-charcoal-light mt-2">Start crafting the perfect wedding speech</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-blush-dark/20 space-y-4">
            {/* Free credit banner */}
            <div className="flex items-center gap-3 px-4 py-3 bg-champagne-light/50 border border-champagne/30 rounded-xl">
              <Gift className="w-5 h-5 text-champagne flex-shrink-0" />
              <div className="text-sm text-charcoal">
                <strong>1 free speech</strong> included — no payment required to get started.
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 px-4 py-3 bg-coral-light/50 border border-coral/30 rounded-xl text-sm text-charcoal">
                <AlertCircle className="w-4 h-4 text-coral flex-shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-charcoal-light/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-charcoal/10 bg-ivory focus:outline-none focus:border-champagne focus:ring-2 focus:ring-champagne/20 text-charcoal placeholder:text-charcoal-light/40" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-charcoal-light/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                  placeholder="Min. 6 characters"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-charcoal/10 bg-ivory focus:outline-none focus:border-champagne focus:ring-2 focus:ring-champagne/20 text-charcoal placeholder:text-charcoal-light/40" />
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-coral to-champagne text-white font-bold rounded-xl hover:opacity-95 disabled:opacity-60 transition-all shadow-md cursor-pointer">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {loading ? 'Creating account...' : 'Create Account'}
            </button>

            <p className="text-sm text-center text-charcoal-light pt-2">
              Already have an account? <Link to="/login" className="text-champagne font-medium hover:underline">Sign in</Link>
            </p>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}
