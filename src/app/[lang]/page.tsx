export const instant = false;

import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

// 1. تحسين الـ SEO (محركات البحث) باللغات الثلاث
export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const seo = {
    ar: { title: 'باتي يوفا | أثاث فاخر للحيوانات الأليفة', desc: 'اكتشف أفضل أبراج الخدش وبيوت القطط والكلاب الفاخرة. صناعة تركية بجودة عالية وتصميم يضفي أناقة لمنزلك.' },
    tr: { title: 'Patiyuva | Lüks Evcil Hayvan Mobilyaları', desc: 'En iyi kedi tırmalama ağaçları ve köpek evlerini keşfedin. Yüksek kaliteli, evinize zarafet katan Türk yapımı tasarımlar.' },
    en: { title: 'Patiyuva | Premium Pet Furniture', desc: 'Discover the best luxury cat scratching trees and dog houses. High quality, made in Turkiye adding elegance to your home.' }
  };
  const t = seo[lang as keyof typeof seo] || seo.ar;
  
  return {
    title: t.title,
    description: t.desc,
  }
}

export default async function HomePage(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;
  const isAr = lang === 'ar';
  
  // 2. جلب المنتجات (الأكثر مبيعاً) مع فلترة المنتجات التي بدون صور وإخفاء اسم المصنع
  const { data: products } = await supabase
    .from('products')
    .select(`id, product_code, selling_price, image_url, category, product_translations!inner(name)`)
    .eq('is_active', true)
    .not('image_url', 'is', null)
    .neq('image_url', '')
    .eq('product_translations.lang_code', lang)
    .limit(10); // عرض 10 منتجات كأكثر مبيعاً

  const cleanName = (name: string) => {
    if (!name) return '';
    return name.replace(/pugalo|alfie|windy/gi, 'Patiyuva').trim();
  };

  // 3. القاموس التسويقي الشامل
  const dict = {
    ar: { 
      navCats: { all: 'المتجر', scratches: 'خداشات فاخرة', beds: 'بيوت وأسرة', care: 'عناية وصحة' },
      heroTitle: 'راحة تليق بملوك المنزل',
      heroSub: 'تصميمات فخمة وخامات طبيعية لأليفك، ولمسة أناقة لبيتك.',
      cta: 'اكتشف التشكيلة',
      bestSellers: 'الأكثر مبيعاً هذا الأسبوع',
      shopNow: 'تسوق الآن',
      features: [
        { icon: '🏆', title: 'جودة استثنائية', desc: 'خامات فاخرة وتصنيع متين' },
        { icon: '🇹🇷', title: 'صناعة تركية', desc: 'أيدي حرفية ماهرة' },
        { icon: '🌿', title: 'مواد آمنة', desc: 'صديقة للبيئة ولأليفك' },
        { icon: '🔒', title: 'دفع آمن', desc: 'تشفير 100% لبياناتك' }
      ]
    },
    tr: { 
      navCats: { all: 'Mağaza', scratches: 'Lüks Tırmalamalar', beds: 'Yataklar ve Evler', care: 'Bakım ve Sağlık' },
      heroTitle: 'Evinizin Krallarına Lâyık Konfor',
      heroSub: 'Evcil dostunuz için lüks tasarımlar ve doğal materyaller, eviniz için zarif bir dokunuş.',
      cta: 'Koleksiyonu Keşfet',
      bestSellers: 'Bu Haftanın Çok Satanları',
      shopNow: 'Hemen Al',
      features: [
        { icon: '🏆', title: 'Üstün Kalite', desc: 'Dayanıklı lüks materyaller' },
        { icon: '🇹🇷', title: 'Yerli Üretim', desc: 'Türkiye\'de özenle üretildi' },
        { icon: '🌿', title: 'Güvenli İçerik', desc: 'Evcil hayvan dostu' },
        { icon: '🔒', title: 'Güvenli Ödeme', desc: '%100 şifreli koruma' }
      ]
    },
    en: { 
      navCats: { all: 'Shop', scratches: 'Luxury Scratchers', beds: 'Beds & Houses', care: 'Health & Care' },
      heroTitle: 'Comfort Fit for Home Royalty',
      heroSub: 'Luxurious designs and natural materials for your pet, adding a touch of elegance to your home.',
      cta: 'Discover Collection',
      bestSellers: 'This Week\'s Best Sellers',
      shopNow: 'Shop Now',
      features: [
        { icon: '🏆', title: 'Premium Quality', desc: 'Durable & luxurious' },
        { icon: '🇹🇷', title: 'Made in Türkiye', desc: 'Crafted by artisans' },
        { icon: '🌿', title: 'Safe Materials', desc: 'Eco & pet friendly' },
        { icon: '🔒', title: 'Secure Payment', desc: '100% encrypted' }
      ]
    }
  }
  const t = dict[lang as keyof typeof dict] || dict.ar;

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href={`/${lang}`} className="flex items-center group">
              <div className="relative w-32 h-16 md:w-40 flex items-center justify-start overflow-hidden transition-transform group-hover:scale-105">
                <Image src="/logo.png" alt="Patiyuva Logo" fill sizes="160px" className="object-contain object-left" priority />
              </div>
            </Link>
            
            <div className="hidden md:flex gap-8 items-center font-bold text-gray-600 text-sm">
              <Link href={`/${lang}/category/all`} className="hover:text-amber-600 transition-colors">{t.navCats.all}</Link>
              <Link href={`/${lang}/category/scratches`} className="hover:text-amber-600 transition-colors">{t.navCats.scratches}</Link>
              <Link href={`/${lang}/category/beds`} className="hover:text-amber-600 transition-colors">{t.navCats.beds}</Link>
              <Link href={`/${lang}/category/care`} className="hover:text-amber-600 transition-colors">{t.navCats.care}</Link>
            </div>
            
            {/* أزرار تغيير اللغة في النافبار (اختياري، يمكنك تعديله حسب تصميمك السابق) */}
            <div className="flex gap-2 text-xs font-bold bg-gray-100 p-1 rounded-full">
              <Link href="/tr" className={`px-3 py-1.5 rounded-full ${lang === 'tr' ? 'bg-amber-500 text-white' : 'text-gray-500 hover:bg-gray-200'}`}>TR</Link>
              <Link href="/ar" className={`px-3 py-1.5 rounded-full ${lang === 'ar' ? 'bg-amber-500 text-white' : 'text-gray-500 hover:bg-gray-200'}`}>AR</Link>
              <Link href="/en" className={`px-3 py-1.5 rounded-full ${lang === 'en' ? 'bg-amber-500 text-white' : 'text-gray-500 hover:bg-gray-200'}`}>EN</Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {/* 1. Hero Section (قسم الهبوط المبهر) */}
        <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          {/* خلفية الهبوط (يمكنك تغيير src للصورة التي رفعتها مسبقاً) */}
          <div className="absolute inset-0 z-0 bg-slate-900">
             <Image 
                src="/hero-image.jpg" // تأكد من وضع صورة جميلة باسم hero-image.jpg في مجلد public
                alt="Patiyuva Luxury Pet Furniture" 
                fill 
                className="object-cover opacity-60"
                priority
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-lg leading-tight">
              {t.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-10 font-medium max-w-2xl drop-shadow-md">
              {t.heroSub}
            </p>
            <Link href={`/${lang}/category/all`} className="bg-amber-500 text-slate-900 font-bold text-lg px-8 py-4 rounded-full hover:bg-amber-400 transform hover:scale-105 transition-all shadow-xl">
              {t.cta}
            </Link>
          </div>
        </section>

        {/* 2. Trust Badges Section (عناصر الثقة التسويقية) */}
        <section className="bg-white border-b border-gray-100 py-8 shadow-sm relative z-20 -mt-6 mx-4 md:mx-auto max-w-6xl rounded-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 divide-x divide-gray-50 rtl:divide-x-reverse">
            {t.features.map((feat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center px-2">
                <span className="text-3xl mb-2">{feat.icon}</span>
                <h4 className="font-bold text-gray-800 text-sm mb-1">{feat.title}</h4>
                <p className="text-xs text-gray-500">{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Best Sellers Section (قسم الأكثر مبيعاً) */}
        <section className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
          <div className="text-center mb-12">
             <h2 className="text-3xl md:text-4xl font-black text-gray-900">{t.bestSellers}</h2>
             <div className="w-24 h-1.5 bg-amber-500 mx-auto mt-4 rounded-full"></div>
          </div>
          
          {products && products.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {products.map(product => {
                const pName = cleanName(product.product_translations[0]?.name)
                return (
                  <Link href={`/${lang}/product/${product.id}`} key={product.id} className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative">
                    <div className="relative w-full aspect-square bg-gray-50 flex flex-col items-center justify-center p-4">
                      {product.image_url && (
                        <Image 
                          src={product.image_url} 
                          alt={pName} 
                          fill 
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw" 
                          className="object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out" 
                        />
                      )}
                    </div>
                    <div className="p-4 flex flex-col flex-grow justify-between text-center">
                      <h3 className="text-sm font-bold text-gray-800 line-clamp-2 mb-3 group-hover:text-amber-600 transition-colors">{pName}</h3>
                      <p className="text-xl font-black text-gray-900 mb-3">{product.selling_price} <span className="text-sm font-medium text-gray-500">TL</span></p>
                      <span className="w-full block bg-slate-900 text-white text-xs font-bold py-2.5 rounded-lg group-hover:bg-amber-500 transition-colors">
                        {t.shopNow}
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </section>

      </main>
    </div>
  )
}