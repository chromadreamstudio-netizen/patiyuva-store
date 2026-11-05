import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// تعريف شكل المنتج داخل السلة
export interface CartItem {
  id: string;
  product_code: string;
  name: string; // الاسم باللغة التي اختارها العميل
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      // دالة إضافة منتج للسلة (إذا كان موجوداً تزيد الكمية)
      addItem: (newItem) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === newItem.id);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === newItem.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { items: [...state.items, { ...newItem, quantity: 1 }] };
        });
      },

      // دالة حذف منتج بالكامل من السلة
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      // دالة تعديل الكمية (الزائد والناقص)
      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        }));
      },

      // دالة تفريغ السلة
      clearCart: () => set({ items: [] }),

      // دالة حساب الإجمالي المالي
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      // دالة حساب عدد القطع الكلي
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'pawhub-cart-storage', // اسم الذاكرة المحلية (Local Storage)
    }
  )
);