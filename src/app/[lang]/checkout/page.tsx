'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '../../../store/useCartStore';
import { useRouter, useParams } from 'next/navigation';

export default function Checkout() {
  const { items, getTotalPrice } = useCartStore();
  const router = useRouter();
  const params = useParams();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // حالة (State) لتخزين بيانات الشحن التي سيدخلها العميل
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', phone: '', email: '', city: '', address: ''
  });

  useEffect(() => {
    setMounted(true);
    // إذا كانت السلة فارغة، نرجعه للصفحة الرئيسية تلقائياً
    if (items.length === 0) {
      router.back();
    }
  }, [items, router]);

  // دالة الدفع الحقيقية التي تتصل بـ Shopier API
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formData,
          totalAmount: getTotalPrice(),
          lang: params.lang || 'tr' 
        }),
      });

      if (response.ok) {
        // استلام الفورم المشفر من الخادم وفتحه لنقل العميل لـ Shopier
        const formHtml = await response.text();
        const newWindow = window.document.open();
        newWindow.write(formHtml);
        newWindow.close();
      } else {
        alert('حدث خطأ في الاتصال ببوابة الدفع. تأكد من صحة مفاتيح Shopier.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert('حدث خطأ في الاتصال بالخادم.');
      setIsLoading(false);
    }
  };

  if (!mounted || items.length === 0) return null;

  return (
    <main className="max-w-[1000px] mx-auto px-4 py-12 flex flex-col-reverse md:flex-row gap-8">
      
      {/* قسم إدخال بيانات الشحن */}
      <div className="flex-1 bg-white p-6 md:p-8 rounded-[28px] shadow-sm border border-[#ebebeb]">
        <h2 className="text-2xl font-bold mb-8 text-[#1F2937]">بيانات الشحن والدفع</h2>
        
        <form onSubmit={handlePayment} className="flex flex-col gap-5">
          <div className="flex flex-col md:flex-row gap-5">
            <input required type="text" placeholder="الاسم الأول" className="w-full h-14 px-5 rounded-2xl border border-gray-200 focus:border-[#5433eb] outline-none transition-colors bg-gray-50 focus:bg-white" onChange={e => setFormData({...formData, firstName: e.target.value})}/>
            <input required type="text" placeholder="اسم العائلة" className="w-full h-14 px-5 rounded-2xl border border-gray-200 focus:border-[#5433eb] outline-none transition-colors bg-gray-50 focus:bg-white" onChange={e => setFormData({...formData, lastName: e.target.value})}/>
          </div>
          
          <input required type="tel" placeholder="رقم الهاتف (مثال: 05555555555)" className="w-full h-14 px-5 rounded-2xl border border-gray-200 focus:border-[#5433eb] outline-none transition-colors bg-gray-50 focus:bg-white" onChange={e => setFormData({...formData, phone: e.target.value})}/>
          
          <input required type="email" placeholder="البريد الإلكتروني" className="w-full h-14 px-5 rounded-2xl border border-gray-200 focus:border-[#5433eb] outline-none transition-colors bg-gray-50 focus:bg-white" onChange={e => setFormData({...formData, email: e.target.value})}/>
          
          <input required type="text" placeholder="المدينة / المقاطعة (مثال: Bursa, Nilüfer)" className="w-full h-14 px-5 rounded-2xl border border-gray-200 focus:border-[#5433eb] outline-none transition-colors bg-gray-50 focus:bg-white" onChange={e => setFormData({...formData, city: e.target.value})}/>
          
          <textarea required placeholder="عنوان الشحن بالتفصيل (الحي، الشارع، رقم البناء، رقم الشقة)" className="w-full h-32 p-5 rounded-2xl border border-gray-200 focus:border-[#5433eb] outline-none transition-colors bg-gray-50 focus:bg-white resize-none" onChange={e => setFormData({...formData, address: e.target.value})}></textarea>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="mt-4 w-full h-14 bg-[#5433eb] text-white font-bold rounded-full shadow-[var(--shadow-violet-glow)] hover:opacity-90 transition-opacity text-lg disabled:opacity-70"
          >
            {isLoading ? 'جاري التحويل الآمن...' : 'الانتقال للدفع الآمن'}
          </button>
        </form>
      </div>

      {/* قسم ملخص الطلب */}
      <div className="w-full md:w-[400px] bg-[#f2f4f5] p-6 md:p-8 rounded-[28px] h-fit sticky top-6 border border-[#ebebeb]">
        <h3 className="text-xl font-bold mb-6 text-[#1F2937]">ملخص الطلب</h3>
        <div className="flex flex-col gap-4 mb-6">
          {items.map(item => (
            <div key={item.id} className="flex justify-between items-center text-[15px] font-medium text-gray-700">
              <span className="line-clamp-1 flex-1 pr-4">{item.quantity}x {item.name}</span>
              <span className="font-bold text-black whitespace-nowrap">{item.price * item.quantity} TL</span>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-300 pt-6 flex justify-between items-center font-bold">
          <span className="text-lg text-gray-600">الإجمالي النهائي</span>
          <span className="text-[#5433eb] text-2xl">{getTotalPrice().toLocaleString()} TL</span>
        </div>
      </div>

    </main>
  );
}