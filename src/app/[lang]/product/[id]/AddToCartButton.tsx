'use client';
import { useCartStore } from '@/store/useCartStore';
import { useState } from 'react';

export default function AddToCartButton({ product, text }: { product: any, text: string }) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      id: product.id,
      product_code: product.product_code,
      name: product.name || product.product_code,
      price: product.selling_price,
      image_url: product.image_url,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button 
      onClick={handleAdd}
      className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all shadow-lg ${added ? 'bg-green-500 hover:bg-green-600' : 'bg-amber-500 hover:bg-amber-600 hover:scale-[1.02]'}`}
    >
      {added ? '✓ تم الإضافة بنجاح' : text}
    </button>
  );
}