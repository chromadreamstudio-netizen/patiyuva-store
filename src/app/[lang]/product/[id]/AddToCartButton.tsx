'use client';

import { useCartStore } from '@/store/useCartStore';

export default function AddToCartButton({ product, text }: { product: any, text: string }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button 
      onClick={() => addItem(product)}
      className="w-full md:w-3/4 h-16 bg-[#5433eb] text-white text-lg font-bold rounded-full shadow-[var(--shadow-violet-glow)] hover:scale-[1.02] transition-transform flex items-center justify-center gap-3"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
      {text}
    </button>
  );
}