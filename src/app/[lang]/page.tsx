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
      // 1. إصلاح مشكلة الـ 7 منتجات باستخدام الـ ilike للبحث عن الجذر
      const queryFilter = `product_code.ilike.%PGLKARE%,product_code.ilike.%PGL117%,product_code.ilike.%PGL142%,product_code.ilike.%PGLPS%,product_code.ilike.%PGL148%,product_code.ilike.%PGLZKAT%,product_code.ilike.%PGL106%,product_code.ilike.%PGL134%,product_code.ilike.%PGLPY%,product_code.ilike.%PGLAY%,product_code.ilike.%PGLCNT%`;

      const { data } = await supabase
        .from('products')
        .select(`id, product_code, selling_price, image_url, category, product_translations!inner(name)`)
        .eq('is_active', true)
        .or(queryFilter)
        .eq('product_translations.lang_code', lang)
        .limit(12);

      if (data) {
        // فلترة لإزالة المقاسات المكررة (نعرض مقاس واحد من كل موديل في الرئيسية)
        const uniqueProducts = [];
        const seenBaseCodes = new Set();
        for (const item of data) {
           const baseCode = item.product_code.split('-')[0];
           if (!seenBaseCodes.has(baseCode)) {
               seenBaseCodes.add(baseCode);
               uniqueProducts.push(item);
           }
        }
        setProducts(uniqueProducts.sort((a, b) => b.selling_price - a.selling_price));
      }
      setLoading(false);
    }
    fetchBestSellers();
  }, [lang]);

  const cleanName = (name: string) => {
    if (!name) return '';
    return name.replace(/pugalo|alfie|windy/gi, 'Patiyuva').trim();
  };

  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/admin/orders');
  };

  const dict = {
    ar: { 
      heroTitle: 'أعد تعريف الفخامة لأليفك.',
      heroSub: 'تصميمات يدوية الصنع تجمع بين الأناقة التركية والراحة المطلقة.',
      cta: 'تسوق الكوليكشن الجديد',
      bestSellers: 'القطع الفنية الأكثر طلباً',
      shopNow: 'اكتشف المزيد',
      categories: { title: 'تسوق حسب التصنيف', beds: 'أسرة فاخرة', scratchers: 'أبراج الخدش', care: 'عناية وصحة' },
      experience: { title: 'ليس مجرد أثاث.. أسلوب حياة', desc: 'كل قطعة من Patiyuva مصممة لتندمج بانسجام مع ديكور منزلك الحديث، مع توفير الملاذ المثالي لقطتك.' },
      reviews: { title: 'ماذا يقولون عنا؟', r1: 'جودة الخشب مذهلة، قطتي تعشقه!', r2: 'أضاف لمسة جمالية لغرفة الجلوس.', r3: 'خدمة عملاء راقية وتوصيل سريع.' }
    },
    tr: { 
      heroTitle: 'Evcil Dostunuz İçin Lüksü Yeniden Tanımlayın.',
      heroSub: 'Türk zarafeti ve mutlak konforu birleştiren el yapımı tasarımlar.',
      cta: 'Yeni Koleksiyonu Alışveriş Yap',
      bestSellers: 'En Çok Tercih Edilen Sanat Eserleri',
      shopNow: 'Hemen İncele',
      categories: { title: 'Kategoriye Göre Alışveriş', beds: 'Lüks Yataklar', scratchers: 'Tırmalama Ağaçları', care: 'Bakım & Sağlık' },
      experience: { title: 'Sadece Mobilya Değil.. Bir Yaşam Tarzı', desc: 'Her Patiyuva parçası, kediniz için mükemmel bir sığınak sunarken modern ev dekorunuzla uyum içinde tasarlanmıştır.' },
      reviews: { title: 'Bizim Hakkımızda Ne Diyorlar?', r1: 'Ahşap kalitesi inanılmaz, kedim bayıldı!', r2: 'Oturma odasına estetik bir dokunuş kattı.', r3: 'Harika müşteri hizmetleri ve hızlı teslimat.' }
    },
    en: { 
      heroTitle: 'Redefining Luxury for Your Pet.',
      heroSub: 'Handcrafted designs combining Turkish elegance with absolute comfort.',
      cta: 'Shop New Collection',
      bestSellers: 'Most Wanted Masterpieces',
      shopNow: 'Discover',
      categories: { title: 'Shop By Category', beds: 'Luxury Beds', scratchers: 'Scratching Trees', care: 'Care & Health' },
      experience: { title: 'Not Just Furniture.. A Lifestyle', desc: 'Every Patiyuva piece is designed to blend harmoniously with your modern home decor while providing the perfect sanctuary for your cat.' },
      reviews: { title: 'What They Say?', r1: 'Amazing wood quality, my cat loves it!', r2: 'Added a beautiful touch to my living room.', r3: 'Premium customer service & fast delivery.' }
    }
  }
  const t = dict[lang as keyof typeof dict] || dict.tr;

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col font-sans relative selection:bg-slate-900 selection:text-white" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* 1. Marquee Banner (شريط الإعلانات اللانهائي) */}
      <div className="bg-slate-900 text-white text-xs md:text-sm py-2 overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee inline-block font-medium tracking-widest uppercase">
          ✦ PREMIUM PET FURNITURE ✦ %100 NATURAL WOOD ✦ FREE SHIPPING IN TÜRKİYE ✦ SECURE PAYMENT ✦ HANDCRAFTED WITH LOVE ✦
        </div>
        <div className="animate-marquee inline-block font-medium tracking-widest uppercase absolute top-2 left-[100%]">
          ✦ PREMIUM PET FURNITURE ✦ %100 NATURAL WOOD ✦ FREE SHIPPING IN TÜRKİYE ✦ SECURE PAYMENT ✦ HANDCRAFTED WITH LOVE ✦
        </div>
      </div>

      <main className="flex-grow">
        
        {/* 2. Hero Section - أسلوب أبل المبسط (Minimalist) */}
        <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center bg-gray-100 overflow-hidden">
          <div className="absolute inset-0 z-0">
             <Image 
                src="/hero-banner.jpg" 
                alt="Patiyuva Premium" 
                fill 
                className="object-cover object-center scale-100 animate-slow-zoom"
                priority
             />
             <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>
          </div>
          
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-start justify-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter leading-[1.1] max-w-3xl drop-shadow-lg">
              {t.heroTitle}
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 mb-10 font-light max-w-2xl drop-shadow-md">
              {t.heroSub}
            </p>
            <Link href={`/${lang}/category/all`} className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-bold text-lg rounded-full overflow-hidden transition-all hover:scale-105 shadow-xl">
              <span className="relative z-10">{t.cta}</span>
              <div className="absolute inset-0 h-full w-0 bg-amber-400 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
            </Link>
          </div>
        </section>

        {/* 3. Shop By Category - الشبكة البصرية */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
                {[
                  { title: t.categories.beds, img: '/products/PGLKARE.jpg', link: 'beds' },
                  { title: t.categories.scratchers, img: '/products/PGL100.jpg', link: 'scratches' },
                  { title: t.categories.care, img: '/products/PGLPS.jpg', link: 'care' }
                ].map((cat, i) => (
                  <Link href={`/${lang}/category/${cat.link}`} key={i} className="group relative h-80 md:h-[400px] rounded-3xl overflow-hidden cursor-pointer">
                    <Image src={cat.img} alt={cat.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                    <div className="absolute bottom-8 left-8">
                       <h3 className="text-white text-3xl font-black drop-shadow-md">{cat.title}</h3>
                       <span className="text-amber-400 font-bold mt-2 inline-block opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">Explore →</span>
                    </div>
                  </Link>
                ))}
             </div>
          </div>
        </section>

        {/* 4. The Patiyuva Experience - قسم نمط الحياة */}
        <section className="relative w-full py-32 bg-slate-900 text-white overflow-hidden flex items-center">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 md:opacity-50">
               <Image src="/products/PGLAY.jpg" alt="Lifestyle" fill className="object-cover mask-image-gradient" />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
               <div className="max-w-xl">
                  <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">{t.experience.title}</h2>
                  <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light">{t.experience.desc}</p>
               </div>
            </div>
        </section>

        {/* 5. Best Sellers Section - تصميم متجر فاخر */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
             <div>
               <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">{t.bestSellers}</h2>
               <div className="w-20 h-1.5 bg-slate-900 mt-6 rounded-full"></div>
             </div>
             <Link href={`/${lang}/category/all`} className="text-slate-900 font-bold hover:text-amber-500 transition-colors border-b-2 border-slate-900 hover:border-amber-500 pb-1">
                View All Products
             </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {products.map(product => {
                const pName = cleanName(product.product_translations[0]?.name)
                return (
                  <Link href={`/${lang}/product/${product.id}`} key={product.id} className="group flex flex-col">
                    {/* مربع الصورة النظيف */}
                    <div className="relative w-full aspect-[4/5] bg-gray-50 rounded-2xl overflow-hidden mb-6">
                      {product.image_url && (
                        <Image 
                          src={product.image_url} 
                          alt={pName} 
                          fill 
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" 
                          className="object-contain p-8 mix-blend-multiply group-hover:scale-105 transition-transform duration-500 ease-out" 
                        />
                      )}
                      {/* زر الشراء يظهر عند المرور */}
                      <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                         <div className="w-full bg-slate-900/90 backdrop-blur-sm text-white text-center py-3 rounded-xl font-bold text-sm">
                            {t.shopNow}
                         </div>
                      </div>
                    </div>
                    
                    {/* معلومات المنتج بأسلوب Minimal */}
                    <div className="flex flex-col">
                      <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{product.category}</span>
                      <h3 className="text-base font-bold text-slate-800 mb-2 truncate">{pName}</h3>
                      <p className="text-lg font-black text-slate-900">{product.selling_price} <span className="text-xs font-medium text-slate-500">TL</span></p>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </section>

      </main>

      {/* الزر السري للوحة الإدارة */}
      <button 
        onClick={handleAdminClick}
        className="fixed bottom-0 left-0 w-20 h-20 bg-transparent z-[9999] cursor-default outline-none"
        aria-label="Admin"
      />

      {/* إضافة كود الـ Animation في CSS مباشرة */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        @keyframes slowZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slowZoom 20s ease-in-out alternate infinite;
        }
        .mask-image-gradient {
          mask-image: linear-gradient(to right, transparent, black);
          -webkit-mask-image: linear-gradient(to right, transparent, black);
        }
      `}} />
    </div>
  )
}