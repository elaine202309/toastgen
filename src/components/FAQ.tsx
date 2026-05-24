import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How does the AI generate speeches?',
    a: 'Our AI is trained on thousands of successful wedding speeches across all roles and styles. When you share your stories and preferences, it crafts a unique speech tailored to your specific memories, relationship, and tone — no templates involved.',
  },
  {
    q: 'Is my speech unique?',
    a: 'Absolutely. Every speech is generated from scratch based on the specific details, stories, and preferences you provide. You can regenerate for different variations — each one will be different.',
  },
  {
    q: 'Can I edit the generated speech?',
    a: 'Yes! Once your speech is generated, you can edit it directly on the page. We encourage you to personalize it further — the AI gives you a strong foundation, and your personal touches make it perfect.',
  },
  {
    q: 'How long does it take?',
    a: 'Your speech is ready within seconds of filling out the form. You can generate multiple versions, edit, and download — all in under 5 minutes.',
  },
  {
    q: 'What if I don\'t like the result?',
    a: 'Just hit "Regenerate" and you\'ll get a completely new version. You can also try changing the tone, adding more details, or adjusting the length. The more you share, the better the result.',
  },
  {
    q: 'Can I use this for non-wedding events?',
    a: 'While ToastGen is optimized for wedding speeches, it works beautifully for rehearsal dinners, engagement parties, anniversary celebrations, and any occasion that calls for a heartfelt toast.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold font-heading text-charcoal mb-4">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="bg-white rounded-xl border border-blush-dark/20 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer hover:bg-blush/20 transition-colors"
              >
                <span className="font-medium text-charcoal pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-charcoal-light flex-shrink-0 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-4 text-charcoal-light leading-relaxed text-sm">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
