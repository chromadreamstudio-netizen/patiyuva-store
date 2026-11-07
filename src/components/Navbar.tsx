import Image from 'next/image';
import Link from 'next/link';
import CartIcon from './CartIcon';

interface NavbarProps {
  lang: 'tr' | 'ar' | 'en';
}

export default function Navbar({ lang }: NavbarProps) {
  const dict = {
    ar: { all: 'المتجر', scratches: 'خداشات فاخرة', beds: 'بيوت وأسرة', care: 'عناية وصحة' },
    tr: { all: 'Mağaza', scratches: 'Lüks Tırmalamalar', beds: 'Yataklar ve Evler', care: 'Bakım ve Sağlık' },
    en: { all: 'Shop', scratches: 'Luxury Scratchers', beds: 'Beds & Houses', care: 'Health & Care' }
  };
  const t = dict[lang] || dict.ar;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center group">
            <div className="relative w-28 h-12 md:w-40 md:h-16 flex items-center justify-start overflow-hidden transition-transform group-hover:scale-105">
              <Image src="/logo.png" alt="Patiyuva Logo" fill sizes="160px" className="object-contain object-left" priority />
            </div>
          </Link>
          
          {/* Links for Mobile (Scrollable) & Desktop */}
          <div className="flex overflow-x-auto hide-scrollbar py-2 md:py-0 md:absolute md:top-0 md:left-1/2 md:-translate-x-1/2 md:h-20 items-center gap-6 text-sm font-bold text-gray-600 whitespace-nowrap px-1">
            <Link href={`/${lang}/category/all`} className="hover:text-amber-600 transition-colors shrink-0">{t.all}</Link>
            <Link href={`/${lang}/category/scratches`} className="hover:text-amber-600 transition-colors shrink-0">{t.scratches}</Link>
            <Link href={`/${lang}/category/beds`} className="hover:text-amber-600 transition-colors shrink-0">{t.beds}</Link>
            <Link href={`/${lang}/category/care`} className="hover:text-amber-600 transition-colors shrink-0">{t.care}</Link>
          </div>

          {/* Languages & Cart */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex gap-1 md:gap-1.5 text-[10px] md:text-xs font-bold bg-gray-100 p-1 rounded-full">
              <Link href="/tr" className={`px-2 py-1 md:py-1.5 rounded-full ${lang === 'tr' ? 'bg-amber-500 text-white' : 'text-gray-500 hover:bg-gray-200'}`}>TR</Link>
              <Link href="/ar" className={`px-2 py-1 md:py-1.5 rounded-full ${lang === 'ar' ? 'bg-amber-500 text-white' : 'text-gray-500 hover:bg-gray-200'}`}>AR</Link>
              <Link href="/en" className={`px-2 py-1 md:py-1.5 rounded-full ${lang === 'en' ? 'bg-amber-500 text-white' : 'text-gray-500 hover:bg-gray-200'}`}>EN</Link>
            </div>
            
            {/* أيقونة السلة السحرية هنا! */}
            <CartIcon lang={lang} />
          </div>

        </div>
      </div>
    </nav>
  );
}