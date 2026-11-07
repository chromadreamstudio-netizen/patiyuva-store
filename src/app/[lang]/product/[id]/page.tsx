export const instant = false;
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import AddToCartButton from './AddToCartButton'

export default async function ProductPage(props: { params: Promise<{ lang: string, id: string }> }) {
  const params = await props.params;

  const { data: product, error } = await supabase
    .from('products')
    .select(`id, product_code, selling_price, image_url, video_url, category, product_translations (name, description)`)
    .eq('id', params.id)
    .eq('product_translations.lang_code', params.lang)
    .single()

  const { data: similarProducts } = await supabase
    .from('products')
    .select(`id, product_code, selling_price, image_url, product_translations!inner(name)`)
    .eq('category', product?.category || 'scratches')
    .eq('is_active', true)
    .not('image_url', 'is', null)
    .eq('product_translations.lang_code', params.lang)
    .neq('id', params.id)
    .limit(4)

  if (error || !product) {
    return <div className="flex min-h-screen items-center justify-center text-2xl font-bold">Product not found</div>
  }

  // تنظيف الاسم من الكلمات الدالة على المصنع
  const cleanName = (name: string) => {
    if (!name) return '';
    return name.replace(/pugalo|alfie|windy/gi, 'Patiyuva').trim();
  };

  const t = product.product_translations[0] || {}
  const dict = {
    ar: { add: 'أضف إلى السلة', similar: 'منتجات قد تعجبك', code: 'كود المنتج:', back: '← العودة للرئيسية' },
    tr: { add: 'Sepete Ekle', similar: 'Benzer Ürünler', code: 'Ürün Kodu:', back: '← Ana Sayfaya Dön' },
    en: { add: 'Add to Cart', similar: 'Similar Products', code: 'SKU:', back: '← Back to Home' }
  }[params.lang as 'ar' | 'tr' | 'en'] || { add: 'Add to Cart', similar: 'Similar Products', code: 'SKU:', back: '← Back to Home' }

  const productName = cleanName(t.name);
  const productDesc = cleanName(t.description);

  return (
    <div className="min-h-screen bg-white py-8 md:py-12" dir={params.lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* زر العودة للرئيسية */}
        <Link href={`/${params.lang}`} className="inline-block mb-6 md:mb-8 text-amber-600 hover:text-amber-700 font-bold transition-colors text-sm md:text-base">
          {dict.back}
        </Link>

        {/* قسم تفاصيل المنتج العلوي */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-20">
          
          {/* الجانب الأيمن: معرض الصور والفيديو */}
          <div className="flex flex-col gap-3 md:gap-4">
            <div className="relative w-full aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center">
              {product.video_url ? (
                 <video src={product.video_url} autoPlay loop muted playsInline className="object-cover w-full h-full" />
              ) : product.image_url ? (
                 <Image src={product.image_url} alt={productName} fill className="object-cover mix-blend-multiply" priority />
              ) : (
                 <span className="text-4xl font-bold text-gray-300">{product.product_code}</span>
              )}
            </div>
            {/* صور مصغرة */}
            <div className="grid grid-cols-4 gap-3 md:gap-4">
               {[1,2,3,4].map(num => (
                 <div key={num} className={`relative aspect-square rounded-lg border-2 overflow-hidden cursor-pointer ${num === 1 && !product.video_url ? 'border-amber-500' : 'border-transparent hover:border-gray-300'} bg-gray-50 flex items-center justify-center`}>
                    {product.image_url ? <Image src={product.image_url} alt="thumb" fill className="object-cover mix-blend-multiply opacity-70 hover:opacity-100 transition-opacity" /> : <span className="text-xs text-gray-400">Img {num}</span>}
                 </div>
               ))}
            </div>
          </div>

          {/* الجانب الأيسر: معلومات الشراء */}
          <div className="flex flex-col justify-start pt-2 md:pt-4">
            <div className="text-xs md:text-sm font-bold text-amber-500 mb-2 uppercase tracking-wide">{product.category}</div>
            <h1 className="text-2xl md:text-4xl font-black text-gray-900 mb-3 md:mb-4 leading-tight">{productName || product.product_code}</h1>
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
               <span className="text-3xl md:text-4xl font-black text-gray-900">{product.selling_price} <span className="text-lg md:text-xl text-gray-500 font-medium">TL</span></span>
            </div>
            
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">{productDesc}</p>
            
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium">
               <span>{dict.code}</span> <span className="text-gray-900 font-bold bg-gray-100 px-2 py-1 rounded">{product.product_code}</span>
            </div>

            <div className="mt-auto">
               <AddToCartButton product={{...product, name: productName}} text={dict.add} />
               
               <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:gap-6 py-4 bg-gray-50 rounded-xl border border-gray-100 text-xs md:text-sm text-gray-700 font-bold">
                 <span className="flex items-center gap-1.5 md:gap-2">🛡️ 100% Secure</span>
                 <span className="flex items-center gap-1.5 md:gap-2">📦 Fast Delivery</span>
               </div>
            </div>
          </div>
        </div>

        {/* قسم المنتجات المشابهة */}
        {similarProducts && similarProducts.length > 0 && (
          <div className="border-t border-gray-100 pt-12 md:pt-16">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6 md:mb-8 text-center">{dict.similar}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {similarProducts.map(sim => {
                const simName = cleanName(sim.product_translations[0]?.name);
                return (
                  <Link href={`/${params.lang}/product/${sim.id}`} key={sim.id} className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden">
                    <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center p-2 md:p-4">
                      {sim.image_url ? (
                        <Image src={sim.image_url} alt={simName} fill className="object-cover mix-blend-multiply group-hover:scale-105 transition-transform" />
                      ) : (
                        <span className="text-gray-300 text-sm font-bold">{sim.product_code}</span>
                      )}
                    </div>
                    <div className="p-3 md:p-4 flex flex-col flex-grow justify-between">
                      <h3 className="text-xs md:text-sm font-bold text-gray-800 line-clamp-2 mb-2 group-hover:text-amber-600">{simName}</h3>
                      <p className="text-lg md:text-xl font-black text-gray-900">{sim.selling_price} <span className="text-xs font-medium text-gray-500">TL</span></p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}