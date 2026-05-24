import { Link } from 'react-router-dom';
import { Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-blush-dark/20 bg-white/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2 text-charcoal-light text-sm no-underline">
            <Sparkles className="w-4 h-4 text-champagne" />
            <span>ToastGen &copy; {new Date().getFullYear()}</span>
          </Link>

          <div className="flex items-center gap-1 text-charcoal-light/60 text-sm">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-blush-dark fill-blush-dark" />
            <span>for unforgettable speeches</span>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <Link to="/privacy" className="text-charcoal-light/60 hover:text-charcoal transition-colors no-underline">Privacy</Link>
            <Link to="/terms" className="text-charcoal-light/60 hover:text-charcoal transition-colors no-underline">Terms</Link>
            <Link to="/contact" className="text-charcoal-light/60 hover:text-charcoal transition-colors no-underline">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
