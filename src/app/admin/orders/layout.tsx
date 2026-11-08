import '../globals.css'; // هذا هو السطر السحري الذي سيعيد التصميم!
'use client';
import { ReactNode, useState, useEffect } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Walid2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
    } else {
      setError('كلمة المرور خاطئة، حاول مجدداً!');
    }
  };

  if (!mounted) return (
    <html lang="ar" dir="rtl"><body></body></html>
  );

  if (!isAuthenticated) {
    return (
      <html lang="ar" dir="rtl">
        <body className="bg-slate-50 min-h-screen flex items-center justify-center font-sans">
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 w-full max-w-sm text-center">
            <div className="text-6xl mb-6">🔒</div>
            <h2 className="text-2xl font-black text-slate-900 mb-8">لوحة إدارة Patiyuva</h2>
            <form onSubmit={handleLogin} className="space-y-5">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة المرور..."
                className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 outline-none text-center font-bold transition-all text-lg"
                dir="ltr"
              />
              {error && <p className="text-red-500 text-sm font-bold animate-pulse">{error}</p>}
              <button type="submit" className="w-full bg-slate-900 text-white font-bold text-lg py-4 rounded-xl hover:bg-slate-800 transition-colors shadow-md">
                تسجيل الدخول
              </button>
            </form>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
      </body>
    </html>
  );
}