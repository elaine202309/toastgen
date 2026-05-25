import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import ToneSelector from './ToneSelector';
import type { FormData } from '../data/roles';
import { roles, lengths, relationships, knownYearsOptions, occasions } from '../data/roles';

interface Props {
  selectedRole: string;
  selectedTone: string;
  onToneChange: (tone: string) => void;
  isGenerating: boolean;
  onSubmit: (data: FormData) => void;
}

export default function SpeechForm({ selectedRole, selectedTone, onToneChange, isGenerating, onSubmit }: Props) {
  const role = roles.find(r => r.id === selectedRole);
  const [occasion, setOccasion] = useState('wedding');
  const [groomName, setGroomName] = useState('');
  const [brideName, setBrideName] = useState('');
  const [yourName, setYourName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [knownYears, setKnownYears] = useState('');
  const [threeWords, setThreeWords] = useState('');
  const [firstMet, setFirstMet] = useState('');
  const [funniestMemory, setFunniestMemory] = useState('');
  const [touchingMemory, setTouchingMemory] = useState('');
  const [perfectMatch, setPerfectMatch] = useState('');
  const [futureWish, setFutureWish] = useState('');
  const [thingsToAvoid, setThingsToAvoid] = useState('');
  const [length, setLength] = useState('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groomName.trim() || !brideName.trim() || !yourName.trim()) return;

    onSubmit({
      role: selectedRole,
      occasion,
      tone: selectedTone,
      groomName: groomName.trim(),
      brideName: brideName.trim(),
      yourName: yourName.trim(),
      relationship,
      knownYears,
      threeWords: threeWords.trim(),
      firstMet: firstMet.trim(),
      funniestMemory: funniestMemory.trim(),
      touchingMemory: touchingMemory.trim(),
      perfectMatch: perfectMatch.trim(),
      futureWish: futureWish.trim(),
      thingsToAvoid: thingsToAvoid.trim(),
      length,
    });
  };

  const isValid = groomName.trim() && brideName.trim() && yourName.trim();

  return (
    <section id="form" className="py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold font-heading text-charcoal mb-4">
          Create Your Speech
        </h2>
        <p className="text-lg text-charcoal-light">
          {role ? `Writing a ${role.label.toLowerCase()} speech.` : 'Select a role above to get started.'} Answer a few simple questions and let AI do the rest.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Occasion Selector */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-blush-dark/20">
          <h3 className="text-lg font-bold font-heading text-charcoal mb-4">What's the occasion?</h3>
          <div className="flex flex-wrap gap-2">
            {occasions.map((occ) => (
              <button
                key={occ.id}
                type="button"
                onClick={() => setOccasion(occ.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer border ${
                  occasion === occ.id
                    ? 'bg-champagne text-white border-champagne shadow-md'
                    : 'bg-ivory text-charcoal-light border-charcoal/10 hover:border-champagne/50'
                }`}
              >
                <div className="font-semibold">{occ.label}</div>
                <div className={`text-xs mt-0.5 ${occasion === occ.id ? 'text-white/70' : 'text-charcoal-light/50'}`}>{occ.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 1: Who's Getting Married */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-blush-dark/20 space-y-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-champagne text-white text-sm font-bold flex items-center justify-center flex-shrink-0">1</span>
              <h3 className="text-lg font-bold font-heading text-charcoal">Who's Getting Married?</h3>
            </div>
            <p className="text-sm text-charcoal-light/50 mt-1 ml-10">We'll use these names to make your speech personal.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">Groom's Name *</label>
              <input
                type="text" value={groomName} onChange={e => setGroomName(e.target.value)}
                placeholder="e.g. James"
                className="w-full px-4 py-3 rounded-xl border border-charcoal/10 bg-ivory focus:outline-none focus:border-champagne focus:ring-2 focus:ring-champagne/20 transition-all text-charcoal placeholder:text-charcoal-light/40"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">Bride's Name *</label>
              <input
                type="text" value={brideName} onChange={e => setBrideName(e.target.value)}
                placeholder="e.g. Emily"
                className="w-full px-4 py-3 rounded-xl border border-charcoal/10 bg-ivory focus:outline-none focus:border-champagne focus:ring-2 focus:ring-champagne/20 transition-all text-charcoal placeholder:text-charcoal-light/40"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">Your Name *</label>
            <input
              type="text" value={yourName} onChange={e => setYourName(e.target.value)}
              placeholder="e.g. Michael"
              className="w-full px-4 py-3 rounded-xl border border-charcoal/10 bg-ivory focus:outline-none focus:border-champagne focus:ring-2 focus:ring-champagne/20 transition-all text-charcoal placeholder:text-charcoal-light/40"
            />
          </div>
        </div>

        {/* Step 2: Your Connection */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-blush-dark/20 space-y-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-champagne text-white text-sm font-bold flex items-center justify-center flex-shrink-0">2</span>
              <h3 className="text-lg font-bold font-heading text-charcoal">Your Connection</h3>
            </div>
            <p className="text-sm text-charcoal-light/50 mt-1 ml-10">Help us understand how you know the happy couple.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">How do you know the couple?</label>
              <select
                value={relationship}
                onChange={e => setRelationship(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-charcoal/10 bg-ivory focus:outline-none focus:border-champagne focus:ring-2 focus:ring-champagne/20 transition-all text-charcoal"
              >
                <option value="">Select...</option>
                {relationships.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">How long have you known them?</label>
              <select
                value={knownYears}
                onChange={e => setKnownYears(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-charcoal/10 bg-ivory focus:outline-none focus:border-champagne focus:ring-2 focus:ring-champagne/20 transition-all text-charcoal"
              >
                <option value="">Select...</option>
                {knownYearsOptions.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">
              What 3 words best describe them as a couple?
            </label>
            <input
              type="text" value={threeWords} onChange={e => setThreeWords(e.target.value)}
              placeholder="e.g. Adventurous, kind, inseparable"
              className="w-full px-4 py-3 rounded-xl border border-charcoal/10 bg-ivory focus:outline-none focus:border-champagne focus:ring-2 focus:ring-champagne/20 transition-all text-charcoal placeholder:text-charcoal-light/40"
            />
          </div>
        </div>

        {/* Step 3: Your Stories */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-blush-dark/20 space-y-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-champagne text-white text-sm font-bold flex items-center justify-center flex-shrink-0">3</span>
              <h3 className="text-lg font-bold font-heading text-charcoal">Your Stories</h3>
            </div>
            <p className="text-sm text-charcoal-light/50 mt-1 ml-10">The more specific you are, the more personal your speech will be.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">
              How did you first meet? <span className="text-charcoal-light/50 font-normal">Share the story.</span>
            </label>
            <textarea
              value={firstMet} onChange={e => setFirstMet(e.target.value)}
              rows={2}
              placeholder="e.g. We met at a college party and bonded over our terrible dance moves..."
              className="w-full px-4 py-3 rounded-xl border border-charcoal/10 bg-ivory focus:outline-none focus:border-champagne focus:ring-2 focus:ring-champagne/20 transition-all text-charcoal placeholder:text-charcoal-light/40 resize-y"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">
              What's your funniest memory together?
            </label>
            <textarea
              value={funniestMemory} onChange={e => setFunniestMemory(e.target.value)}
              rows={2}
              placeholder="e.g. That camping trip where everything went wrong but we couldn't stop laughing..."
              className="w-full px-4 py-3 rounded-xl border border-charcoal/10 bg-ivory focus:outline-none focus:border-champagne focus:ring-2 focus:ring-champagne/20 transition-all text-charcoal placeholder:text-charcoal-light/40 resize-y"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">
              What's your most touching memory with them?
            </label>
            <textarea
              value={touchingMemory} onChange={e => setTouchingMemory(e.target.value)}
              rows={2}
              placeholder="e.g. When one of them surprised the other on a tough day — that's when I saw what real love looks like..."
              className="w-full px-4 py-3 rounded-xl border border-charcoal/10 bg-ivory focus:outline-none focus:border-champagne focus:ring-2 focus:ring-champagne/20 transition-all text-charcoal placeholder:text-charcoal-light/40 resize-y"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">
              When did you realize they're perfect for each other?
            </label>
            <textarea
              value={perfectMatch} onChange={e => setPerfectMatch(e.target.value)}
              rows={2}
              placeholder="e.g. I knew when I saw how she looks at him — like he hung the moon..."
              className="w-full px-4 py-3 rounded-xl border border-charcoal/10 bg-ivory focus:outline-none focus:border-champagne focus:ring-2 focus:ring-champagne/20 transition-all text-charcoal placeholder:text-charcoal-light/40 resize-y"
            />
          </div>
        </div>

        {/* Step 4: Your Message + Tone */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-blush-dark/20 space-y-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-champagne text-white text-sm font-bold flex items-center justify-center flex-shrink-0">4</span>
              <h3 className="text-lg font-bold font-heading text-charcoal">Your Message</h3>
            </div>
            <p className="text-sm text-charcoal-light/50 mt-1 ml-10">Add your wishes for the couple and set the right tone.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">
              What's your wish for their future together?
            </label>
            <textarea
              value={futureWish} onChange={e => setFutureWish(e.target.value)}
              rows={2}
              placeholder="e.g. May your love grow deeper with every passing year, and may you always save the last bite of dessert for each other..."
              className="w-full px-4 py-3 rounded-xl border border-charcoal/10 bg-ivory focus:outline-none focus:border-champagne focus:ring-2 focus:ring-champagne/20 transition-all text-charcoal placeholder:text-charcoal-light/40 resize-y"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">
              Anything we should <em>not</em> mention? <span className="text-charcoal-light/50 font-normal">(optional)</span>
            </label>
            <textarea
              value={thingsToAvoid} onChange={e => setThingsToAvoid(e.target.value)}
              rows={2}
              placeholder="e.g. Ex-partners, that Vegas trip, or the time he lost her cat..."
              className="w-full px-4 py-3 rounded-xl border border-charcoal/10 bg-ivory focus:outline-none focus:border-champagne focus:ring-2 focus:ring-champagne/20 transition-all text-charcoal placeholder:text-charcoal-light/40 resize-y"
            />
          </div>

          <div className="pt-2">
            <h4 className="text-sm font-semibold text-charcoal mb-3">Speech Tone</h4>
            <ToneSelector selectedTone={selectedTone} onSelect={onToneChange} />
          </div>
        </div>

        {/* Step 5: Length */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-blush-dark/20 space-y-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-champagne text-white text-sm font-bold flex items-center justify-center flex-shrink-0">5</span>
              <h3 className="text-lg font-bold font-heading text-charcoal">Speech Length</h3>
            </div>
            <p className="text-sm text-charcoal-light/50 mt-1 ml-10">Choose the length that fits your moment.</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {lengths.map((l) => (
              <button
                key={l.value} type="button" onClick={() => setLength(l.value)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer border ${
                  length === l.value
                    ? 'bg-champagne text-white border-champagne shadow-md'
                    : 'bg-ivory text-charcoal-light border-charcoal/10 hover:border-champagne/50'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isValid || isGenerating}
          className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-coral to-champagne text-white text-lg font-bold rounded-2xl hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-coral/20 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Crafting Your Speech...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate My Speech
            </>
          )}
        </button>
      </form>
    </section>
  );
}
