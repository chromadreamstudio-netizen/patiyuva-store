'use client';

import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage(props: { params: Promise<{ lang: string }> }) {
  const { lang } = use(props.params);
  const isAr = lang === 'ar';
  const router = useRouter();
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBestSellers() {
      // قائمة بأكواد المنتجات الأكثر مبيعاً التي طلبها المدير
      const bestSellingCodes = [
        'PGLKARE', 'PGL117', 'PGL142', 'PGLPS', 'PGL148', 
        'PGLZKAT', 'PGL106', 'PGL134', 'PGLPY', 'PGLAY', 'PGLCNT'
      ];

      const { data } = await supabase
        .from('products')
        .select(`id, product_code, selling_price, image_url, category, product_translations!inner(name)`)
        .eq('is_active', true)
        .in('product_code', bestSellingCodes) // جلب هذه المنتجات تحديداً
        .eq('product_translations.lang_code', lang)
        .limit(12);

      if (data) {
        // ترتيب المنتجات لتبدو بشكل منسق (مثلاً الأسرة أولاً ثم الإكسسوارات)
        const sorted = data.sort((a, b) => b.selling_price - a.selling_price);
        setProducts(sorted);
      }
      setLoading(false);
    }
    fetchBestSellers();
  }, [lang]);

  const cleanName = (name: string) => {
    if (!name) return '';
    return name.replace(/pugalo|alfie|windy/gi, 'Patiyuva').trim();
  };

  // تفاعل الزر الخفي للإدارة
  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/admin/orders');
  };

  const dict = {
    ar: { 
      heroTitle: 'راحة تليق بملوك المنزل 🐾',
      heroSub: 'تصميمات فخمة وخامات طبيعية لأليفك، ولمسة أناقة لا مثيل لها لبيتك.',
      cta: 'اكتشف التشكيلة الفاخرة',
      bestSellers: '🔥 الأكثر طلباً هذا الأسبوع',
      shopNow: 'تسوق الآن',
      features: [
        { icon: '🌟', title: 'جودة استثنائية', desc: 'خامات فاخرة وتصنيع متين يدوم طويلاً' },
        { icon: '🇹🇷', title: 'صناعة تركية', desc: 'أيدي حرفية ماهرة وعناية بكل تفصيلة' },
        { icon: '🌿', title: 'مواد طبيعية', desc: 'صديقة للبيئة وآمنة تماماً لأليفك' },
        { icon: '🛡️', title: 'دفع آمن', desc: 'تشفير 100% عبر Shopier' }
      ]
    },
    tr: { 
      heroTitle: 'Evinizin Krallarına Lâyık Konfor 🐾',
      heroSub: 'Evcil dostunuz için lüks tasarımlar ve doğal materyaller, eviniz için zarif bir dokunuş.',
      cta: 'Lüks Koleksiyonu Keşfet',
      bestSellers: '🔥 Bu Haftanın En Çok Satanları',
      shopNow: 'Hemen İncele',
      features: [
        { icon: '🌟', title: 'Üstün Kalite', desc: 'Dayanıklı lüks materyaller ve uzun ömür' },
        { icon: '🇹🇷', title: 'Yerli Üretim', desc: 'Türkiye\'de özenle ve el işçiliğiyle üretildi' },
        { icon: '🌿', title: 'Doğal İçerik', desc: 'Çevre ve evcil hayvan dostu malzemeler' },
        { icon: '🛡️', title: 'Güvenli Ödeme', desc: 'Shopier ile %100 şifreli koruma' }
      ]
    },
    en: { 
      heroTitle: 'Comfort Fit for Home Royalty 🐾',
      heroSub: 'Luxurious designs and natural materials for your pet, adding a touch of elegance to your home.',
      cta: 'Discover Luxury Collection',
      bestSellers: '🔥 This Week\'s Top Picks',
      shopNow: 'Shop Now',
      features: [
        { icon: '🌟', title: 'Premium Quality', desc: 'Durable & luxurious materials built to last' },
        { icon: '🇹🇷', title: 'Made in Türkiye', desc: 'Crafted by artisans with attention to detail' },
        { icon: '🌿', title: 'Natural Safe', desc: 'Eco & pet friendly materials' },
        { icon: '🛡️', title: 'Secure Payment', desc: '100% encrypted via Shopier' }
      ]
    }
  }
  const t = dict[lang as keyof typeof dict] || dict.ar;

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans relative selection:bg-amber-200" dir={isAr ? 'rtl' : 'ltr'}>
      <main className="flex-grow">
        
        {/* Hero Section - مبهر ودراماتيكي */}
        <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 bg-slate-900">
             <Image 
                src="/hero-banner.jpg" 
                alt="Patiyuva Premium" 
                fill 
                className="object-cover opacity-80 scale-105 transform hover:scale-100 transition-transform duration-[10s]"
                priority
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-black/40 to-transparent"></div>
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-2xl leading-tight">
              {t.heroTitle}
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 mb-10 font-medium max-w-3xl drop-shadow-lg leading-relaxed">
              {t.heroSub}
            </p>
            <Link href={`/${lang}/category/all`} className="bg-amber-500 text-slate-900 font-black text-lg md:text-xl px-10 py-5 rounded-full hover:bg-amber-400 hover:scale-105 hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] transition-all duration-300">
              {t.cta}
            </Link>
          </div>
        </section>

        {/* Features Section - فخامة ومصداقية */}
        <section className="bg-white py-12 md:py-16 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] relative z-20 -mt-10 mx-4 md:mx-auto max-w-6xl rounded-3xl border border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 px-4 md:px-8">
            {t.features.map((feat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <span className="text-4xl md:text-5xl mb-4 transform group-hover:-translate-y-2 transition-transform duration-300 drop-shadow-sm">{feat.icon}</span>
                <h4 className="font-bold text-slate-800 text-base md:text-lg mb-2">{feat.title}</h4>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed max-w-[200px]">{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Best Sellers Section - عرض المنتجات الاحترافي */}
        <section className="max-w-7xl mx-auto px-4 lg:px-8 py-20 md:py-32">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">{t.bestSellers}</h2>
             <div className="w-24 h-1.5 bg-amber-500 mx-auto mt-6 rounded-full opacity-80"></div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
              {products.map(product => {
                const pName = cleanName(product.product_translations[0]?.name)
                return (
                  <Link href={`/${lang}/product/${product.id}`} key={product.id} className="group flex flex-col h-full bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
                    <div className="relative w-full aspect-[4/5] bg-gray-50/50 flex flex-col items-center justify-center p-6 overflow-hidden">
                      {product.image_url && (
                        <Image 
                          src={product.image_url} 
                          alt={pName} 
                          fill 
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" 
                          className="object-contain p-4 mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out" 
                        />
                      )}
                      {/* Badge خفي يظهر عند التمرير */}
                      <div className="absolute top-4 rtl:left-4 ltr:right-4 bg-slate-900 text-white text-[10px] font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Premium
                      </div>
                    </div>
                    
                    <div className="p-5 md:p-6 flex flex-col flex-grow justify-between text-center bg-white z-10 border-t border-gray-50">
                      <div>
                        <span className="text-[10px] md:text-xs font-bold text-amber-500 tracking-wider uppercase mb-2 block">{product.category}</span>
                        <h3 className="text-sm md:text-base font-bold text-slate-800 line-clamp-2 mb-3 group-hover:text-amber-600 transition-colors">{pName}</h3>
                      </div>
                      
                      <div>
                        <p className="text-xl md:text-2xl font-black text-slate-900 mb-4">{product.selling_price} <span className="text-sm font-medium text-slate-400">TL</span></p>
                        <span className="w-full flex items-center justify-center gap-2 bg-slate-50 text-slate-700 text-sm font-bold py-3 rounded-xl group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300">
                          {t.shopNow} <span className="rtl:rotate-180">→</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </section>

      </main>

      {/* الزر السري للوحة الإدارة (تم إصلاحه وإخفائه باحترافية) */}
      <button 
        onClick={handleAdminClick}
        className="fixed bottom-0 left-0 w-20 h-20 bg-transparent z-[9999] cursor-default outline-none"
        title="" 
        aria-label="Admin Access"
      />
    </div>
  )
}