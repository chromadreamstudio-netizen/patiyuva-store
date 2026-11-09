'use client';
import { useCartStore } from '@/store/useCartStore';
import { useState } from 'react';

// تعريف الأنواع (Types) لتناسب التحديث الجديد
interface ProductData {
  id: string;
  name: string;
  selling_price: number;
  image_url?: string;
  product_code: string;
  shopier_url?: string;
  colors?: string; // الألوان المخزنة في قاعدة البيانات (مثال: "Krem, Gri, Siyah")
}

interface AddToCartButtonProps {
  product: ProductData;
  text: string;
}

export default function AddToCartButton({ product, text }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);
  const [errorText, setErrorText] = useState('');

  // استخراج الألوان من المنتج، أو توفير ألوان تجريبية إذا لم توجد
  // ملاحظة: بمجرد إضافة عمود colors في Supabase وتعبئته، ستظهر الألوان الحقيقية
  const rawColors = product.colors || 'Krem, Gri'; 
  const availableColors = rawColors.split(',').map(c => c.trim()).filter(Boolean);
  
  // حالة (State) لحفظ اللون الذي اختاره العميل
  const [selectedColor, setSelectedColor] = useState<string>('');

  const handleAdd = () => {
    // التحقق من اختيار اللون قبل الإضافة
    if (availableColors.length > 0 && !selectedColor) {
      setErrorText('يرجى اختيار لون المنتج أولاً / Lütfen önce bir renk seçin');
      return;
    }
    
    setErrorText('');

    addItem({
      id: product.id,
      name: product.name,
      price: product.selling_price,
      quantity: 1,
      image_url: product.image_url,
      product_code: product.product_code,
      shopier_url: product.shopier_url,
      selected_color: selectedColor // إرسال اللون المختار للسلة
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 1. قسم اختيار الألوان */}
      {availableColors.length > 0 && (
        <div className="flex flex-col gap-2 mb-2">
          <label className="text-sm font-bold text-gray-700">اللون (Renk):</label>
          <div className="flex flex-wrap gap-2">
            {availableColors.map((color) => (
              <button
                key={color}
                onClick={() => {
                  setSelectedColor(color);
                  setErrorText('');
                }}
                className={`px-4 py-2 border rounded-lg text-sm font-bold transition-all ${
                  selectedColor === color
                    ? 'border-amber-600 bg-amber-50 text-amber-700 shadow-sm'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
          {errorText && <span className="text-xs text-red-500 font-bold mt-1">{errorText}</span>}
        </div>
      )}

      {/* 2. زر الإضافة للسلة */}
      <button
        onClick={handleAdd}
        className={`w-full font-bold text-lg py-4 rounded-xl transition-all shadow-md ${
          isAdded 
            ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
            : 'bg-slate-900 text-white hover:bg-slate-800'
        }`}
      >
        {isAdded ? '✓ تمت الإضافة / Eklendi' : text}
      </button>
    </div>
  );
}