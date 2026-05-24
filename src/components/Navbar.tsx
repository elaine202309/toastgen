import { Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const scrollTo = (id: string) => {
    setOpen(false);
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ivory/90 backdrop-blur-md border-b border-blush-dark/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-2xl font-heading font-bold text-charcoal no-underline">
            <Sparkles className="w-6 h-6 text-champagne" />
            ToastGen
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo('how-it-works')} className="text-sm text-charcoal-light hover:text-charcoal transition-colors bg-transparent border-none cursor-pointer">How It Works</button>
            <button onClick={() => scrollTo('roles')} className="text-sm text-charcoal-light hover:text-charcoal transition-colors bg-transparent border-none cursor-pointer">Speeches</button>
            <Link to="/pricing" className="text-sm text-charcoal-light hover:text-charcoal transition-colors no-underline">Pricing</Link>
            <button onClick={() => scrollTo('faq')} className="text-sm text-charcoal-light hover:text-charcoal transition-colors bg-transparent border-none cursor-pointer">FAQ</button>
            <button onClick={() => scrollTo('form')} className="inline-flex items-center gap-2 px-5 py-2.5 bg-champagne text-white text-sm font-medium rounded-full hover:bg-champagne/90 transition-colors cursor-pointer border-none">
              <Sparkles className="w-4 h-4" />
              Generate Your Speech
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-blush/50 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {open && (
          <div className="md:hidden pb-4 border-t border-blush-dark/20 pt-3 flex flex-col gap-3">
            <button onClick={() => scrollTo('how-it-works')} className="text-sm text-charcoal-light hover:text-charcoal transition-colors px-2 bg-transparent border-none cursor-pointer text-left">How It Works</button>
            <button onClick={() => scrollTo('roles')} className="text-sm text-charcoal-light hover:text-charcoal transition-colors px-2 bg-transparent border-none cursor-pointer text-left">Speeches</button>
            <Link to="/pricing" onClick={() => setOpen(false)} className="text-sm text-charcoal-light hover:text-charcoal transition-colors px-2 no-underline">Pricing</Link>
            <button onClick={() => scrollTo('faq')} className="text-sm text-charcoal-light hover:text-charcoal transition-colors px-2 bg-transparent border-none cursor-pointer text-left">FAQ</button>
            <button onClick={() => scrollTo('form')} className="inline-flex items-center gap-2 px-5 py-2.5 bg-champagne text-white text-sm font-medium rounded-full hover:bg-champagne/90 transition-colors cursor-pointer border-none w-fit">
              <Sparkles className="w-4 h-4" />
              Generate Your Speech
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
