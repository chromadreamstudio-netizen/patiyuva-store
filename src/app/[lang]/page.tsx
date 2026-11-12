'use client';

import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage({ params }: { params: { lang: string } }) {
  // قراءة اللغة مباشرة من الـ params بدون استخدام use() التي تسبب مشاكل
  const lang = params?.lang || 'tr';
  const isAr = lang === 'ar';
  const router = useRouter();
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBestSellers() {
      const queryFilter = `product_code.ilike.%PGLKARE%,product_code.ilike.%PGL117%,product_code.ilike.%PGL142%,product_code.ilike.%PGLPS%,product_code.ilike.%PGL148%,product_code.ilike.%PGLZKAT%,product_code.ilike.%PGL106%,product_code.ilike.%PGL134%,product_code.ilike.%PGLPY%,product_code.ilike.%PGLAY%,product_code.ilike.%PGLCNT%`;

      const { data } = await supabase
        .from('products')
        .select(`id, product_code, selling_price, image_url, category, product_translations!inner(name)`)
        .eq('is_active', true)
        .or(queryFilter)
        .eq('product_translations.lang_code', lang)
        .limit(12);

      if (data) {
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
    const password = window.prompt("Lütfen yönetici şifresini girin / برجاء إدخال كلمة المرور:");
    
    // كلمة المرور للإدارة
    if (password === "Patiyuva2026") {
      router.push('/admin/orders');
    } else if (password !== null && password !== "") {
      alert("Şifre yanlış / كلمة المرور خاطئة 🚫");
    }
  };

  const dict = {
    ar: { 
      heroTitle: 'أعد تعريف الفخامة لأليفك.',
      heroSub: 'تصميمات يدوية الصنع تجمع بين الأناقة التركية والراحة المطلقة.',
      cta: 'تسوق الكوليكشن الجديد',
      bestSellers: 'القطع الفنية الأكثر طلباً',
      shopNow: 'اكتشف المزيد',
      categories: { title: 'تسوق حسب التصنيف', beds: 'أسرة فاخرة', scratchers: 'أبراج الخدش', care: 'عناية وصحة' },
      experience: { title: 'ليس مجرد أثاث.. أسلوب حياة', desc: 'كل قطعة من Patiyuva مصممة لتندمج بانسجام مع ديكور منزلك الحديث، مع توفير الملاذ المثالي لقطتك.' }
    },
    tr: { 
      heroTitle: 'Evcil Dostunuz İçin Lüksü Yeniden Tanımlayın.',
      heroSub: 'Türk zarafeti ve mutlak konforu birleştiren el yapımı tasarımlar.',
      cta: 'Yeni Koleksiyonu Alışveriş Yap',
      bestSellers: 'En Çok Tercih Edilen Sanat Eserleri',
      shopNow: 'Hemen İncele',
      categories: { title: 'Kategoriye Göre Alışveriş', beds: 'Lüks Yataklar', scratchers: 'Tırmalama Ağaçları', care: 'Bakım & Sağlık' },
      experience: { title: 'Sadece Mobilya Değil.. Bir Yaşam Tarzı', desc: 'Her Patiyuva parçası, kediniz için mükemmel bir sığınak sunarken modern ev dekorunuzla uyum içinde tasarlanmıştır.' }
    },
    en: { 
      heroTitle: 'Redefine luxury for your beloved pet.',
      heroSub: 'Handcrafted designs that combine Turkish elegance and absolute comfort.',
      cta: 'Shop the New Collection',
      bestSellers: 'Most Wanted Masterpieces',
      shopNow: 'Discover',
      categories: { title: 'Shop By Category', beds: 'Luxury Beds', scratchers: 'Scratching Trees', care: 'Care & Health' },
      experience: { title: 'Not Just Furniture.. A Lifestyle', desc: 'Every Patiyuva piece is designed to blend harmoniously with your modern home decor while providing the perfect sanctuary for your cat.' }
    }
  }
  
  // التأكد من تطبيق اللغة التركية كخيار افتراضي في حال حدوث أي خطأ
  const t = dict[lang as keyof typeof dict] || dict.tr;

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col font-sans relative selection:bg-slate-900 selection:text-white" dir={isAr ? 'rtl' : 'ltr'}>
      
      <div className="bg-slate-900 text-white text-[10px] md:text-sm py-2 overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee inline-block font-medium tracking-widest uppercase">
          ✦ PREMIUM PET FURNITURE ✦ %100 NATURAL WOOD ✦ FREE SHIPPING IN TÜRKİYE ✦ SECURE PAYMENT ✦ HANDCRAFTED WITH LOVE ✦
        </div>
        <div className="animate-marquee inline-block font-medium tracking-widest uppercase absolute top-2 left-[100%]">
          ✦ PREMIUM PET FURNITURE ✦ %100 NATURAL WOOD ✦ FREE SHIPPING IN TÜRKİYE ✦ SECURE PAYMENT ✦ HANDCRAFTED WITH LOVE ✦
        </div>
      </div>

      <main className="flex-grow">
        
        <section className="relative w-full h-[70vh] md:h-[85vh] min-h-[500px] flex items-center justify-center bg-gray-100 overflow-hidden">
          <div className="absolute inset-0 z-0">
             <Image 
                src="/hero-banner.jpg" 
                alt="Patiyuva Premium" 
                fill 
                className="object-cover object-top md:object-center scale-100 animate-slow-zoom"
                priority
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 md:bg-gradient-to-r md:from-black/70 md:via-black/20 md:to-transparent"></div>
          </div>
          
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-12 flex flex-col items-center md:items-start justify-center text-center md:text-left rtl:md:text-right pt-20 md:pt-0">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white mb-4 md:mb-6 tracking-tighter leading-[1.2] md:leading-[1.1] max-w-3xl drop-shadow-2xl">
              {t.heroTitle}
            </h1>
            <p className="text-base md:text-2xl text-gray-200 mb-8 md:mb-10 font-medium max-w-2xl drop-shadow-md">
              {t.heroSub}
            </p>
            <Link href={`/${lang}/category/all`} className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-bold text-base md:text-lg rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              <span className="relative z-10">{t.cta}</span>
              <div className="absolute inset-0 h-full w-0 bg-amber-400 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
            </Link>
          </div>
        </section>

        <section className="py-16 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-12">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
                {[
                  { title: t.categories.beds, img: '/products/PGLKARE.jpg', link: 'beds' },
                  { title: t.categories.scratchers, img: '/products/PGL100.jpg', link: 'scratches' },
                  { title: t.categories.care, img: '/products/PGLPS.jpg', link: 'care' }
                ].map((cat, i) => (
                  <Link href={`/${lang}/category/${cat.link}`} key={i} className="group relative h-64 md:h-[400px] rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300">
                    <Image src={cat.img} alt={cat.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10 group-hover:from-black/90 transition-colors duration-300"></div>
                    <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                       <h3 className="text-white text-2xl md:text-3xl font-black drop-shadow-md">{cat.title}</h3>
                       <span className="text-amber-400 font-bold mt-1 md:mt-2 inline-block opacity-100 md:opacity-0 md:translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">Explore →</span>
                    </div>
                  </Link>
                ))}
             </div>
          </div>
        </section>

        <section className="relative w-full py-20 md:py-32 bg-slate-900 text-white overflow-hidden flex items-center">
            <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-20 md:opacity-50">
               <Image src="/products/PGLAY.jpg" alt="Lifestyle" fill className="object-cover md:mask-image-gradient" />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 w-full text-center md:text-left rtl:md:text-right">
               <div className="max-w-xl mx-auto md:mx-0 bg-slate-900/40 md:bg-transparent p-6 md:p-0 rounded-2xl backdrop-blur-sm md:backdrop-blur-none border border-white/10 md:border-none">
                  <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 leading-tight">{t.experience.title}</h2>
                  <p className="text-gray-300 text-base md:text-xl leading-relaxed font-light">{t.experience.desc}</p>
               </div>
            </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-12 py-16 md:py-32">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 md:mb-16 gap-4 text-center md:text-left rtl:md:text-right">
             <div>
               <h2 className="text-3xl md:text-6xl font-black text-slate-900 tracking-tighter">{t.bestSellers}</h2>
               <div className="w-16 md:w-20 h-1.5 bg-slate-900 mt-4 md:mt-6 rounded-full mx-auto md:mx-0"></div>
             </div>
             <Link href={`/${lang}/category/all`} className="text-slate-900 font-bold hover:text-amber-500 transition-colors border-b-2 border-slate-900 hover:border-amber-500 pb-1 mt-4 md:mt-0">
                View All Products
             </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-12">
              {products.map(product => {
                const pName = cleanName(product.product_translations[0]?.name)
                return (
                  <Link href={`/${lang}/product/${product.id}`} key={product.id} className="group flex flex-col">
                    <div className="relative w-full aspect-[4/5] bg-gray-50 rounded-2xl overflow-hidden mb-4 md:mb-6 border border-gray-100">
                      {product.image_url && (
                        <Image 
                          src={product.image_url} 
                          alt={pName} 
                          fill 
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" 
                          className="object-contain p-4 md:p-8 mix-blend-multiply group-hover:scale-105 transition-transform duration-500 ease-out" 
                        />
                      )}
                      <div className="absolute inset-x-0 bottom-0 p-2 md:p-4 md:opacity-0 md:translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                         <div className="w-full bg-slate-900/90 backdrop-blur-sm text-white text-center py-2 md:py-3 rounded-xl font-bold text-xs md:text-sm shadow-lg">
                            {t.shopNow}
                         </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col px-1">
                      <span className="text-[9px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{product.category}</span>
                      <h3 className="text-xs md:text-base font-bold text-slate-800 mb-1 md:mb-2 truncate">{pName}</h3>
                      <p className="text-base md:text-lg font-black text-slate-900">{product.selling_price} <span className="text-[10px] md:text-xs font-medium text-slate-500">TL</span></p>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </section>

      </main>

      <button 
        onClick={handleAdminClick}
        className="fixed bottom-0 left-0 w-20 h-20 bg-transparent z-[9999] cursor-default outline-none"
        aria-label="Admin"
      />

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
          100% { transform: scale(1.05); }
        }
        .animate-slow-zoom {
          animation: slowZoom 25s ease-in-out alternate infinite;
        }
        .mask-image-gradient {
          mask-image: linear-gradient(to right, transparent, black);
          -webkit-mask-image: linear-gradient(to right, transparent, black);
        }
      `}} />
    </div>
  )
}