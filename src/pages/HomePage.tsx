import { useState, useCallback, useRef, useEffect } from 'react';
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
import type { FormData } from '../data/roles';

export default function HomePage() {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedTone, setSelectedTone] = useState('balanced');
  const [formData, setFormData] = useState<FormData | null>(null);
  const { isGenerating, generatedSpeech, error, generateSpeech, regenerateSpeech } = useSpeechGenerator();
  const outputRef = useRef<HTMLDivElement>(null);

  const handleRoleSelect = useCallback((roleId: string) => {
    setSelectedRole(roleId);
    setSelectedTone(prev => prev);
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
