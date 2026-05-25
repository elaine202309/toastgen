import { Menu, X, Sparkles, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const { user, logout } = useAuth();

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
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollTo('how-it-works')} className="text-sm text-charcoal-light hover:text-charcoal transition-colors bg-transparent border-none cursor-pointer">How It Works</button>
            <Link to="/pricing" className="text-sm text-charcoal-light hover:text-charcoal transition-colors no-underline">Pricing</Link>
            <button onClick={() => scrollTo('faq')} className="text-sm text-charcoal-light hover:text-charcoal transition-colors bg-transparent border-none cursor-pointer">FAQ</button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-champagne/10 border border-champagne/30 rounded-full text-sm font-medium text-charcoal hover:bg-champagne/20 transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4 text-champagne" />
                  <span className="max-w-[120px] truncate">{user.email}</span>
                  <span className="text-xs bg-champagne text-white px-2 py-0.5 rounded-full font-bold">{user.credits}</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-blush-dark/20 py-1 min-w-[180px]">
                    <div className="px-4 py-2 text-xs text-charcoal-light border-b border-blush-dark/10">
                      {user.credits} speech{user.credits !== 1 ? 'es' : ''} remaining
                    </div>
                    <Link to="/history" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm text-charcoal hover:bg-blush/20 no-underline">
                      My Speeches
                    </Link>
                    <Link to="/pricing" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm text-charcoal hover:bg-blush/20 no-underline">
                      Buy more credits
                    </Link>
                    <button onClick={() => { logout(); setUserMenuOpen(false); }} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-charcoal-light hover:bg-blush/20 cursor-pointer border-none bg-transparent">
                      <LogOut className="w-3.5 h-3.5" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm text-charcoal-light hover:text-charcoal transition-colors no-underline">Sign In</Link>
                <Link to="/register" className="px-4 py-2 bg-champagne text-white text-sm font-medium rounded-full hover:bg-champagne/90 transition-colors no-underline">
                  Sign Up Free
                </Link>
              </div>
            )}

            <button onClick={() => scrollTo('form')} className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-coral to-champagne text-white text-sm font-medium rounded-full hover:opacity-95 transition-colors cursor-pointer border-none">
              <Sparkles className="w-4 h-4" />
              Generate
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
            <Link to="/pricing" onClick={() => setOpen(false)} className="text-sm text-charcoal-light hover:text-charcoal transition-colors px-2 no-underline">Pricing</Link>
            <button onClick={() => scrollTo('faq')} className="text-sm text-charcoal-light hover:text-charcoal transition-colors px-2 bg-transparent border-none cursor-pointer text-left">FAQ</button>

            {user ? (
              <>
                <div className="px-2 text-sm text-charcoal-light">{user.email} · {user.credits} credits</div>
                <Link to="/pricing" onClick={() => setOpen(false)} className="text-sm text-charcoal-light hover:text-charcoal px-2 no-underline">Buy more credits</Link>
                <button onClick={() => { logout(); setOpen(false); }} className="text-sm text-charcoal-light hover:text-charcoal px-2 bg-transparent border-none cursor-pointer text-left">Sign out</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="text-sm text-charcoal-light hover:text-charcoal px-2 no-underline">Sign In</Link>
                <Link to="/register" onClick={() => setOpen(false)} className="text-sm text-charcoal-light hover:text-charcoal px-2 no-underline">Sign Up Free</Link>
              </>
            )}

            <button onClick={() => scrollTo('form')} className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-coral to-champagne text-white text-sm font-medium rounded-full hover:opacity-95 transition-colors cursor-pointer border-none w-fit">
              <Sparkles className="w-4 h-4" />
              Generate
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
