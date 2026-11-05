'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '../store/useCartStore';
import { useParams, useRouter } from 'next/navigation';

export default function CartDrawer({ dict }: { dict: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCartStore();
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* أيقونة السلة */}
      <button 
        onClick={() => setIsOpen(true)} 
        className="fixed top-6 right-6 rtl:right-auto rtl:left-6 bg-white p-3 rounded-full shadow-lg border border-[#ebebeb] z-40 hover:scale-105 transition-transform flex items-center justify-center"
      >
        <div className="relative">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#5433eb] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {getTotalItems()}
            </span>
          )}
        </div>
      </button>

      {/* الواجهة المنزلقة */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end rtl:justify-start">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right rtl:slide-in-from-left">
            <div className="p-6 border-b border-[#ebebeb] flex justify-between items-center bg-[#f2f4f5]">
              <h2 className="text-xl font-bold text-[#1F2937]">{dict?.home?.cart || 'سلة المشتريات'}</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="text-center text-[#787574] mt-10">السلة فارغة حالياً</div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center bg-white p-3 rounded-2xl border border-[#ebebeb] shadow-sm">
                    <div className="w-16 h-16 bg-[#f2f4f5] rounded-xl flex items-center justify-center text-[10px] text-gray-400 font-bold overflow-hidden">
                      {item.product_code}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-[#1F2937] line-clamp-1">{item.name}</h3>
                      <div className="text-[#5433eb] font-bold text-sm mt-1">{item.price} TL</div>
                    </div>
                    <div className="flex items-center gap-3 bg-[#f2f4f5] rounded-full px-2 py-1">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-black">-</button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-black">+</button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="p-2 text-red-400 hover:text-red-600 transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-[#ebebeb] bg-white">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-500 font-medium">الإجمالي:</span>
                <span className="text-2xl font-bold text-[#1F2937]">{getTotalPrice().toLocaleString()} TL</span>
              </div>
              <button 
                disabled={items.length === 0} 
                onClick={() => {
                  setIsOpen(false);
                  router.push(`/${params.lang}/checkout`);
                }}
                className="w-full h-14 bg-[#5433eb] text-white font-bold rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transition-transform shadow-[var(--shadow-violet-glow)]"
              >
                {dict?.home?.checkout || 'إتمام الطلب'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}