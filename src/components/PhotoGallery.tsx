import { Heart, Quote } from 'lucide-react';

const photos = [
  {
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=400&fit=crop',
    caption: 'The moment you realize forever starts now.',
  },
  {
    url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=400&fit=crop',
    caption: 'Two hearts, one story, a lifetime of chapters ahead.',
  },
  {
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop',
    caption: 'Surrounded by everyone who matters most.',
  },
  {
    url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&h=400&fit=crop',
    caption: 'Every great love story deserves to be told.',
  },
  {
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
    caption: 'The words come from the heart. We help you find them.',
  },
  {
    url: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&h=400&fit=crop',
    caption: 'Where laughter meets tears of joy.',
  },
];

export default function PhotoGallery() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blush-dark/40 rounded-full text-sm font-medium text-charcoal mb-6">
          <Heart className="w-4 h-4 text-coral fill-coral" />
          Real Moments, Real Joy
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold font-heading text-charcoal mb-4">
          Every Speech Deserves a Beautiful Moment
        </h2>
        <p className="text-lg text-charcoal-light max-w-2xl mx-auto">
          These are the moments your words will live in. We'll help you rise to the occasion.
        </p>
      </div>

      {/* Photo grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
          >
            <img
              src={photo.url}
              alt={`Wedding moment ${i + 1}`}
              className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
              <div className="flex items-start gap-2">
                <Quote className="w-4 h-4 text-white/70 flex-shrink-0 mt-0.5 rotate-180" />
                <p className="text-white/90 text-sm font-medium leading-relaxed">
                  {photo.caption}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
