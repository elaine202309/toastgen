import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Copy, Check, ArrowLeft, Sparkles, Download } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface Record {
  id: number;
  role: string;
  occasion: string;
  tone: string;
  names: string | null;
  speech: string;
  created_at: string;
}

export default function HistoryPage() {
  const { token } = useAuth();
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [copied, setCopied] = useState<number | null>(null);

  useEffect(() => {
    if (!token) { setLoading(false); return; }
    fetch(`${API_BASE}/api/generations`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => setRecords(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  const handleCopy = async (text: string, id: number) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownload = (r: Record) => {
    const filename = `${r.names || 'speech'} - ${r.role || 'toast'}.txt`.replace(/[^a-zA-Z0-9 \-_\.]/g, '');
    const blob = new Blob([r.speech], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const occLabel = (o: string) =>
    o === 'rehearsal' ? 'Rehearsal Dinner' : o === 'engagement' ? 'Engagement Party' : o === 'anniversary' ? 'Anniversary' : 'Wedding';

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-charcoal-light hover:text-charcoal mb-6 no-underline">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold font-heading text-charcoal mb-2">My Speeches</h1>
        <p className="text-charcoal-light mb-8">Your previously generated speeches and toasts.</p>

        {loading && (
          <div className="text-center text-charcoal-light py-12">Loading...</div>
        )}

        {!loading && records.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-blush-dark/20">
            <Clock className="w-10 h-10 text-charcoal-light/30 mx-auto mb-4" />
            <p className="text-charcoal-light mb-4">No speeches generated yet.</p>
            <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-champagne text-white font-medium rounded-full hover:bg-champagne/90 transition-colors no-underline">
              <Sparkles className="w-4 h-4" />
              Generate Your First Speech
            </Link>
          </div>
        )}

        {records.map((r) => (
          <div key={r.id} className="bg-white rounded-2xl border border-blush-dark/20 mb-4 overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === r.id ? null : r.id)}
              className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-blush/10 transition-colors cursor-pointer bg-transparent border-none"
            >
              <div>
                <div className="font-semibold text-charcoal text-sm">{r.names || 'Untitled'}</div>
                <div className="text-xs text-charcoal-light/60 mt-0.5">
                  {r.role ? r.role.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Speech'} · {occLabel(r.occasion)} · {r.tone} · {new Date(r.created_at).toLocaleDateString()}
                </div>
              </div>
              <span className="text-charcoal-light/40 text-xs">{new Date(r.created_at).toLocaleDateString()}</span>
            </button>
            {expanded === r.id && (
              <div className="px-6 pb-6 border-t border-blush-dark/10 pt-4">
                <div className="prose text-charcoal-light whitespace-pre-line text-sm leading-relaxed mb-4">
                  {r.speech}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(r.speech, r.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-charcoal text-white text-xs font-medium rounded-full hover:bg-charcoal-light transition-colors cursor-pointer border-none"
                  >
                    {copied === r.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied === r.id ? 'Copied!' : 'Copy'}
                  </button>
                  <button
                    onClick={() => handleDownload(r)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 border border-charcoal/15 text-charcoal text-xs font-medium rounded-full hover:bg-ivory transition-colors cursor-pointer bg-transparent"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </section>
      <Footer />
    </div>
  );
}
