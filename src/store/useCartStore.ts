import { create } from 'zustand';
import { Product } from '../data/products';

type CartItem = {
  product: Product;
  quantity: number;
  size: string;
};

type CartState = {
  items: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, size: string) => void;
  removeItem: (productId: string, size: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isCartOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  addItem: (product, size) => set((state) => {
    const existingItem = state.items.find(i => i.product.id === product.id && i.size === size);
    if (existingItem) {
      return {
        items: state.items.map(i => 
          i.product.id === product.id && i.size === size 
            ? { ...i, quantity: i.quantity + 1 } 
            : i
        ),
        isCartOpen: true
      };
    }
    return { 
      items: [...state.items, { product, quantity: 1, size }],
      isCartOpen: true
    };
  }),
  removeItem: (productId, size) => set((state) => ({
    items: state.items.filter(i => !(i.product.id === productId && i.size === size))
  })),
  clearCart: () => set({ items: [] }),
  getCartTotal: () => {
    return get().items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }
}));
