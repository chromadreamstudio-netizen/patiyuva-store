import Link from 'next/link';

export default async function DistanceSales(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;
  const isAr = lang === 'ar';
  
  const content = {
    ar: { title: 'عقد البيع عن بُعد', back: 'العودة للرئيسية', p1: 'المادة 1 - الأطراف: أُبرم هذا العقد بين Patiyuva (يُشار إليه كبائع) والمشتري.', p2: 'المادة 2 - الموضوع: يحدد هذا العقد حقوق والتزامات الطرفين وفقاً لقانون حماية المستهلك التركي رقم 6502.', p3: 'المادة 3 - التسليم: يتم تسليم المنتجات إلى عنوان المشتري خلال مدة لا تتجاوز 30 يوماً قانونياً.' },
    tr: { title: 'Mesafeli Satış Sözleşmesi', back: 'Ana Sayfaya Dön', p1: 'Madde 1 - Taraflar: Bu sözleşme Patiyuva (SATICI) ile ALICI arasında akdedilmiştir.', p2: 'Madde 2 - Konu: Bu sözleşme, 6502 sayılı Tüketicinin Korunması kanunu gereğince hakları belirler.', p3: 'Madde 3 - Teslimat: Ürünler en geç 30 gün içinde teslim edilir.' },
    en: { title: 'Distance Sales Agreement', back: 'Back to Home', p1: 'Article 1 - Parties: This agreement is between Patiyuva (SELLER) and the BUYER.', p2: 'Article 2 - Subject: Determines rights under Turkish Consumer Protection Law No. 6502.', p3: 'Article 3 - Delivery: Products are delivered within a maximum of 30 days.' }
  };
  const t = content[lang as keyof typeof content] || content.ar;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen" dir={isAr ? 'rtl' : 'ltr'}>
      <Link href={`/${lang}`} className="inline-block mb-8 text-indigo-600 hover:text-indigo-800 font-bold transition-colors">
        {isAr ? '← ' : '→ '} {t.back}
      </Link>
      <h1 className="text-3xl font-bold mb-8 text-gray-900">{t.title}</h1>
      <div className="prose text-gray-600 space-y-4">
        <p><strong>{isAr ? 'المادة 1' : 'Madde 1'}:</strong> {t.p1}</p>
        <p><strong>{isAr ? 'المادة 2' : 'Madde 2'}:</strong> {t.p2}</p>
        <p><strong>{isAr ? 'المادة 3' : 'Madde 3'}:</strong> {t.p3}</p>
      </div>
    </div>
  );
}