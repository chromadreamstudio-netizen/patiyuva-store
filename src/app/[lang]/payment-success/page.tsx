'use client';
import { useEffect, useState, use } from 'react';
import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function PaymentSuccessPage(props: { params: Promise<{ lang: string }> }) {
  const { lang } = use(props.params);
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  
  const clearCart = useCartStore((state) => state.clearCart);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // تفريغ السلة فوراً بمجرد دخول العميل لهذه الصفحة
    clearCart();
  }, [clearCart]);

  if (!mounted) return <div className="min-h-screen bg-[#F8F9FA]"></div>;

  const isAr = lang === 'ar';

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-4 text-center font-sans" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="bg-white p-10 md:p-16 rounded-3xl shadow-xl max-w-lg w-full border border-gray-100">
        
        {/* أيقونة النجاح */}
        <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h1 className="text-3xl font-black text-gray-900 mb-4">
          {isAr ? 'تمت عملية الدفع بنجاح!' : 'Payment Successful!'}
        </h1>
        
        <p className="text-gray-600 mb-8 text-lg font-medium">
          {isAr ? 'شكراً لتسوقك من باتي يوفا. سنقوم بتجهيز طلبك فوراً.' : 'Thank you for shopping at Patiyuva. We will process your order immediately.'}
        </p>
        
        {orderId && (
          <div className="mb-10 bg-gray-50 py-3 px-6 rounded-xl border border-gray-200 inline-block">
            <p className="text-sm font-bold text-gray-500 mb-1">{isAr ? 'رقم الطلب الخاص بك' : 'Your Order ID'}</p>
            <p className="text-xl font-black text-gray-900 tracking-wider">{orderId}</p>
          </div>
        )}
        
        <Link href={`/${lang}`} className="block w-full bg-slate-900 text-white font-bold text-lg py-4 rounded-xl hover:bg-amber-500 transition-colors shadow-lg">
          {isAr ? 'العودة للصفحة الرئيسية' : 'Back to Home'}
        </Link>
      </div>
    </div>
  );
}