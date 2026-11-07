import Link from 'next/link';

export default async function PrivacyPolicy(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;
  const isAr = lang === 'ar';

  const content = {
    ar: { title: 'سياسة الخصوصية', back: 'العودة للرئيسية', p1: 'حماية البيانات: نحن نهتم بخصوصيتك ونحمي بياناتك وفقاً لقانون حماية البيانات التركي (KVKK).', p2: 'الاستخدام: نستخدم بياناتك (الاسم، العنوان) فقط لتوصيل الطلبات وتوفير خدمة أفضل.', p3: 'الدفع الآمن: لا نحتفظ ببيانات بطاقتك الائتمانية، جميع المدفوعات مشفرة 100% عبر بوابات الدفع الرسمية.' },
    tr: { title: 'Gizlilik ve KVKK Politikası', back: 'Ana Sayfaya Dön', p1: 'Veri Koruması: Verilerinizi KVKK kapsamında koruyoruz.', p2: 'Kullanım: Bilgileriniz sadece sipariş teslimatı için kullanılır.', p3: 'Güvenlik: Kart bilgileriniz saklanmaz, 256-bit şifreleme ile korunur.' },
    en: { title: 'Privacy Policy', back: 'Back to Home', p1: 'Data Protection: We protect your data under Turkish KVKK laws.', p2: 'Usage: Your info is used solely for order fulfillment.', p3: 'Security: Credit card details are never stored and are 100% encrypted.' }
  };
  const t = content[lang as keyof typeof content] || content.ar;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen" dir={isAr ? 'rtl' : 'ltr'}>
      <Link href={`/${lang}`} className="inline-block mb-8 text-indigo-600 hover:text-indigo-800 font-bold transition-colors">
         {isAr ? '← ' : '→ '} {t.back}
      </Link>
      <h1 className="text-3xl font-bold mb-8 text-gray-900">{t.title}</h1>
      <div className="prose text-gray-600 space-y-4">
        <p>{t.p1}</p><p>{t.p2}</p><p>{t.p3}</p>
      </div>
    </div>
  );
}