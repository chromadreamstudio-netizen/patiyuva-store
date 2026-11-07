'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCartStore } from '../store/useCartStore';

export default function ProductCard({ product, dict }: { product: any, dict: any }) {
  const addItem = useCartStore((state) => state.addItem);
  const params = useParams();
  const lang = params.lang || 'tr';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id.toString(),
      product_code: product.product_code,
      name: product.product_translations?.[0]?.name || product.product_code,
      price: product.selling_price,
      image_url: product.image_url // تم إضافة سطر الصورة هنا لحل المشكلة
    });
  };

  return (
    <Link 
      href={`/${lang}/product/${product.id}`}
      className="product-card group flex flex-col border border-transparent hover:border-[#ebebeb] relative rounded-[24px] transition-all hover:shadow-md bg-white"
    >
      <div className="w-full aspect-square p-2 relative">
        <div className="w-full h-full bg-[#f2f4f5] rounded-[20px] flex items-center justify-center overflow-hidden relative">
          {product.image_url ? (
            <img 
              src={product.image_url} 
              alt={product.product_translations?.[0]?.name || product.product_code}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <span className="text-[#acb0aa] text-sm font-medium">{product.product_code}</span>
          )}
        </div>
        <button 
          onClick={handleAddToCart}
          className="absolute bottom-4 right-4 rtl:right-auto rtl:left-4 bg-white/90 backdrop-blur-md text-[#5433eb] p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-[#5433eb] hover:text-white z-10"
          aria-label="Add to cart"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        </button>
      </div>
      
      <div className="p-5 pt-3 flex flex-col gap-1">
        <h2 className="text-[15px] font-semibold tracking-tight text-[#000000] leading-tight line-clamp-2 min-h-[2.5rem] group-hover:text-[#5433eb] transition-colors">
          {product.product_translations?.[0]?.name || product.product_code}
        </h2>
        <div className="mt-1 flex justify-between items-center">
          <div className="text-lg font-bold text-[#000000]">{product.selling_price} TL</div>
          <button 
            onClick={handleAddToCart}
            className="text-sm font-bold text-[#5433eb] bg-[#f2f4f5] px-4 py-2 rounded-full hover:bg-[#5433eb] hover:text-white transition-colors z-10"
          >
            + {dict?.home?.add || 'أضف'}
          </button>
        </div>
      </div>
    </Link>
  );
}