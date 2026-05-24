import { useState } from 'react';
import { Check, Sparkles, Zap, Crown, X } from 'lucide-react';

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

export default function Pricing() {
  const [showToast, setShowToast] = useState(false);
  const [toastTier, setToastTier] = useState('');

  const handleCTA = (tier: typeof tiers[0]) => {
    if (tier.free) {
      document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setToastTier(tier.name);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold font-heading text-charcoal mb-4">
          Simple Pricing. Pay Per Pack. No Subscriptions.
        </h2>
        <p className="text-lg text-charcoal-light max-w-xl mx-auto">
          Pay once per pack. No subscriptions. No hidden fees. Every tier has a clear generation limit so you know exactly what you're getting.
        </p>
      </div>

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

            {/* Header */}
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

            {/* Price */}
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

            {/* CTA */}
            <button
              onClick={() => handleCTA(tier)}
              className={`inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer mb-8 ${
                tier.highlight
                  ? 'bg-white text-champagne hover:bg-white/90 shadow-md'
                  : 'bg-charcoal text-white hover:bg-charcoal-light'
              }`}
            >
              {tier.cta}
            </button>

            {/* Features */}
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

      {/* Payment coming soon toast */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="flex items-center gap-3 bg-charcoal text-white px-6 py-3 rounded-2xl shadow-2xl">
            <Sparkles className="w-4 h-4 text-champagne" />
            <span className="text-sm font-medium">
              <strong>{toastTier}</strong> — Payment integration coming soon! We'll be ready before you know it.
            </span>
            <button onClick={() => setShowToast(false)} className="text-white/60 hover:text-white cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
