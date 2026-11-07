'use client';
import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, use } from 'react';

export default function CheckoutPage(props: { params: Promise<{ lang: string }> }) {
  const { lang } = use(props.params);
  const isAr = lang === 'ar';

  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // بيانات العميل
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    address: ''
  });

  const { items, getTotalPrice } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const dict = {
    ar: { 
      title: 'إتمام الطلب', back: 'العودة للسلة', 
      shipping: 'بيانات الشحن', name: 'الاسم الكامل', email: 'البريد الإلكتروني', phone: 'رقم الهاتف', 
      city: 'المدينة / المحافظة', address: 'العنوان التفصيلي (الشارع، البناء، الشقة)',
      summary: 'ملخص الطلب', total: 'الإجمالي الكلي', pay: 'ادفع الآن بأمان', processing: 'جاري التحويل للدفع...',
      empty: 'سلتك فارغة!', shop: 'تسوق الآن', secure: 'دفع آمن ومشفّر 100%'
    },
    tr: { 
      title: 'Ödeme Sayfası', back: 'Sepete Dön', 
      shipping: 'Teslimat Bilgileri', name: 'Ad Soyad', email: 'E-posta Adresi', phone: 'Telefon Numarası', 
      city: 'İl / İlçe', address: 'Açık Adres (Mahalle, Sokak, Kapı No)',
      summary: 'Sipariş Özeti', total: 'Genel Toplam', pay: 'Güvenle Öde', processing: 'Ödemeye Yönlendiriliyor...',
      empty: 'Sepetiniz boş!', shop: 'Alışverişe Başla', secure: '%100 Güvenli Ödeme'
    },
    en: { 
      title: 'Checkout', back: 'Back to Cart', 
      shipping: 'Shipping Details', name: 'Full Name', email: 'Email Address', phone: 'Phone Number', 
      city: 'City / District', address: 'Full Address (Street, Building, Apt)',
      summary: 'Order Summary', total: 'Total', pay: 'Pay Securely', processing: 'Processing...',
      empty: 'Your cart is empty!', shop: 'Shop Now', secure: '100% Secure Checkout'
    }
  };
  const t = dict[lang as keyof typeof dict] || dict.ar;

  if (!mounted) return <div className="min-h-screen bg-[#F8F9FA]"></div>;

  const totalPrice = getTotalPrice();

  // محاكاة الإرسال إلى iyzico (سنربطها بالـ API الحقيقي لاحقاً)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Connect to iyzico backend API here
    setTimeout(() => {
      alert(isAr ? 'سيتم تحويلك قريباً لبوابة الدفع (iyzico)' : 'Yakında iyzico ödeme sayfasına yönlendirileceksiniz');
      setIsSubmitting(false);
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center py-12" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="bg-white p-10 rounded-2xl shadow-sm text-center">
          <span className="text-5xl mb-4 block">🛒</span>
          <h2 className="text-2xl font-bold text-gray-700 mb-6">{t.empty}</h2>
          <Link href={`/${lang}/category/all`} className="bg-amber-500 text-slate-900 font-bold px-8 py-3 rounded-xl hover:bg-amber-400 transition-colors">
            {t.shop}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-8 md:py-12 font-sans" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href={`/${lang}/cart`} className="inline-block mb-6 text-amber-600 hover:text-amber-700 font-bold transition-colors text-sm md:text-base">
          {isAr ? '←' : '→'} {t.back}
        </Link>
        
        <h1 className="text-2xl md:text-4xl font-black text-gray-900 mb-8 md:mb-10">{t.title}</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* 1. نموذج بيانات الشحن (Form) */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">{t.shipping}</h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">{t.name}</label>
                    <input required type="text" value={formData.fullName} onChange={(e)=>setFormData({...formData, fullName: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all bg-gray-50 focus:bg-white" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">{t.phone}</label>
                    <input required type="tel" value={formData.phone} onChange={(e)=>setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all bg-gray-50 focus:bg-white" dir="ltr" placeholder="+90 5XX XXX XX XX" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">{t.email}</label>
                    <input required type="email" value={formData.email} onChange={(e)=>setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all bg-gray-50 focus:bg-white" dir="ltr" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">{t.city}</label>
                    <input required type="text" value={formData.city} onChange={(e)=>setFormData({...formData, city: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all bg-gray-50 focus:bg-white" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-700">{t.address}</label>
                  <textarea required rows={3} value={formData.address} onChange={(e)=>setFormData({...formData, address: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all bg-gray-50 focus:bg-white resize-none"></textarea>
                </div>
              </form>
            </div>
          </div>

          {/* 2. ملخص الطلب وزر الدفع */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 lg:sticky lg:top-28">
              <h3 className="text-xl font-black text-gray-900 mb-6">{t.summary}</h3>
              
              {/* قائمة المنتجات المصغرة */}
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 rtl:pr-0 rtl:pl-2">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                      {item.image_url ? <Image src={item.image_url} alt={item.name} fill className="object-cover" /> : null}
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-xs font-bold text-gray-800 line-clamp-1">{item.name}</h4>
                      <div className="text-xs text-gray-500 font-medium mt-0.5">Qty: {item.quantity}</div>
                    </div>
                    <div className="text-sm font-black text-gray-900 shrink-0">{item.price * item.quantity} TL</div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-6 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-gray-600">{t.total}</span>
                  <span className="text-3xl font-black text-amber-600">{totalPrice} <span className="text-base text-gray-500">TL</span></span>
                </div>
              </div>

              <button 
                onClick={handleSubmit} 
                disabled={isSubmitting || !formData.fullName || !formData.phone || !formData.address || !formData.city}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold text-lg py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">{t.processing}</span>
                ) : (
                  <>
                    <span>🔒</span> {t.pay}
                  </>
                )}
              </button>

              <div className="mt-4 flex flex-col items-center justify-center gap-3">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">{t.secure}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black tracking-widest text-blue-800 bg-blue-50 px-2 py-1 rounded border border-blue-100">iyzico</span>
                  <span className="text-[10px] font-black tracking-widest text-blue-900 bg-gray-50 px-2 py-1 rounded border border-gray-200">VISA</span>
                  <span className="text-[10px] font-black tracking-widest text-red-600 bg-gray-50 px-2 py-1 rounded border border-gray-200">MasterCard</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}