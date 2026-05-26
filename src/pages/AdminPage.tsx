import { useState } from 'react';
import { Shield, Users, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_BASE = import.meta.env.VITE_API_URL || '';

export default function AdminPage() {
  const [key, setKey] = useState('');
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async (adminKey: string) => {
    setLoading(true);
    setError('');
    try {
      const [userRes, statsRes] = await Promise.all([
        fetch(`${API_BASE}/admin/users`, { headers: { 'x-admin-key': adminKey } }),
        fetch(`${API_BASE}/admin/stats`, { headers: { 'x-admin-key': adminKey } }),
      ]);
      if (!userRes.ok) throw new Error('Forbidden — check admin key');
      setData((await userRes.json()).users);
      setStats(await statsRes.json());
      setAuthed(true);
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-24 px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold font-heading text-charcoal mb-6 flex items-center gap-2">
          <Shield className="w-6 h-6 text-champagne" /> Admin Panel
        </h1>

        {!authed ? (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-blush-dark/20 max-w-md">
            <label className="block text-sm font-medium text-charcoal mb-1.5">Admin Key</label>
            <div className="flex gap-3">
              <input type="password" value={key} onChange={e => setKey(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && fetchData(key)}
                className="flex-1 px-4 py-3 rounded-xl border border-charcoal/10 bg-ivory focus:outline-none focus:border-champagne" />
              <button onClick={() => fetchData(key)} disabled={loading}
                className="px-5 py-3 bg-champagne text-white font-medium rounded-xl hover:bg-champagne/90 disabled:opacity-50 cursor-pointer">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Go'}
              </button>
            </div>
            {error && <p className="text-sm text-coral mt-3">{error}</p>}
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            {stats && (
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white rounded-2xl p-6 border border-blush-dark/20 text-center">
                  <Users className="w-8 h-8 text-champagne mx-auto mb-2" />
                  <div className="text-3xl font-bold text-charcoal">{stats.users}</div>
                  <div className="text-sm text-charcoal-light">Registered Users</div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-blush-dark/20 text-center">
                  <Shield className="w-8 h-8 text-champagne mx-auto mb-2" />
                  <div className="text-3xl font-bold text-charcoal">{stats.generations}</div>
                  <div className="text-sm text-charcoal-light">Total Generations</div>
                </div>
              </div>
            )}

            {/* Users Table */}
            {data && (
              <div className="bg-white rounded-2xl border border-blush-dark/20 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-blush-dark/20 bg-blush/30">
                        <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal">ID</th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal">Email</th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-charcoal">Credits</th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-charcoal">Gens</th>
                        <th className="text-right px-6 py-3 text-xs font-semibold text-charcoal">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((u: any) => (
                        <tr key={u.id} className="border-b border-blush-dark/10 last:border-0">
                          <td className="px-6 py-3 text-sm text-charcoal">{u.id}</td>
                          <td className="px-6 py-3 text-sm text-charcoal">{u.email}</td>
                          <td className="text-center px-4 py-3 text-sm text-charcoal font-bold">{u.credits}</td>
                          <td className="text-center px-4 py-3 text-sm text-charcoal-light">{u.generations}</td>
                          <td className="text-right px-6 py-3 text-xs text-charcoal-light/60">{new Date(u.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </section>
      <Footer />
    </div>
  );
}
