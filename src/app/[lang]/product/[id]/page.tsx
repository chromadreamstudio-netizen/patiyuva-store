export const instant = false;
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import AddToCartButton from './AddToCartButton'

export default async function ProductPage(props: { params: Promise<{ lang: string, id: string }> }) {
  const params = await props.params;

  // جلب بيانات المنتج الأساسي
  const { data: product, error } = await supabase
    .from('products')
    .select(`id, product_code, selling_price, image_url, video_url, category, product_translations (name, description)`)
    .eq('id', params.id)
    .eq('product_translations.lang_code', params.lang)
    .single()

  // جلب 4 منتجات مشابهة (من نفس القسم)
  const { data: similarProducts } = await supabase
    .from('products')
    .select(`id, product_code, selling_price, image_url, product_translations!inner(name)`)
    .eq('category', product?.category || 'scratches')
    .eq('product_translations.lang_code', params.lang)
    .neq('id', params.id)
    .limit(4)

  if (error || !product) {
    return <div className="flex min-h-screen items-center justify-center text-2xl font-bold">Product not found</div>
  }

  const t = product.product_translations[0] || {}
  const dict = {
    ar: { add: 'أضف إلى السلة', similar: 'منتجات قد تعجبك', code: 'كود المنتج:' },
    tr: { add: 'Sepete Ekle', similar: 'Benzer Ürünler', code: 'Ürün Kodu:' },
    en: { add: 'Add to Cart', similar: 'Similar Products', code: 'SKU:' }
  }[params.lang as 'ar' | 'tr' | 'en'] || { add: 'Add to Cart', similar: 'Similar Products', code: 'SKU:' }

  return (
    <div className="min-h-screen bg-white py-12" dir={params.lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* قسم تفاصيل المنتج العلوي */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          
          {/* الجانب الأيمن: معرض الصور والفيديو */}
          <div className="flex flex-col gap-4">
            <div className="relative w-full aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center">
              {product.video_url ? (
                 <video src={product.video_url} autoPlay loop muted playsInline className="object-cover w-full h-full" />
              ) : product.image_url ? (
                 <Image src={product.image_url} alt={t.name || ''} fill className="object-cover mix-blend-multiply" priority />
              ) : (
                 <span className="text-4xl font-bold text-gray-300">{product.product_code}</span>
              )}
            </div>
            {/* صور مصغرة (Thumbnails) وهمية حالياً لتعطي شكل الـ Gallery */}
            <div className="grid grid-cols-4 gap-4">
               {[1,2,3,4].map(num => (
                 <div key={num} className={`relative aspect-square rounded-lg border-2 overflow-hidden cursor-pointer ${num === 1 && !product.video_url ? 'border-indigo-600' : 'border-transparent hover:border-gray-300'} bg-gray-50 flex items-center justify-center`}>
                    {product.image_url ? <Image src={product.image_url} alt="thumb" fill className="object-cover mix-blend-multiply opacity-70 hover:opacity-100" /> : <span className="text-xs text-gray-400">Img {num}</span>}
                 </div>
               ))}
            </div>
          </div>

          {/* الجانب الأيسر: معلومات الشراء */}
          <div className="flex flex-col justify-start pt-4">
            <div className="text-sm font-bold text-indigo-600 mb-2 uppercase tracking-wide">{product.category}</div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">{t.name || product.product_code}</h1>
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
               <span className="text-4xl font-black text-gray-900">{product.selling_price} <span className="text-xl text-gray-500 font-medium">TL</span></span>
            </div>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-8">{t.description}</p>
            
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium">
               <span>{dict.code}</span> <span className="text-gray-900 font-bold bg-gray-100 px-2 py-1 rounded">{product.product_code}</span>
            </div>

            <div className="mt-auto">
               <AddToCartButton product={{...product, name: t.name}} text={dict.add} />
               
               {/* علامات الثقة أسفل الزر (Trust Badges) */}
               <div className="mt-6 flex items-center justify-center gap-4 py-4 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-500 font-bold">
                 <span className="flex items-center gap-1">🔒 100% Secure</span>
                 <span className="flex items-center gap-1">📦 Fast Delivery</span>
               </div>
            </div>
          </div>
        </div>

        {/* قسم المنتجات المشابهة في الأسفل */}
        {similarProducts && similarProducts.length > 0 && (
          <div className="border-t border-gray-100 pt-16">
            <h2 className="text-2xl font-black text-gray-900 mb-8 text-center">{dict.similar}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {similarProducts.map(sim => (
                <Link href={`/${params.lang}/product/${sim.id}`} key={sim.id} className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                  <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center p-4">
                    {sim.image_url ? (
                      <Image src={sim.image_url} alt={sim.product_translations[0]?.name || ''} fill className="object-cover mix-blend-multiply group-hover:scale-105 transition-transform" />
                    ) : (
                      <span className="text-gray-300 text-sm font-bold">{sim.product_code}</span>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-grow justify-between">
                    <h3 className="text-sm font-bold text-gray-800 line-clamp-2 mb-2 group-hover:text-indigo-600">{sim.product_translations[0]?.name}</h3>
                    <p className="text-lg font-black text-gray-900">{sim.selling_price} <span className="text-xs font-medium text-gray-500">TL</span></p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}