"use client"
import { createContext, ReactNode, useState } from "react";
import { CartContextType, Item } from "@/app/types";
import { CartItem } from "@/app/types";

const initialCart: CartContextType = {
    items: [],
    addToCart: () => { },
    removeFromCart: () => { },
    count: 0
}
export const CartContext = createContext<CartContextType>(initialCart);

export default function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [count, setCount] = useState(0);
    function addToCart(item: Item) {
        setItems(prev => {
            const existingItem = prev.find(i => i.id === item.id);
            if (existingItem) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { ...item, quantity: 1 }];
        });
        setCount(count + 1)
    }

    function removeFromCart(id: number) {
        setItems(prev => {
            const item = prev.find(i => i.id === id);
            if (!item) {
                console.log("Item to be removed not found. Error");
                return prev;
            }
            if (item.quantity === 1) {
                return prev.filter(i => i.id !== id);
            }
            return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
        });
        setCount(count - 1)
    }

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, count }}>
            {children}
        </CartContext.Provider>
    );
}
