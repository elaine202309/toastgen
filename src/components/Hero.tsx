import { Sparkles, ChevronDown, Heart } from 'lucide-react';

const floatingElements = [
  { emoji: '💕', size: 'text-3xl', anim: 'animate-float', left: '10%', delay: '0s', top: '15%' },
  { emoji: '✨', size: 'text-2xl', anim: 'animate-float-delayed', left: '85%', delay: '1s', top: '20%' },
  { emoji: '💍', size: 'text-3xl', anim: 'animate-float-slow', left: '5%', delay: '0.5s', top: '55%' },
  { emoji: '🥂', size: 'text-2xl', anim: 'animate-float', left: '90%', delay: '2s', top: '60%' },
  { emoji: '🌸', size: 'text-3xl', anim: 'animate-float-delayed', left: '15%', delay: '1.5s', top: '80%' },
  { emoji: '💫', size: 'text-2xl', anim: 'animate-float-slow', left: '80%', delay: '0.8s', top: '75%' },
  { emoji: '🎀', size: 'text-2xl', anim: 'animate-float', left: '50%', delay: '2.5s', top: '10%' },
  { emoji: '💝', size: 'text-3xl', anim: 'animate-float-delayed', left: '92%', delay: '1.2s', top: '40%' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Floating decorative emojis */}
      {floatingElements.map((el, i) => (
        <div
          key={i}
          className={`absolute ${el.anim} pointer-events-none select-none ${el.size}`}
          style={{ left: el.left, top: el.top, animationDelay: el.delay }}
        >
          {el.emoji}
        </div>
      ))}

      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-coral-light/50 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-champagne-light/70 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blush/60 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-light/40 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-sage-light/25 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-charcoal mb-8 border border-blush-dark/30 shadow-sm">
          <Sparkles className="w-4 h-4 text-coral" />
          AI-Powered Speech Writing
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-heading text-charcoal leading-tight mb-6">
          Craft the Perfect{' '}
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-coral to-champagne bg-clip-text text-transparent">
              Wedding Speech
            </span>
          </span>{' '}
          in Minutes
        </h1>

        <p className="text-lg sm:text-xl text-charcoal-light max-w-2xl mx-auto mb-10 leading-relaxed">
          AI-powered, personalized toasts for every role — best man, maid of honor, parents, and more.
          No templates. No stress. Just a speech that sounds like <em>you</em>.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#roles"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-coral to-champagne text-white text-lg font-semibold rounded-full hover:opacity-95 transition-all shadow-lg shadow-coral/20 hover:shadow-xl hover:shadow-coral/30 hover:-translate-y-0.5 no-underline"
          >
            <Sparkles className="w-5 h-5" />
            Start Your Speech
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-charcoal/10 text-charcoal text-lg font-medium rounded-full hover:border-champagne/40 hover:bg-white/60 transition-all no-underline"
          >
            How It Works
          </a>
        </div>

        {/* Trust badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-charcoal-light/60">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sage" />
            100% Personalized
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-champagne" />
            Ready in Seconds
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-coral" />
            <Heart className="w-3.5 h-3.5 fill-coral text-coral" />
            Loved by Thousands
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-charcoal-light/30" />
      </div>
    </section>
  );
}
