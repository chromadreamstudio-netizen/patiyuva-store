import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string; // معرف المنتج في قاعدة البيانات
  cart_id?: string; // معرف فريد داخل السلة (يدمج المنتج مع اللون)
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
  product_code?: string; 
  shopier_url?: string | null;
  selected_color?: string; // لحفظ اللون الذي اختاره العميل
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (cart_id: string) => void;
  updateQuantity: (cart_id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        const { items } = get();
        // إنشاء معرف فريد للسلة حتى لو كان نفس المنتج بألوان مختلفة
        const uniqueCartId = item.selected_color ? `${item.id}-${item.selected_color}` : item.id;
        const itemWithCartId = { ...item, cart_id: uniqueCartId };

        const existingItem = items.find((i) => i.cart_id === uniqueCartId);
        
        if (existingItem) {
          set({
            items: items.map((i) => 
              i.cart_id === uniqueCartId ? { ...i, quantity: i.quantity + item.quantity } : i
            )
          });
        } else {
          set({ items: [...items, itemWithCartId] });
        }
      },
      
      removeItem: (cart_id) => {
        set({ items: get().items.filter((i) => i.cart_id !== cart_id && i.id !== cart_id) });
      },
      
      updateQuantity: (cart_id, quantity) => {
        set({
          items: get().items.map((i) => 
            (i.cart_id === cart_id || i.id === cart_id) ? { ...i, quantity } : i
          )
        });
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      }
    }),
    {
      name: 'patiyuva-cart',
    }
  )
);