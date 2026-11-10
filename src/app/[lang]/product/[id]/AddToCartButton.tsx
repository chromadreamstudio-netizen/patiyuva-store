'use client';
import { useCartStore } from '@/store/useCartStore';
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface ProductData {
  id: string;
  name: string;
  selling_price: number;
  image_url?: string;
  product_code: string;
  shopier_url?: string;
  colors?: string;
}

interface AddToCartButtonProps {
  product: ProductData;
  text: string;
}

// خريطة الألوان المحدثة شاملة جميع الألوان الجديدة في الكتالوج
const colorMap: Record<string, string> = {
  'Krem': '#F5F5DC',
  'Gri': '#808080',
  'Antrasit': '#383E42',
  'Pembe': '#FFC0CB',
  'Yeşil': '#8FBC8F',
  'Siyah': '#000000',
  'Beyaz': '#FFFFFF',
  'Mavi': '#4682B4',
  'Hardal': '#DAA520',         
  'Kahve': '#6F4E37',          
  'Sütlü Kahve': '#C19A6B',    
  'Bej': '#F5F5DC',            
  'Sarı': '#FFD700',           
  'Kırmızı': '#FF0000'         
};

export default function AddToCartButton({ product, text }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();
  const params = useParams();
  const lang = params?.lang || 'tr';
  
  const [isAdded, setIsAdded] = useState(false);
  const [errorText, setErrorText] = useState('');

  const rawColors = product.colors || ''; 
  const availableColors = rawColors.split(',').map(c => c.trim()).filter(Boolean);
  
  const [selectedColor, setSelectedColor] = useState<string>('');

  const handleAdd = () => {
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
      selected_color: selectedColor
    });

    setIsAdded(true);
    router.push(`/${lang}/cart`);
  };

  return (
    <div className="flex flex-col gap-4">
      {availableColors.length > 0 && (
        <div className="flex flex-col gap-3 mb-2">
          <label className="text-sm font-bold text-gray-700">
            اللون المختار (Seçilen Renk): <span className="text-amber-600 ml-1">{selectedColor || 'لم يتم الاختيار'}</span>
          </label>
          <div className="flex flex-wrap gap-3">
            {availableColors.map((colorName) => {
              const hexColor = colorMap[colorName] || '#E5E7EB';
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
                  {isSelected && (
                    <span className={`absolute inset-0 flex items-center justify-center text-sm font-bold ${['Krem', 'Beyaz', 'Sarı', 'Bej'].includes(colorName) ? 'text-gray-800' : 'text-white'}`}>
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

      <button
        onClick={handleAdd}
        className={`w-full font-bold text-lg py-4 rounded-xl transition-all shadow-md mt-2 ${
          isAdded 
            ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
            : 'bg-slate-900 text-white hover:bg-slate-800'
        }`}
      >
        {isAdded ? '✓ جاري التحويل... / Yönlendiriliyor...' : text}
      </button>
    </div>
  );
}