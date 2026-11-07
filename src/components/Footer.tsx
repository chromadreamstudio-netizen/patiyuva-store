import Link from 'next/link';

interface FooterProps {
  dict?: any;
  lang: 'tr' | 'ar' | 'en';
}

export default function Footer({ dict, lang }: FooterProps) {
  const isRtl = lang === 'ar';

  const content = {
    tr: {
      aboutTitle: 'Patiyuva Hakkında',
      aboutDesc: 'Evcil dostlarınız için Türkiye’de üretilen birinci sınıf, dayanıklı ve modern tasarımlı kedi tırmalama ağaçları, yuvalar ve bakım ürünleri.',
      aboutLink: 'Hakkımızda',
      quickLinks: 'Kategoriler',
      scratches: 'Lüks Tırmalamalar',
      beds: 'Kedi & Köpek Evleri',
      care: 'Bakım & Sağlık',
      legalTitle: 'Kurumsal & Yasal',
      terms: 'Mesafeli Satış Sözleşmesi',
      refund: 'İptal ve İade Koşulları',
      privacy: 'Gizlilik ve KVKK Politikası',
      contactTitle: 'İletişim Bilgileri',
      address: 'Dumlupınar Mh. Gürpınar Cd. Hiltoon-9 Blk:G N.16G D:11 Nilüfer - Görükle / Bursa',
      phone: '+90 536 319 18 20',
      securePayment: '256-Bit SSL ile %100 Güvenli Ödeme',
      rights: 'Tüm hakları saklıdır.',
    },
    ar: {
      aboutTitle: 'عن باتي يوفا (Patiyuva)',
      aboutDesc: 'منتجات فاخرة وعصرية للحيوانات الأليفة مصنعة في تركيا بأعلى معايير الجودة، تشمل أبراج الخدش والبيوت ومستلزمات العناية.',
      aboutLink: 'من نحن',
      quickLinks: 'الأقسام الرئيسية',
      scratches: 'خداشات فاخرة',
      beds: 'بيوت وأسرّة',
      care: 'عناية وصحة',
      legalTitle: 'السياسات والشروط القانونية',
      terms: 'عقد البيع عن بُعد',
      refund: 'سياسة الإلغاء والاسترجاع',
      privacy: 'سياسة الخصوصية وحماية البيانات',
      contactTitle: 'معلومات التواصل',
      address: 'دوملوبينار، شارع جوربينار، هيلتون-9، بلوك G، ن.16G، شقة 11، نيلوفر - جوروكله / بورصة',
      phone: '+90 536 319 18 20',
      securePayment: 'دفع آمن 100% مشفر بتقنية 256-Bit SSL',
      rights: 'جميع الحقوق محفوظة.',
    },
    en: {
      aboutTitle: 'About Patiyuva',
      aboutDesc: 'Premium, durable, and modern pet furniture, scratching trees, beds, and care products crafted in Türkiye for your beloved companions.',
      aboutLink: 'About Us',
      quickLinks: 'Categories',
      scratches: 'Luxury Scratchers',
      beds: 'Cat & Dog Houses',
      care: 'Care & Wellness',
      legalTitle: 'Legal & Policies',
      terms: 'Distance Sales Agreement',
      refund: 'Cancellation & Refund Policy',
      privacy: 'Privacy & KVKK Policy',
      contactTitle: 'Contact Us',
      address: 'Dumlupinar Mah. Gurpinar Cad. Hiltoon-9 Blk:G N.16G D:11 Nilufer - Gorukle / Bursa',
      phone: '+90 536 319 18 20',
      securePayment: '100% Secure Checkout with 256-Bit SSL',
      rights: 'All rights reserved.',
    },
  };

  const t = content[lang] || content.tr;

  return (
    <footer
      dir={isRtl ? 'rtl' : 'ltr'}
      className="bg-slate-950 text-slate-300 border-t border-slate-800 mt-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 1. Brand & About */}
          <div className="space-y-4">
            <Link href={`/${lang}`} className="inline-block">
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Pati<span className="text-amber-500">yuva</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t.aboutDesc}
            </p>
            <div>
              <Link href={`/${lang}/about`} className="text-sm font-semibold text-amber-500 hover:text-amber-400 transition-colors">
                {t.aboutLink} {isRtl ? '←' : '→'}
              </Link>
            </div>
          </div>

          {/* 2. Categories */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {t.quickLinks}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href={`/${lang}/category/scratches`} className="hover:text-amber-400 transition-colors">
                  {t.scratches}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/category/beds`} className="hover:text-amber-400 transition-colors">
                  {t.beds}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/category/care`} className="hover:text-amber-400 transition-colors">
                  {t.care}
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Legal Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {t.legalTitle}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href={`/${lang}/legal/distance-sales`} className="hover:text-amber-400 transition-colors">
                  {t.terms}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/legal/refund-policy`} className="hover:text-amber-400 transition-colors">
                  {t.refund}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/legal/privacy-policy`} className="hover:text-amber-400 transition-colors">
                  {t.privacy}
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Contact Info */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {t.contactTitle}
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">📍</span>
                <span className="leading-relaxed">{t.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a href="tel:+905363191820" className="hover:text-amber-400 transition-colors" dir="ltr">
                  {t.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <a href="mailto:destek@patiyuva.com" className="hover:text-amber-400 transition-colors">
                  destek@patiyuva.com
                </a>
              </li>
              <li className="flex items-center gap-2 mt-2">
                <span>🔒</span>
                <span className="text-emerald-400 text-xs font-medium">
                  {t.securePayment}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Badges */}
        <div className="mt-10 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-slate-400">
            © 2026 Patiyuva. {t.rights}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="bg-white px-3.5 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm">
              <span className="font-black text-blue-600 text-sm tracking-tight">iyzico</span>
              <span className="text-[11px] font-semibold text-slate-700 border-l border-slate-300 pl-1.5">ile Öde</span>
            </div>
            <div className="bg-white px-3 py-1.5 rounded-md flex items-center justify-center shadow-sm">
              <span className="font-black italic text-blue-900 text-sm tracking-wider">VISA</span>
            </div>
            <div className="bg-white px-3 py-1.5 rounded-md flex items-center gap-1 shadow-sm">
              <span className="w-3.5 h-3.5 rounded-full bg-red-600 inline-block"></span>
              <span className="w-3.5 h-3.5 rounded-full bg-amber-500 -ml-2 inline-block opacity-90"></span>
              <span className="font-bold text-slate-800 text-xs ml-1">mastercard</span>
            </div>
            <div className="bg-white px-3 py-1.5 rounded-md flex items-center justify-center shadow-sm">
              <span className="font-extrabold text-sky-700 text-sm tracking-wide">troy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}