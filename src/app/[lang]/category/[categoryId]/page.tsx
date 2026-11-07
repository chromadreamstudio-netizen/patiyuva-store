export const instant = false;
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'

export default async function CategoryPage(props: { params: Promise<{ lang: string, categoryId: string }> }) {
  const params = await props.params;
  
  let query = supabase
    .from('products')
    .select(`id, product_code, selling_price, image_url, category, product_translations!inner(name)`)
    .eq('is_active', true)
    .not('image_url', 'is', null)
    .neq('image_url', '')
    .eq('product_translations.lang_code', params.lang)
    .order('id', { ascending: true })

  if (params.categoryId !== 'all') {
    query = query.eq('category', params.categoryId)
  }

  const { data: products } = await query

  const cleanName = (name: string) => {
    if (!name) return '';
    return name.replace(/pugalo|alfie|windy/gi, 'Patiyuva').trim();
  };

  const dict = {
    ar: { 
      navCats: { all: 'المتجر', scratches: 'خداشات فاخرة', beds: 'بيوت وأسرة', care: 'عناية وصحة' },
      empty: 'لا توجد منتجات في هذا القسم حالياً.', shopNow: 'اكتشف المزيد', back: '← العودة للرئيسية'
    },
    tr: { 
      navCats: { all: 'Mağaza', scratches: 'Lüks Tırmalamalar', beds: 'Yataklar ve Evler', care: 'Bakım ve Sağlık' },
      empty: 'Bu kategoride şu an ürün bulunmamaktadır.', shopNow: 'Daha Fazla Keşfet', back: '← Ana Sayfaya Dön'
    },
    en: { 
      navCats: { all: 'Shop', scratches: 'Luxury Scratchers', beds: 'Beds & Houses', care: 'Health & Care' },
      empty: 'No products found in this category currently.', shopNow: 'Discover More', back: '← Back to Home'
    }
  }
  const t = dict[params.lang as keyof typeof dict] || dict.ar
  
  const categoryTitle = t.navCats[params.categoryId as keyof typeof t.navCats] || t.navCats.all

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans" dir={params.lang === 'ar' ? 'rtl' : 'ltr'}>
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-12 w-full flex-grow">
        
        {/* عنوان القسم وزر العودة */}
        <div className="mb-12 border-b border-gray-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div>
             <h1 className="text-3xl md:text-4xl font-black text-gray-900">{categoryTitle}</h1>
             <p className="text-gray-500 mt-2 font-medium">{products?.length || 0} {params.lang === 'ar' ? 'منتج متاح' : params.lang === 'tr' ? 'ürün mevcut' : 'products available'}</p>
           </div>
           <Link href={`/${params.lang}`} className="text-amber-600 hover:text-amber-700 font-bold transition-colors inline-block text-sm md:text-base">
             {t.back}
           </Link>
        </div>
        
        {products && products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
            {products.map(product => {
              const pName = cleanName(product.product_translations[0]?.name)
              return (
                <Link href={`/${params.lang}/product/${product.id}`} key={product.id} className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative">
                  <div className="relative w-full aspect-square bg-gray-50 flex flex-col items-center justify-center p-2 md:p-4">
                    {product.image_url ? (
                      <Image src={product.image_url} alt={pName} fill sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw" className="object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out" />
                    ) : (
                      <span className="text-3xl opacity-20">🐾</span>
                    )}
                  </div>
                  <div className="p-3 md:p-4 flex flex-col flex-grow justify-between">
                    <h3 className="text-xs md:text-sm font-bold text-gray-800 line-clamp-2 mb-2 group-hover:text-amber-600">{pName}</h3>
                    <p className="text-lg md:text-xl font-black text-gray-900">{product.selling_price} <span className="text-xs md:text-sm font-medium text-gray-500">TL</span></p>
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