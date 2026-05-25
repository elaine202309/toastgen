import { useState, useCallback, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, LogIn, X, Gift } from 'lucide-react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import RoleSelector from '../components/RoleSelector';
import SpeechForm from '../components/SpeechForm';
import SpeechOutput from '../components/SpeechOutput';
import PhotoGallery from '../components/PhotoGallery';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import { useSpeechGenerator } from '../hooks/useSpeechGenerator';
import { useAuth } from '../context/AuthContext';
import type { FormData } from '../data/roles';

export default function HomePage() {
  const { user, refreshCredits } = useAuth();
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedTone, setSelectedTone] = useState('balanced');
  const [formData, setFormData] = useState<FormData | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isGenerating, generatedSpeech, error, generateSpeech, regenerateSpeech } = useSpeechGenerator(refreshCredits);
  const outputRef = useRef<HTMLDivElement>(null);

  const handleRoleSelect = useCallback((roleId: string) => {
    setSelectedRole(roleId);
  }, []);

  const handleSubmit = useCallback(async (data: FormData) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setFormData(data);
    await generateSpeech(data);
  }, [generateSpeech, user]);

  const handleRegenerate = useCallback(async () => {
    if (!formData) return;
    await regenerateSpeech(formData);
  }, [formData, regenerateSpeech]);

  useEffect(() => {
    if (generatedSpeech) {
      setTimeout(() => {
        document.getElementById('result')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [generatedSpeech]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      <RoleSelector selectedRole={selectedRole} onSelect={handleRoleSelect} />

      <SpeechForm
        selectedRole={selectedRole}
        selectedTone={selectedTone}
        onToneChange={setSelectedTone}
        isGenerating={isGenerating}
        onSubmit={handleSubmit}
      />
      {(generatedSpeech || (error && formData)) && (
        <div ref={outputRef}>
          <SpeechOutput
            speech={generatedSpeech || ''}
            formData={formData!}
            onRegenerate={handleRegenerate}
            isGenerating={isGenerating}
            error={error}
          />
        </div>
      )}
      <PhotoGallery />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />

      {/* Login/Register Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm" onClick={() => setShowLoginModal(false)} />
          <div className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in">
            <button onClick={() => setShowLoginModal(false)} className="absolute top-4 right-4 p-1 rounded-full hover:bg-blush/30 transition-colors cursor-pointer border-none bg-transparent text-charcoal-light">
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-champagne-light/60 border border-champagne/30 rounded-full text-sm text-charcoal mb-4">
                <Gift className="w-4 h-4 text-champagne" />
                <strong>1 free speech</strong> included
              </div>
              <h2 className="text-2xl font-bold font-heading text-charcoal mb-2">Create Your Free Account</h2>
              <p className="text-charcoal-light text-sm">Sign up to get 1 free speech credit and start crafting your perfect wedding toast.</p>
            </div>

            <div className="space-y-3">
              <Link to="/register" onClick={() => setShowLoginModal(false)}
                className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-gradient-to-r from-coral to-champagne text-white font-bold rounded-xl hover:opacity-95 transition-all no-underline shadow-md">
                <Sparkles className="w-5 h-5" />
                Sign Up Free — Get 1 Free Speech
              </Link>
              <Link to="/login" onClick={() => setShowLoginModal(false)}
                className="flex items-center justify-center gap-2 w-full px-6 py-3.5 border border-charcoal/10 text-charcoal font-medium rounded-xl hover:bg-ivory transition-colors no-underline">
                <LogIn className="w-4 h-4" />
                I already have an account — Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
