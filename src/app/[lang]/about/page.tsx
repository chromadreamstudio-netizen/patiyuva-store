import Link from 'next/link';

export default async function AboutUs(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;
  const isAr = lang === 'ar';

  const content = {
    ar: { 
      title: 'من نحن - قصة باتي يوفا', 
      back: 'العودة للرئيسية', 
      p1: 'في Patiyuva، نؤمن أن حيوانك الأليف ليس مجرد حيوان، بل هو فرد من العائلة. لذلك، وُلدت علامتنا التجارية في قلب بورصة - تركيا، لتقديم منتجات تجمع بين الفخامة والراحة والمتانة.', 
      p2: 'رؤيتنا: تصميم أبراج خدش وبيوت عصرية لا تُلبي احتياجات قطتك أو كلبك فحسب، بل تُضيف لمسة من الأناقة والدفء إلى ديكور منزلك.', 
      p3: 'الجودة التركية: جميع منتجاتنا تُصنع بأيدي حرفيين مهرة في تركيا، باستخدام أفضل أنواع الخشب والأقمشة الصديقة للبيئة والآمنة تماماً على صحة أليفك.' 
    },
    tr: { 
      title: 'Hakkımızda - Patiyuva Hikayesi', 
      back: 'Ana Sayfaya Dön', 
      p1: 'Patiyuva olarak, evcil hayvanınızın sadece bir hayvan değil, ailenizin bir parçası olduğuna inanıyoruz. Bu nedenle markamız, lüks, konfor ve dayanıklılığı bir araya getiren ürünler sunmak üzere Bursa - Türkiye\'de doğdu.', 
      p2: 'Vizyonumuz: Sadece kedi veya köpeğinizin ihtiyaçlarını karşılamakla kalmayan, aynı zamanda evinizin dekorasyonuna zarafet ve sıcaklık katan modern tırmalama ağaçları ve evler tasarlamak.', 
      p3: 'Türk Kalitesi: Tüm ürünlerimiz, çevre dostu ve evcil hayvanınızın sağlığı için tamamen güvenli olan en iyi ahşap ve kumaşlar kullanılarak Türkiye\'de yetenekli ustalar tarafından üretilmektedir.' 
    },
    en: { 
      title: 'About Us - The Patiyuva Story', 
      back: 'Back to Home', 
      p1: 'At Patiyuva, we believe your pet is not just an animal, but a member of the family. That\'s why our brand was born in Bursa, Türkiye, to offer products that combine luxury, comfort, and durability.', 
      p2: 'Our Vision: To design modern scratching trees and houses that not only meet the needs of your cat or dog but also add a touch of elegance and warmth to your home decor.', 
      p3: 'Turkish Quality: All our products are crafted by skilled artisans in Türkiye, using the finest wood and eco-friendly fabrics that are completely safe for your pet\'s health.' 
    }
  };
  const t = content[lang as keyof typeof content] || content.ar;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 min-h-screen" dir={isAr ? 'rtl' : 'ltr'}>
      <Link href={`/${lang}`} className="inline-block mb-8 text-amber-600 hover:text-amber-700 font-bold transition-colors">
         {isAr ? '← ' : '→ '} {t.back}
      </Link>
      <h1 className="text-4xl font-black mb-8 text-gray-900">{t.title}</h1>
      <div className="prose prose-lg text-gray-600 space-y-6">
        <p className="leading-relaxed">{t.p1}</p>
        <p className="leading-relaxed font-medium text-gray-800">{t.p2}</p>
        <p className="leading-relaxed">{t.p3}</p>
      </div>
    </div>
  );
}