import { Item } from "./item";

export interface CartContextType {
  items: CartItem[];
  addToCart: (item: Item) => void;
  removeFromCart: (id: number) => void;
  count: number;
  clearCart: () => void;
  loading: boolean;
}

export interface CartItem extends Item {
  quantity: number;
}
