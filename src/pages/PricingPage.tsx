import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Sparkles, Zap, Crown, X, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const tiers = [
  {
    name: 'Starter',
    price: 'Free',
    period: '',
    description: 'Try it out. Generate your first wedding speech at no cost.',
    icon: Zap,
    highlight: false,
    cta: 'Get Started Free',
    free: true,
    features: [
      '1 speech generation',
      'Short length (~3 min)',
      'Balanced tone',
      'Copy to clipboard',
      'Basic editing',
    ],
    excluded: [
      'All tones & lengths',
      'Download as file',
      'Regeneration',
    ],
  },
  {
    name: 'Pro',
    price: '$14.99',
    period: '30 speeches',
    description: 'Plenty of room to experiment, refine, and get every word just right.',
    icon: Sparkles,
    highlight: true,
    cta: 'Get Pro',
    free: false,
    features: [
      '30 speech generations',
      'All 3 lengths (short, medium, long)',
      'All 5 tones',
      'Copy & download .txt',
      'Unlimited edits per speech',
      'Regeneration for better versions',
    ],
    excluded: [],
  },
  {
    name: 'Premium',
    price: '$24.99',
    period: '100 speeches',
    description: 'For multi-wedding seasons, wedding planners, or anyone who wants full flexibility.',
    icon: Crown,
    highlight: false,
    cta: 'Get Premium',
    free: false,
    features: [
      '100 speech generations',
      'Everything in Pro',
      'Save & revisit past speeches',
      'Priority support',
      'Use for any occasion',
    ],
    excluded: [],
  },
];

const detailedComparison = [
  { feature: 'Speech generations', starter: '1', pro: '30', premium: '100' },
  { feature: 'Speech lengths', starter: 'Short only', pro: 'All 3 lengths', premium: 'All 3 lengths' },
  { feature: 'Tones', starter: 'Balanced only', pro: 'All 5 tones', premium: 'All 5 tones' },
  { feature: 'Copy to clipboard', starter: 'Yes', pro: 'Yes', premium: 'Yes' },
  { feature: 'Download .txt', starter: '—', pro: 'Yes', premium: 'Yes' },
  { feature: 'Inline editing', starter: 'Basic', pro: 'Unlimited', premium: 'Unlimited' },
  { feature: 'Regeneration', starter: '—', pro: 'Unlimited', premium: 'Unlimited' },
  { feature: 'Save past speeches', starter: '—', pro: '—', premium: 'Yes' },
  { feature: 'Priority support', starter: '—', pro: '—', premium: 'Yes' },
];

const faqs = [
  { q: 'Can I upgrade later?', a: 'Absolutely. If you start with Starter and want more, you can purchase Pro or Premium at any time. Your unused credits from a previous purchase will remain available.' },
  { q: 'Do credits expire?', a: 'No. Once you purchase a pack of speech generations, they never expire. Use them whenever you need them.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, debit cards, and PayPal. Payment processing is handled securely by our payment partner.' },
  { q: 'Is there a refund policy?', a: 'Yes. You may request a full refund within 14 days of purchase, as long as no speech generations from your pack have been used. If you\'ve already generated any speeches, the purchase is considered consumed and is not eligible for a refund. Contact us at support@toastgen.org to request a refund.' },
  { q: 'Can I use this for non-wedding events?', a: 'Yes! While optimized for weddings, ToastGen works beautifully for rehearsal dinners, engagement parties, anniversaries, and any celebration that deserves a heartfelt toast.' },
];

export default function PricingPage() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [showToast, setShowToast] = useState(false);
  const [toastTier, setToastTier] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [checkingOut, setCheckingOut] = useState<string | null>(null);
  const API_BASE = import.meta.env.VITE_API_URL || '';

  const handleCTA = async (tier: typeof tiers[0]) => {
    if (tier.free) {
      navigate('/');
      setTimeout(() => {
        document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
      return;
    }
    if (!token) {
      navigate('/login');
      return;
    }
    setCheckingOut(tier.name);
    try {
      const res = await fetch(`${API_BASE}/api/creem/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ tier: tier.name === 'Pro' ? 'pro' : 'premium' }),
      });
      const data = await res.json();
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        setToastTier(tier.name);
        setShowToast(true);
      }
    } catch {
      setToastTier(tier.name);
      setShowToast(true);
    }
    setCheckingOut(null);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold font-heading text-charcoal mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-lg text-charcoal-light max-w-xl mx-auto">
          Pay once per pack. No subscriptions. No hidden fees. Every tier has a clear generation limit so you know exactly what you're getting.
        </p>
      </section>

      {/* Tier cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-6 sm:p-8 flex flex-col h-full transition-all ${
                tier.highlight
                  ? 'bg-champagne text-white shadow-xl shadow-champagne/25 scale-[1.03] z-10'
                  : 'bg-white border border-blush-dark/20 shadow-sm hover:shadow-md'
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1 bg-charcoal text-ivory text-xs font-bold rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  tier.highlight ? 'bg-white/20' : 'bg-blush-dark'
                }`}>
                  <tier.icon className={`w-5 h-5 ${tier.highlight ? 'text-white' : 'text-champagne'}`} />
                </div>
                <h3 className={`text-xl font-bold font-heading ${tier.highlight ? 'text-white' : 'text-charcoal'}`}>
                  {tier.name}
                </h3>
              </div>

              <div className="mb-1">
                <span className={`text-4xl font-bold font-heading ${tier.highlight ? 'text-white' : 'text-charcoal'}`}>
                  {tier.price}
                </span>
                {tier.period && (
                  <span className={`text-sm ml-1 ${tier.highlight ? 'text-white/70' : 'text-charcoal-light/60'}`}>
                    /{tier.period}
                  </span>
                )}
              </div>
              <p className={`text-sm mb-6 ${tier.highlight ? 'text-white/80' : 'text-charcoal-light'}`}>
                {tier.description}
              </p>

              <button
                onClick={() => handleCTA(tier)}
                disabled={checkingOut === tier.name}
                className={`inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer mb-8 disabled:opacity-60 ${
                  tier.highlight
                    ? 'bg-white text-champagne hover:bg-white/90 shadow-md'
                    : 'bg-charcoal text-white hover:bg-charcoal-light'
                }`}
              >
                {checkingOut === tier.name ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {checkingOut === tier.name ? 'Redirecting...' : tier.cta}
              </button>

              <div className="space-y-3 flex-1">
                <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${tier.highlight ? 'text-white/60' : 'text-charcoal-light/50'}`}>
                  What's included
                </div>
                {tier.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${tier.highlight ? 'text-white' : 'text-sage'}`} />
                    <span className={`text-sm ${tier.highlight ? 'text-white/90' : 'text-charcoal-light'}`}>{f}</span>
                  </div>
                ))}
                {tier.excluded.map((f, i) => (
                  <div key={'ex-' + i} className="flex items-start gap-2.5 opacity-40">
                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span className={`text-sm line-through ${tier.highlight ? 'text-white/60' : 'text-charcoal-light/50'}`}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed comparison table */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold font-heading text-charcoal text-center mb-12">
          Full Feature Comparison
        </h2>
        <div className="bg-white rounded-2xl border border-blush-dark/20 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-blush-dark/20 bg-blush/30">
                <th className="text-left px-6 py-4 text-sm font-semibold text-charcoal">Feature</th>
                <th className="text-center px-4 py-4 text-sm font-semibold text-charcoal">Starter</th>
                <th className="text-center px-4 py-4 text-sm font-semibold text-charcoal bg-champagne/10">Pro</th>
                <th className="text-center px-4 py-4 text-sm font-semibold text-charcoal">Premium</th>
              </tr>
            </thead>
            <tbody>
              {detailedComparison.map((row, i) => (
                <tr key={i} className="border-b border-blush-dark/10 last:border-0">
                  <td className="px-6 py-3.5 text-sm text-charcoal font-medium">{row.feature}</td>
                  <td className="text-center px-4 py-3.5 text-sm text-charcoal-light">{row.starter}</td>
                  <td className="text-center px-4 py-3.5 text-sm text-charcoal font-medium bg-champagne/5">{row.pro}</td>
                  <td className="text-center px-4 py-3.5 text-sm text-charcoal-light">{row.premium}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold font-heading text-charcoal text-center mb-12">
          Pricing FAQ
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-blush-dark/20 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer hover:bg-blush/20 transition-colors"
              >
                <span className="font-medium text-charcoal pr-4">{faq.q}</span>
                <span className={`text-charcoal-light transition-transform ${openFaq === i ? 'rotate-180' : ''}`}>▾</span>
              </button>
              {openFaq === i && (
                <div className="px-6 pb-4 text-charcoal-light leading-relaxed text-sm">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Payment toast */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="flex items-center gap-3 bg-charcoal text-white px-6 py-3 rounded-2xl shadow-2xl">
            <Sparkles className="w-4 h-4 text-champagne" />
            <span className="text-sm font-medium">
              <strong>{toastTier}</strong> — Payment integration coming soon!
            </span>
            <button onClick={() => setShowToast(false)} className="text-white/60 hover:text-white cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
