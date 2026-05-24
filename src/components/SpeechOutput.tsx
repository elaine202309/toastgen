import { useState } from 'react';
import { Copy, Download, RefreshCw, Check, Lightbulb, Edit3 } from 'lucide-react';
import type { FormData } from '../data/roles';

interface Props {
  speech: string;
  formData: FormData;
  onRegenerate: () => void;
  isGenerating: boolean;
  error?: string | null;
}

export default function SpeechOutput({ speech, formData, onRegenerate, isGenerating, error }: Props) {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSpeech, setEditedSpeech] = useState(speech);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(editedSpeech);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([editedSpeech], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wedding-speech-${formData.groomName}-${formData.brideName}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="result" className="py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto scroll-mt-20">
      <div className="text-center mb-8">
        <h2 className="text-4xl sm:text-5xl font-bold font-heading text-charcoal mb-4">
          Your Speech is Ready
        </h2>
        <p className="text-charcoal-light">
          For {formData.groomName} & {formData.brideName}'s wedding &middot; {formData.length === 'short' ? '~3 min' : formData.length === 'long' ? '~5 min' : '~4 min'} delivery
        </p>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 bg-champagne-light/50 border border-champagne/30 rounded-xl text-sm text-charcoal-light text-center">
          {error}
        </div>
      )}

      {/* Speech card */}
      <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-blush-dark/20 mb-6">
        {isEditing ? (
          <textarea
            value={editedSpeech}
            onChange={e => setEditedSpeech(e.target.value)}
            className="w-full min-h-[300px] text-charcoal leading-relaxed text-base resize-y bg-transparent border-none outline-none font-body"
            autoFocus
          />
        ) : (
          <div className="prose prose-lg max-w-none text-charcoal leading-relaxed whitespace-pre-line text-base font-body">
            {editedSpeech}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3 mb-12">
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-charcoal text-white text-sm font-medium rounded-full hover:bg-charcoal-light transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>

        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-charcoal/15 text-charcoal text-sm font-medium rounded-full hover:bg-white transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" />
          Download .txt
        </button>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`inline-flex items-center gap-2 px-5 py-2.5 border text-sm font-medium rounded-full transition-colors cursor-pointer ${
            isEditing
              ? 'bg-champagne text-white border-champagne'
              : 'border-charcoal/15 text-charcoal hover:bg-white'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          {isEditing ? 'Done' : 'Edit'}
        </button>

        <button
          onClick={onRegenerate}
          disabled={isGenerating}
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-charcoal/15 text-charcoal text-sm font-medium rounded-full hover:bg-white transition-colors disabled:opacity-40 cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          Regenerate
        </button>
      </div>

      {/* Tips */}
      <div className="bg-sage-light/50 rounded-2xl p-6 sm:p-8 border border-sage/20">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-sage/30 flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-5 h-5 text-charcoal" />
          </div>
          <div>
            <h4 className="font-bold font-heading text-charcoal mb-2">Tips for Delivery</h4>
            <ul className="space-y-1.5 text-sm text-charcoal-light">
              <li>&middot; Practice reading it aloud 2-3 times before the big moment</li>
              <li>&middot; Speak slower than you think you need to — nerves speed us up</li>
              <li>&middot; Make eye contact with the couple and the audience</li>
              <li>&middot; It's okay to pause for laughter or emotion — don't rush through</li>
              <li>&middot; Print a copy or keep it on your phone as a backup</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
