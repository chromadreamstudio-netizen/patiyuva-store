'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLang = pathname?.split('/')[1] || 'tr';
  const cartItems = useCartStore((state) => state.items);
  
  // حالة لفتح وإغلاق قائمة الموبايل
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // دالة تغيير اللغة
  const switchLanguage = (lang: string) => {
    const newPath = pathname.replace(`/${currentLang}`, `/${lang}`);
    router.push(newPath);
    setIsMobileMenuOpen(false); // إغلاق القائمة بعد تغيير اللغة
  };

  const dict = {
    ar: { store: 'المتجر', beds: 'أسرة فاخرة', scratches: 'خداشات', care: 'عناية وصحة' },
    tr: { store: 'Mağaza', beds: 'Yataklar ve Evler', scratches: 'Lüks Tırmalamalar', care: 'Bakım ve Sağlık' },
    en: { store: 'Store', beds: 'Luxury Beds', scratches: 'Scratching Trees', care: 'Care & Health' }
  };
  const t = dict[currentLang as keyof typeof dict] || dict.tr;

  const navLinks = [
    { name: t.store, href: `/${currentLang}/category/all` },
    { name: t.scratches, href: `/${currentLang}/category/scratches` },
    { name: t.beds, href: `/${currentLang}/category/beds` },
    { name: t.care, href: `/${currentLang}/category/care` },
  ];

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href={`/${currentLang}`}>
              <Image src="/logo.png" alt="Patiyuva Logo" width={140} height={50} className="w-auto h-10 md:h-12" priority />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-sm font-bold text-gray-700 hover:text-amber-500 transition-colors">
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons & Language (Desktop & Mobile) */}
          <div className="flex items-center gap-4 md:gap-6">
            
            {/* Language Switcher - Desktop */}
            <div className="hidden md:flex bg-gray-100 rounded-full p-1">
              {['tr', 'ar', 'en'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => switchLanguage(lang)}
                  className={`px-3 py-1 text-xs font-bold rounded-full uppercase transition-all ${currentLang === lang ? 'bg-amber-500 text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Cart Icon */}
            <Link href={`/${currentLang}/cart`} className="relative p-2 text-gray-700 hover:text-amber-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-white text-[10px] font-bold shadow-sm">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-4">
            
            {/* Mobile Language Switcher */}
            <div className="flex justify-center bg-gray-50 rounded-lg p-2 mb-4">
              {['tr', 'ar', 'en'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => switchLanguage(lang)}
                  className={`flex-1 py-2 text-sm font-bold rounded-md uppercase transition-all ${currentLang === lang ? 'bg-amber-500 text-white shadow-sm' : 'text-gray-500'}`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-bold text-gray-800 p-3 rounded-lg hover:bg-gray-50 bg-white border border-gray-100 text-center"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}