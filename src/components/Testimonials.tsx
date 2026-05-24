import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'David K.',
    role: 'Best Man',
    text: 'I was terrified of writing my best man speech. ToastGen took my scattered memories and turned them into something that had everyone laughing AND crying. The groom said it was the best speech of the night.',
    rating: 5,
  },
  {
    name: 'Sarah M.',
    role: 'Maid of Honor',
    text: 'I had two days before the wedding and zero ideas. In 5 minutes I had a beautiful, personal speech that sounded exactly like something I would write — if I were a much better writer.',
    rating: 5,
  },
  {
    name: 'Robert L.',
    role: 'Father of the Bride',
    text: 'As a dad, you want every word to be perfect. ToastGen helped me capture 30 years of love and memories in a speech that felt genuine and heartfelt. My daughter still talks about it.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold font-heading text-charcoal mb-4">
          Loved by Speakers Everywhere
        </h2>
        <p className="text-lg text-charcoal-light max-w-xl mx-auto">
          Join thousands who delivered unforgettable speeches with ToastGen.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-blush-dark/20">
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-champagne text-champagne" />
              ))}
            </div>
            <blockquote className="text-charcoal-light leading-relaxed mb-4 italic">
              "{t.text}"
            </blockquote>
            <div>
              <div className="font-semibold text-charcoal text-sm">{t.name}</div>
              <div className="text-xs text-charcoal-light/60">{t.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
