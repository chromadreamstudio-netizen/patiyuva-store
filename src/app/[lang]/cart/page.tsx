'use client';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, use } from 'react';

export default function CartPage(props: { params: Promise<{ lang: string }> }) {
  // فك وعد الـ params في Next.js 15 للـ Client Components
  const { lang } = use(props.params);
  const isAr = lang === 'ar';

  const [mounted, setMounted] = useState(false);
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  // منع مشاكل الـ Hydration بسبب الـ LocalStorage
  useEffect(() => {
    setMounted(true);
  }, []);

  const dict = {
    ar: { title: 'سلة المشتريات', empty: 'سلتك فارغة حالياً.', shop: 'العودة للتسوق', price: 'السعر', qty: 'الكمية', total: 'الإجمالي', summary: 'ملخص الطلب', subtotal: 'المجموع الفرعي', shipping: 'الشحن', free: 'مجاني', finalTotal: 'الإجمالي الكلي', checkout: 'إتمام الطلب', remove: 'إزالة' },
    tr: { title: 'Alışveriş Sepeti', empty: 'Sepetiniz şu an boş.', shop: 'Alışverişe Dön', price: 'Fiyat', qty: 'Adet', total: 'Toplam', summary: 'Sipariş Özeti', subtotal: 'Ara Toplam', shipping: 'Kargo', free: 'Ücretsiz', finalTotal: 'Genel Toplam', checkout: 'Ödemeye Geç', remove: 'Kaldır' },
    en: { title: 'Shopping Cart', empty: 'Your cart is currently empty.', shop: 'Continue Shopping', price: 'Price', qty: 'Quantity', total: 'Total', summary: 'Order Summary', subtotal: 'Subtotal', shipping: 'Shipping', free: 'Free', finalTotal: 'Total', checkout: 'Proceed to Checkout', remove: 'Remove' }
  };
  const t = dict[lang as keyof typeof dict] || dict.ar;

  if (!mounted) return <div className="min-h-screen bg-[#F8F9FA]"></div>;

  const totalPrice = getTotalPrice();

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-12 font-sans" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-10">{t.title}</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100 flex flex-col items-center">
            <span className="text-6xl mb-6 block opacity-20">🛒</span>
            <h2 className="text-2xl font-bold text-gray-600 mb-8">{t.empty}</h2>
            <Link href={`/${lang}/category/all`} className="inline-block bg-amber-500 text-slate-900 font-bold px-8 py-3.5 rounded-xl hover:bg-amber-400 hover:scale-105 transition-all shadow-md">
              {t.shop}
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* 1. الجانب الأيمن (المنتجات) */}
            <div className="w-full lg:w-2/3 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-gray-100 relative group transition-all hover:shadow-md">
                  
                  {/* زر الحذف */}
                  <button onClick={() => removeItem(item.id)} className={`absolute top-4 ${isAr ? 'left-4' : 'right-4'} text-gray-300 hover:text-red-500 transition-colors bg-gray-50 hover:bg-red-50 p-2 rounded-full`} title={t.remove}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  
                  {/* صورة المنتج */}
                  <div className="w-24 h-24 md:w-32 md:h-32 relative bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                    {item.image_url ? (
                       <Image src={item.image_url} alt={item.name} fill className="object-cover mix-blend-multiply" />
                    ) : (
                       <span className="text-gray-300 absolute inset-0 flex items-center justify-center text-3xl">🐾</span>
                    )}
                  </div>
                  
                  {/* تفاصيل المنتج وأزرار الكمية */}
                  <div className="flex flex-col flex-grow w-full pt-2 sm:pt-0">
                    <Link href={`/${lang}/product/${item.id}`} className="text-base md:text-lg font-bold text-gray-800 hover:text-amber-600 line-clamp-2 pr-10 rtl:pr-0 rtl:pl-10 mb-1 transition-colors">
                      {item.name}
                    </Link>
                    <span className="text-xs font-bold text-gray-400 mb-4 bg-gray-50 inline-block w-fit px-2 py-0.5 rounded">{item.product_code}</span>
                    
                    <div className="flex items-center justify-between w-full mt-auto">
                      {/* متحكم الكمية */}
                      <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg p-1 shadow-inner">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-white hover:text-amber-600 rounded shadow-sm transition-all font-bold" disabled={item.quantity <= 1}>-</button>
                        <span className="font-bold text-gray-900 w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-white hover:text-amber-600 rounded shadow-sm transition-all font-bold">+</button>
                      </div>
                      
                      {/* السعر الفرعي */}
                      <div className="text-xl md:text-2xl font-black text-gray-900">
                        {item.price * item.quantity} <span className="text-sm text-gray-500 font-bold">TL</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 2. الجانب الأيسر (ملخص الطلب) */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 lg:sticky lg:top-28">
                <h3 className="text-xl font-black text-gray-900 mb-6">{t.summary}</h3>
                
                <div className="space-y-4 text-sm font-bold text-gray-600 mb-6 border-b border-gray-100 pb-6">
                  <div className="flex justify-between">
                    <span>{t.subtotal}</span>
                    <span className="text-gray-900">{totalPrice} TL</span>
                  </div>
                  <div className="flex justify-between text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg">
                    <span>{t.shipping}</span>
                    <span className="uppercase tracking-wide">{t.free}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-8">
                  <span className="text-lg font-bold text-gray-900">{t.finalTotal}</span>
                  <span className="text-3xl font-black text-amber-600">{totalPrice} <span className="text-lg text-gray-500">TL</span></span>
                </div>

                <Link href={`/${lang}/checkout`} className="w-full flex items-center justify-center bg-slate-900 text-white font-bold text-lg py-4 rounded-xl hover:bg-amber-500 transition-colors shadow-xl hover:shadow-amber-500/20">
                  {t.checkout} {isAr ? '←' : '→'}
                </Link>
                
                <div className="mt-6 flex justify-center items-center gap-2 opacity-50 grayscale hover:grayscale-0 transition-all">
                  <span className="text-[10px] font-black tracking-widest uppercase bg-gray-100 px-2 py-1 rounded">iyzico</span>
                  <span className="text-[10px] font-black tracking-widest uppercase bg-gray-100 px-2 py-1 rounded">VISA</span>
                  <span className="text-[10px] font-black tracking-widest uppercase bg-gray-100 px-2 py-1 rounded">MasterCard</span>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}