export const instant = false;

import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'

export default async function CategoryPage(props: { params: Promise<{ lang: string, categoryId: string }> }) {
  const params = await props.params;
  
  let query = supabase
    .from('products')
    .select(`id, product_code, selling_price, image_url, category, product_translations!inner(name)`)
    .eq('is_active', true) // التأكد من أن المنتج نشط
    .not('image_url', 'is', null) // إخفاء المنتجات التي ليس لها صورة لمنع ظهور مربعات فارغة لمراجعي iyzico
    .neq('image_url', '') // التأكد من أن الرابط ليس فارغاً
    .eq('product_translations.lang_code', params.lang)
    .order('id', { ascending: true })

  if (params.categoryId !== 'all') {
    query = query.eq('category', params.categoryId)
  }

  const { data: products } = await query

  // دالة لتنظيف اسم المنتج من أسماء المصنع (Pugalo, Alfie, Windy) واستبدالها بـ Patiyuva لحماية المتجر من المقارنة في ترينديول
  const cleanName = (name: string) => {
    if (!name) return '';
    return name.replace(/pugalo|alfie|windy/gi, 'Patiyuva').trim();
  };

  const dict = {
    ar: { 
      navCats: { all: 'المتجر', scratches: 'خداشات فاخرة', beds: 'بيوت وأسرة', care: 'عناية وصحة' },
      empty: 'لا توجد منتجات في هذا القسم حالياً.', shopNow: 'اكتشف المزيد'
    },
    tr: { 
      navCats: { all: 'Mağaza', scratches: 'Lüks Tırmalamalar', beds: 'Yataklar ve Evler', care: 'Bakım ve Sağlık' },
      empty: 'Bu kategoride şu an ürün bulunmamaktadır.', shopNow: 'Daha Fazla Keşfet'
    },
    en: { 
      navCats: { all: 'Shop', scratches: 'Luxury Scratchers', beds: 'Beds & Houses', care: 'Health & Care' },
      empty: 'No products found in this category currently.', shopNow: 'Discover More'
    }
  }
  const t = dict[params.lang as keyof typeof dict] || dict.ar
  
  const categoryTitle = t.navCats[params.categoryId as keyof typeof t.navCats] || t.navCats.all

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans" dir={params.lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Navbar مجهز باللوجو النظيف png المتطابق مع الرئيسية */}
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
            
            {/* روابط الأقسام */}
            <div className="hidden md:flex gap-8 items-center font-bold text-gray-600 text-sm">
              <Link href={`/${params.lang}/category/all`} className={params.categoryId === 'all' ? 'text-indigo-600' : 'hover:text-indigo-600 transition-colors'}>{t.navCats.all}</Link>
              <Link href={`/${params.lang}/category/scratches`} className={params.categoryId === 'scratches' ? 'text-indigo-600' : 'hover:text-indigo-600 transition-colors'}>{t.navCats.scratches}</Link>
              <Link href={`/${params.lang}/category/beds`} className={params.categoryId === 'beds' ? 'text-indigo-600' : 'hover:text-indigo-600 transition-colors'}>{t.navCats.beds}</Link>
              <Link href={`/${params.lang}/category/care`} className={params.categoryId === 'care' ? 'text-indigo-600' : 'hover:text-indigo-600 transition-colors'}>{t.navCats.care}</Link>
            </div>

            <Link href={`/${params.lang}`} className="text-sm font-bold bg-gray-100 text-gray-600 px-5 py-2 rounded-full hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
              {params.lang === 'ar' ? 'الرئيسية' : params.lang === 'tr' ? 'Ana Sayfa' : 'Home'}
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-12 w-full flex-grow">
        <div className="mb-12 border-b border-gray-200 pb-6">
           <h1 className="text-4xl font-black text-gray-900">{categoryTitle}</h1>
           <p className="text-gray-500 mt-2 font-medium">{products?.length || 0} {params.lang === 'ar' ? 'منتج متاح' : params.lang === 'tr' ? 'ürün mevcut' : 'products available'}</p>
        </div>
        
        {products && products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {products.map(product => {
              // تنظيف الاسم قبل عرضه
              const pName = cleanName(product.product_translations[0]?.name)
              return (
                <Link href={`/${params.lang}/product/${product.id}`} key={product.id} className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative">
                  <div className="relative w-full aspect-square bg-gray-50 flex flex-col items-center justify-center p-4">
                    {product.image_url ? (
                      <Image 
                        src={product.image_url} 
                        alt={pName} 
                        fill 
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw" 
                        className="object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out" 
                      />
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
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-6xl mb-4 opacity-20">🐾</span>
            <h2 className="text-2xl font-bold text-gray-600">{t.empty}</h2>
          </div>
        )}
      </main>
    </div>
  )
}