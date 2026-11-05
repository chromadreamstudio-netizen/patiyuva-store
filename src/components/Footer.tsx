import Link from 'next/link';

// قمنا بإزالة 'use client' و useParams لجعل الفوتر سريعاً ومتوافقاً مع Next.js 15
export default function Footer({ dict, lang = 'tr' }: { dict?: any, lang?: string }) {
  
  return (
    <footer className="bg-white border-t border-gray-200 mt-24 py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-start">
        
        {/* القسم الأول: الشعار والحقوق */}
        <div className="flex flex-col gap-4 items-center md:items-start">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            Patiyuva<span className="text-indigo-600">.</span>
          </h2>
          <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-xs">
            {dict?.footer?.slogan || 'Can dostunuzun sıcak yuvası.'}
          </p>
          <div className="mt-2 text-xs text-gray-400">
            {dict?.footer?.rights || 'Patiyuva © 2026. Tüm hakları saklıdır.'}
          </div>
        </div>

        {/* القسم الثاني: الروابط القانونية (مهمة جداً لبوابة الدفع) */}
        <div className="flex flex-col gap-3 items-center md:items-start">
          <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider">
            {dict?.footer?.legalTitle || 'Kurumsal'}
          </h3>
          <Link href={`/${lang}/legal/sales`} className="text-sm text-gray-600 hover:text-indigo-600 transition-colors font-medium">
            {dict?.footer?.sales || 'Mesafeli Satış Sözleşmesi'}
          </Link>
          <Link href={`/${lang}/legal/privacy`} className="text-sm text-gray-600 hover:text-indigo-600 transition-colors font-medium">
            {dict?.footer?.privacy || 'Gizlilik Politikası'}
          </Link>
          <Link href={`/${lang}/legal/refund`} className="text-sm text-gray-600 hover:text-indigo-600 transition-colors font-medium">
            {dict?.footer?.refund || 'İptal ve İade Koşulları'}
          </Link>
        </div>

        {/* القسم الثالث: التواصل وشعارات الدفع المعتمدة */}
        <div className="flex flex-col gap-4 items-center md:items-start">
          <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider">
            {dict?.footer?.supportTitle || 'İletişim & Güvenlik'}
          </h3>
          <p className="text-sm text-gray-600 font-medium">destek@patiyuva.com</p>
          <p className="text-sm text-gray-600 font-medium">+90 555 123 4567</p>
          
          {/* شعارات الدفع لضمان موافقة iyzico */}
          <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-4 text-lg md:text-xl font-black opacity-80">
            <span className="text-[#0074E4] bg-blue-50 px-2 py-1 rounded">iyzico</span>
            <span className="text-[#1A1F71] border border-gray-200 px-2 py-1 rounded">VISA</span>
            <span className="text-[#EB001B] border border-gray-200 px-2 py-1 rounded">mastercard</span>
            <span className="text-[#FF5A00] border border-gray-200 px-2 py-1 rounded">TROY</span>
          </div>
        </div>

      </div>
    </footer>
  );
}