export const instant = false;

import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'

export default async function HomePage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;

  // جلب أفضل 8 منتجات فقط للصفحة الرئيسية لعدم التشتيت
  const { data: featuredProducts } = await supabase
    .from('products')
    .select(`id, product_code, selling_price, image_url, category, product_translations!inner(name)`)
    .eq('product_translations.lang_code', params.lang)
    .order('id', { ascending: true })
    .limit(8)

  const dict = {
    ar: { 
      navCats: { all: 'المتجر', scratches: 'خداشات فاخرة', beds: 'بيوت وأسرة', care: 'عناية وصحة' },
      hero: { title: 'راحة تليق بملوك المنزل', sub: 'تصميمات فخمة وخامات طبيعية لأليفك، ولمسة أناقة لبيتك.', btn: 'اكتشف التشكيلة' },
      sections: { trending: 'الأكثر مبيعاً هذا الأسبوع', viewAll: 'عرض جميع المنتجات →' }
    },
    tr: { 
      navCats: { all: 'Mağaza', scratches: 'Lüks Tırmalamalar', beds: 'Yataklar ve Evler', care: 'Bakım ve Sağlık' },
      hero: { title: 'Evinizin Krallarına Layık Konfor', sub: 'Can dostunuz için lüksü ve doğal materyalleri bir araya getirdik.', btn: 'Koleksiyonu Keşfet' },
      sections: { trending: 'Haftanın En Çok Satanları', viewAll: 'Tüm Ürünleri Gör →' }
    },
    en: { 
      navCats: { all: 'Shop', scratches: 'Luxury Scratchers', beds: 'Beds & Houses', care: 'Health & Care' },
      hero: { title: 'Comfort Fit for the Kings of the House', sub: 'Luxury designs and natural materials for your pet and home.', btn: 'Explore Collection' },
      sections: { trending: 'Trending This Week', viewAll: 'View All Products →' }
    }
  }
  const t = dict[params.lang as keyof typeof dict] || dict.ar

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans" dir={params.lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* 1. Navbar الاحترافي (لوجو مفرغ بصيغة PNG + أقسام + لغات) */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* اللوجو الاحترافي النظيف (تم ضبط الحجم وحذف النص المكرر) */}
            <Link href={`/${params.lang}`} className="flex items-center group">
              <div className="relative w-32 h-16 md:w-40 flex items-center justify-start overflow-hidden transition-transform group-hover:scale-105">
                <Image 
                  src="/logo.png" 
                  alt="Patiyuva Logo" 
                  fill 
                  sizes="160px" 
                  className="object-contain object-left" 
                  priority 
                />
              </div>
            </Link>

            {/* روابط الأقسام المطابقة لقاعدة البيانات */}
            <div className="hidden md:flex gap-8 items-center font-bold text-gray-600 text-sm">
              <Link href={`/${params.lang}/category/all`} className="hover:text-indigo-600 transition-colors">{t.navCats.all}</Link>
              <Link href={`/${params.lang}/category/scratches`} className="hover:text-indigo-600 transition-colors">{t.navCats.scratches}</Link>
              <Link href={`/${params.lang}/category/beds`} className="hover:text-indigo-600 transition-colors">{t.navCats.beds}</Link>
              <Link href={`/${params.lang}/category/care`} className="hover:text-indigo-600 transition-colors">{t.navCats.care}</Link>
            </div>

            {/* اللغات */}
            <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-full border border-gray-200">
              {['tr', 'ar', 'en'].map(l => (
                <Link key={l} href={`/${l}`} className={`px-3 py-1.5 text-xs font-bold rounded-full uppercase transition-all ${params.lang === l ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500 hover:text-indigo-600'}`}>{l}</Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center bg-gray-900 overflow-hidden">
        <Image src="/hero-banner.jpg" alt="Patiyuva Luxury Pets" fill className="object-cover opacity-60" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 w-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 drop-shadow-lg">{t.hero.title}</h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 font-medium drop-shadow-md">{t.hero.sub}</p>
            <Link href={`/${params.lang}/category/all`} className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-500 transition-all shadow-xl hover:scale-105">
              {t.hero.btn}
            </Link>
          </div>
        </div>
      </section>

      {/* 3. قسم الأكثر مبيعاً */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-16 w-full flex-grow">
        <div className="flex justify-between items-end mb-10 border-b border-gray-200 pb-4">
          <h2 className="text-3xl font-black text-gray-900">{t.sections.trending}</h2>
          <Link href={`/${params.lang}/category/all`} className="text-sm font-bold text-indigo-600 hover:text-indigo-800">{t.sections.viewAll}</Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts?.map(product => {
            const pName = product.product_translations[0]?.name
            return (
              <Link href={`/${params.lang}/product/${product.id}`} key={product.id} className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative">
                <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center p-4">
                  {product.image_url ? (
                    <Image src={product.image_url} alt={pName} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out" />
                  ) : (
                    <div className="flex flex-col items-center opacity-40">
                       <span className="text-3xl mb-2">🐾</span>
                       <span className="text-[10px] font-bold text-gray-500 uppercase">{product.product_code}</span>
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-grow justify-between">
                  <h3 className="text-sm font-bold text-gray-800 line-clamp-2 mb-2 group-hover:text-indigo-600">{pName}</h3>
                  <p className="text-lg font-black text-gray-900">{product.selling_price} <span className="text-sm font-medium text-gray-500">TL</span></p>
                </div>
              </Link>
            )
          })}
        </div>
      </main>

    </div>
  )
}