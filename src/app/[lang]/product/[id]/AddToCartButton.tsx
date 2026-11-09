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
  colors?: string; // الألوان المخزنة في قاعدة البيانات (مثال: "Krem, Gri, Antrasit")
}

interface AddToCartButtonProps {
  product: ProductData;
  text: string;
}

// خريطة الألوان لربط اسم اللون بكود HEX ليظهر كدائرة ملونة حقيقية
const colorMap: Record<string, string> = {
  'Krem': '#F5F5DC',      // بيج/كريمي
  'Gri': '#808080',       // رمادي
  'Antrasit': '#383E42',  // رصاصي غامق / أنثراسيت
  'Pembe': '#FFC0CB',     // وردي
  'Yeşil': '#8FBC8F',     // أخضر فاتح
  'Siyah': '#000000',     // أسود
  'Beyaz': '#FFFFFF',     // أبيض
  'Mavi': '#4682B4'       // أزرق
};

export default function AddToCartButton({ product, text }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);
  const [errorText, setErrorText] = useState('');

  // استخراج الألوان من المنتج، أو توفير الألوان الخمسة المطلوبة للتجربة إذا لم توجد
  const rawColors = product.colors || 'Krem, Gri, Antrasit, Pembe, Yeşil'; 
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
      {/* 1. قسم اختيار الألوان (التصميم الدائري الجديد) */}
      {availableColors.length > 0 && (
        <div className="flex flex-col gap-3 mb-2">
          <label className="text-sm font-bold text-gray-700">
            اللون المختار (Seçilen Renk): <span className="text-amber-600 ml-1">{selectedColor || 'لم يتم الاختيار'}</span>
          </label>
          <div className="flex flex-wrap gap-3">
            {availableColors.map((colorName) => {
              const hexColor = colorMap[colorName] || '#E5E7EB'; // لون رمادي فاتح كافتراضي إذا لم يكن في الخريطة
              const isSelected = selectedColor === colorName;
              
              return (
                <button
                  key={colorName}
                  onClick={() => {
                    setSelectedColor(colorName);
                    setErrorText('');
                  }}
                  title={colorName}
                  className={`relative w-10 h-10 rounded-full transition-all duration-200 shadow-sm
                    ${isSelected ? 'ring-2 ring-offset-2 ring-amber-500 scale-110' : 'hover:scale-105 border border-gray-200'}
                  `}
                  style={{ backgroundColor: hexColor }}
                  aria-label={colorName}
                >
                  {/* علامة صح تظهر فوق اللون الفاتح/الأبيض إذا تم اختياره */}
                  {isSelected && (
                    <span className={`absolute inset-0 flex items-center justify-center text-sm font-bold ${['Krem', 'Beyaz', 'Sarı'].includes(colorName) ? 'text-gray-800' : 'text-white'}`}>
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          {errorText && <span className="text-xs text-red-500 font-bold mt-1 animate-pulse">{errorText}</span>}
        </div>
      )}

      {/* 2. زر الإضافة للسلة */}
      <button
        onClick={handleAdd}
        className={`w-full font-bold text-lg py-4 rounded-xl transition-all shadow-md mt-2 ${
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