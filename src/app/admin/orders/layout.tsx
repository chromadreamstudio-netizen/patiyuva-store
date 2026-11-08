'use client';
import { ReactNode, useState, useEffect } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  // التحقق مما إذا كنت قد سجلت الدخول مسبقاً في هذه الجلسة
  useEffect(() => {
    setMounted(true);
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // كلمة المرور الخاصة بك (يمكنك تغييرها كما تشاء)
    if (password === 'Walid2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
    } else {
      setError('كلمة المرور خاطئة، حاول مجدداً!');
    }
  };

  // لمنع مشاكل الـ Hydration في Next.js
  if (!mounted) return (
    <html lang="ar" dir="rtl"><body></body></html>
  );

  // إذا لم تكن مسجلاً للدخول، اعرض شاشة القفل
  if (!isAuthenticated) {
    return (
      <html lang="ar" dir="rtl">
        <body className="bg-slate-50 min-h-screen flex items-center justify-center font-sans">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 w-full max-w-sm text-center">
            <div className="text-5xl mb-4">🔒</div>
            <h2 className="text-2xl font-black text-slate-900 mb-6">لوحة الإدارة</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة المرور..."
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none text-center font-bold transition-all"
                dir="ltr"
              />
              {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
              <button type="submit" className="w-full bg-slate-900 text-white font-bold text-lg py-3 rounded-xl hover:bg-slate-800 transition-colors shadow-lg">
                تسجيل الدخول
              </button>
            </form>
          </div>
        </body>
      </html>
    );
  }

  // إذا كانت كلمة المرور صحيحة، اعرض لوحة التحكم (الطلبات)
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
      </body>
    </html>
  );
}