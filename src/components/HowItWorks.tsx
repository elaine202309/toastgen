import { PenLine, Sparkles, Mic } from 'lucide-react';

const steps = [
  {
    icon: PenLine,
    title: 'Share Your Story',
    description: 'Tell us about the couple — your favorite memories, their best qualities, and what makes their love special.',
    color: 'bg-blush-dark',
    iconColor: 'text-champagne',
  },
  {
    icon: Sparkles,
    title: 'AI Crafts Your Speech',
    description: 'Our AI weaves your stories into a polished, heartfelt speech that sounds authentically like you.',
    color: 'bg-champagne-light',
    iconColor: 'text-champagne',
  },
  {
    icon: Mic,
    title: 'Deliver with Confidence',
    description: 'Review, personalize, and practice. Walk up to the mic knowing you have the perfect words.',
    color: 'bg-sage-light',
    iconColor: 'text-sage',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold font-heading text-charcoal mb-4">
          How It Works
        </h2>
        <p className="text-lg text-charcoal-light max-w-xl mx-auto">
          Three simple steps from blank page to unforgettable toast.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <div key={i} className="relative text-center group">
            {/* Connector line (desktop) */}
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px border-t-2 border-dashed border-charcoal/10" />
            )}

            <div className={`w-24 h-24 mx-auto rounded-2xl ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <step.icon className={`w-10 h-10 ${step.iconColor}`} />
            </div>

            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-charcoal text-ivory text-sm font-bold mb-4">
              {i + 1}
            </div>

            <h3 className="text-xl font-bold font-heading text-charcoal mb-3">
              {step.title}
            </h3>
            <p className="text-charcoal-light leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
