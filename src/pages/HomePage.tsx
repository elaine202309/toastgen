import { useState, useCallback, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, LogIn } from 'lucide-react';
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
  const { isGenerating, generatedSpeech, error, generateSpeech, regenerateSpeech } = useSpeechGenerator(refreshCredits);
  const outputRef = useRef<HTMLDivElement>(null);

  const handleRoleSelect = useCallback((roleId: string) => {
    setSelectedRole(roleId);
  }, []);

  const handleSubmit = useCallback(async (data: FormData) => {
    setFormData(data);
    await generateSpeech(data);
  }, [generateSpeech]);

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

      {!user && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12">
          <div className="bg-champagne-light/60 border border-champagne/30 rounded-2xl p-6 sm:p-8 text-center">
            <h3 className="text-xl font-bold font-heading text-charcoal mb-2">Sign up to generate your speech</h3>
            <p className="text-charcoal-light mb-5 text-sm">Create a free account to get 1 free speech — no payment required.</p>
            <div className="flex items-center justify-center gap-3">
              <Link to="/register" className="inline-flex items-center gap-2 px-6 py-3 bg-champagne text-white font-medium rounded-full hover:bg-champagne/90 transition-colors no-underline">
                <Sparkles className="w-4 h-4" />
                Sign Up Free
              </Link>
              <Link to="/login" className="inline-flex items-center gap-2 px-6 py-3 border border-charcoal/10 text-charcoal font-medium rounded-full hover:bg-white transition-colors no-underline">
                <LogIn className="w-4 h-4" />
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}

      <SpeechForm
        selectedRole={selectedRole}
        selectedTone={selectedTone}
        onToneChange={setSelectedTone}
        isGenerating={isGenerating}
        onSubmit={handleSubmit}
      />
      {generatedSpeech && formData && (
        <div ref={outputRef}>
          <SpeechOutput
            speech={generatedSpeech}
            formData={formData}
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
    </div>
  );
}
