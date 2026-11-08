export const instant = false;

import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

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
  
  const { data: products } = await supabase
    .from('products')
    .select(`id, product_code, selling_price, image_url, category, product_translations!inner(name)`)
    .eq('is_active', true)
    .not('image_url', 'is', null)
    .neq('image_url', '')
    .eq('product_translations.lang_code', lang)
    .limit(10);

  const cleanName = (name: string) => {
    if (!name) return '';
    return name.replace(/pugalo|alfie|windy/gi, 'Patiyuva').trim();
  };

  const dict = {
    ar: { 
      heroTitle: 'راحة تليق بملوك المنزل',
      heroSub: 'تصميمات فخمة وخامات طبيعية لأليفك، ولمسة أناقة لبيتك.',
      cta: 'اكتشف التشكيلة',
      bestSellers: 'الأكثر مبيعاً هذا الأسبوع',
      shopNow: 'تسوق الآن',
      features: [
        { icon: '🌟', title: 'جودة استثنائية', desc: 'خامات فاخرة وتصنيع متين' },
        { icon: '🇹🇷', title: 'صناعة تركية', desc: 'أيدي حرفية ماهرة' },
        { icon: '🌿', title: 'مواد آمنة', desc: 'صديقة للبيئة ولأليفك' },
        { icon: '🛡️', title: 'دفع آمن', desc: 'تشفير 100% لبياناتك' }
      ],
      faqTitle: 'الأسئلة الشائعة',
      faqs: [
        { q: 'هل الخامات المستخدمة آمنة للحيوانات؟', a: 'نعم بالتأكيد! جميع منتجاتنا مصنعة من أخشاب وأقمشة طبيعية صديقة للبيئة وخالية من أي مواد كيميائية ضارة.' },
        { q: 'كم يستغرق توصيل الطلب؟', a: 'يتم شحن الطلبات خلال 24 ساعة، وتصلك لباب منزلك في غضون 2-4 أيام عمل في جميع أنحاء تركيا.' },
        { q: 'هل يمكنني إرجاع المنتج إذا لم يعجبني؟', a: 'نوفر سياسة إرجاع مرنة خلال 14 يوماً من الاستلام، بشرط أن يكون المنتج بحالته الأصلية ولم يتم استخدامه.' }
      ]
    },
    tr: { 
      heroTitle: 'Evinizin Krallarına Lâyık Konfor',
      heroSub: 'Evcil dostunuz için lüks tasarımlar ve doğal materyaller, eviniz için zarif bir dokunuş.',
      cta: 'Koleksiyonu Keşfet',
      bestSellers: 'Bu Haftanın Çok Satanları',
      shopNow: 'Hemen Al',
      features: [
        { icon: '🌟', title: 'Üstün Kalite', desc: 'Dayanıklı lüks materyaller' },
        { icon: '🇹🇷', title: 'Yerli Üretim', desc: 'Türkiye\'de özenle üretildi' },
        { icon: '🌿', title: 'Güvenli İçerik', desc: 'Evcil hayvan dostu' },
        { icon: '🛡️', title: 'Güvenli Ödeme', desc: '%100 şifreli koruma' }
      ],
      faqTitle: 'Sıkça Sorulan Sorular',
      faqs: [
        { q: 'Kullanılan malzemeler evcil hayvanlar için güvenli mi?', a: 'Kesinlikle! Tüm ürünlerimiz çevre dostu, zararlı kimyasallar içermeyen doğal ahşap ve kumaşlardan üretilmektedir.' },
        { q: 'Siparişim ne kadar sürede teslim edilir?', a: 'Siparişleriniz 24 saat içinde kargoya verilir ve Türkiye\'nin her yerine 2-4 iş günü içinde teslim edilir.' },
        { q: 'Ürünü beğenmezsem iade edebilir miyim?', a: 'Ürünün kullanılmamış ve orijinal ambalajında olması şartıyla 14 gün içinde esnek iade imkanı sunuyoruz.' }
      ]
    },
    en: { 
      heroTitle: 'Comfort Fit for Home Royalty',
      heroSub: 'Luxurious designs and natural materials for your pet, adding a touch of elegance to your home.',
      cta: 'Discover Collection',
      bestSellers: 'This Week\'s Best Sellers',
      shopNow: 'Shop Now',
      features: [
        { icon: '🌟', title: 'Premium Quality', desc: 'Durable & luxurious' },
        { icon: '🇹🇷', title: 'Made in Türkiye', desc: 'Crafted by artisans' },
        { icon: '🌿', title: 'Safe Materials', desc: 'Eco & pet friendly' },
        { icon: '🛡️', title: 'Secure Payment', desc: '100% encrypted' }
      ],
      faqTitle: 'Frequently Asked Questions',
      faqs: [
        { q: 'Are the materials safe for pets?', a: 'Yes, absolutely! All our products are made from eco-friendly natural wood and fabrics, free from harmful chemicals.' },
        { q: 'How long does delivery take?', a: 'Orders are shipped within 24 hours and delivered to your door in 2-4 business days across Türkiye.' },
        { q: 'Can I return the product if I don\'t like it?', a: 'We offer a flexible 14-day return policy, provided the item is unused and in its original condition.' }
      ]
    }
  }
  const t = dict[lang as keyof typeof dict] || dict.ar;

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans relative" dir={isAr ? 'rtl' : 'ltr'}>
      <main className="flex-grow">
        <section className="relative w-full h-[60vh] md:h-[75vh] min-h-[450px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 bg-slate-900">
             <Image 
                src="/hero-banner.jpg" 
                alt="Patiyuva Luxury Pet Furniture" 
                fill 
                className="object-cover"
                priority
             />
             <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mt-6 md:mt-0">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 md:mb-6 tracking-tight drop-shadow-xl leading-tight">
              {t.heroTitle}
            </h1>
            <p className="text-base md:text-xl text-slate-100 mb-8 md:mb-10 font-medium max-w-2xl drop-shadow-lg">
              {t.heroSub}
            </p>
            <Link href={`/${lang}/category/all`} className="bg-amber-500 text-slate-900 font-black text-lg md:text-xl px-8 py-4 rounded-full hover:bg-amber-400 transform hover:scale-105 transition-all shadow-2xl">
              {t.cta}
            </Link>
          </div>
        </section>

        <section className="bg-white border-b border-gray-100 py-6 md:py-8 shadow-md relative z-20 -mt-6 md:-mt-10 mx-4 md:mx-auto max-w-6xl rounded-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 px-2 md:px-4 divide-y divide-gray-50 md:divide-y-0 md:divide-x rtl:md:divide-x-reverse">
            {t.features.map((feat, idx) => (
              <div key={idx} className={`flex flex-col items-center text-center px-2 ${idx > 1 ? 'pt-4 md:pt-0' : ''}`}>
                <span className="text-3xl md:text-4xl mb-2 drop-shadow-sm">{feat.icon}</span>
                <h4 className="font-bold text-gray-800 text-sm md:text-base mb-1">{feat.title}</h4>
                <p className="text-xs md:text-sm text-gray-500">{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-10 md:mb-14">
             <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900">{t.bestSellers}</h2>
             <div className="w-20 md:w-24 h-1.5 md:h-2 bg-amber-500 mx-auto mt-4 rounded-full"></div>
          </div>
          
          {products && products.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
              {products.map(product => {
                const pName = cleanName(product.product_translations[0]?.name)
                return (
                  <Link href={`/${lang}/product/${product.id}`} key={product.id} className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative">
                    <div className="relative w-full aspect-square bg-gray-50 flex flex-col items-center justify-center p-2 md:p-4">
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
                    <div className="p-3 md:p-5 flex flex-col flex-grow justify-between text-center">
                      <h3 className="text-xs md:text-sm font-bold text-gray-800 line-clamp-2 mb-2 md:mb-3 group-hover:text-amber-600 transition-colors">{pName}</h3>
                      <p className="text-lg md:text-xl font-black text-gray-900 mb-3 md:mb-4">{product.selling_price} <span className="text-xs md:text-sm font-medium text-gray-500">TL</span></p>
                      <span className="w-full block bg-slate-900 text-white text-xs md:text-sm font-bold py-2 md:py-2.5 rounded-lg group-hover:bg-amber-500 transition-colors">
                        {t.shopNow}
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </section>

        <section className="bg-white py-16 md:py-24 border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-10 md:mb-14">
               <h2 className="text-3xl md:text-4xl font-black text-gray-900">{t.faqTitle}</h2>
               <div className="w-16 h-1.5 bg-amber-500 mx-auto mt-4 rounded-full"></div>
            </div>
            
            <div className="space-y-4 md:space-y-6">
              {t.faqs.map((faq, idx) => (
                <div key={idx} className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-100 hover:border-amber-200 transition-colors">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 flex items-start gap-3">
                    <span className="text-amber-500">?</span>
                    {faq.q}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed pl-6 rtl:pl-0 rtl:pr-6">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* الزر السري للوحة الإدارة */}
      <Link 
        href="/admin/orders" 
        className="fixed bottom-0 left-0 w-16 h-16 opacity-0 z-[100] cursor-default"
        title="." 
      />
    </div>
  )
}