"use client";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { CartContextType, Item, CartItem } from "@/app/types";
import { addItemToCartDB, clearCartDB, fetchCartItemsDB, removeItemFromCartDB } from "../actions/cart";
import { UserContext } from "./userContext";

const initialCart: CartContextType = {
    items: [],
    addToCart: () => { },
    removeFromCart: () => { },
    count: 0,
    clearCart: () => { },
    loading: true
};

export const CartContext = createContext<CartContextType>(initialCart);

export default function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [count, setCount] = useState(0);
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(true);  // Added loading state

    async function fetchExistingCart() {
        if (!user.id) return;
        setLoading(true);
        const fetchedItems = await fetchCartItemsDB(user.id);
        if (fetchedItems) {
            setItems(fetchedItems);
            setCount(fetchedItems.reduce((total, item) => total + item.quantity, 0));
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchExistingCart();
    }, [user.id]);

    async function addToCart(item: Item) {
        if (!user.id) return;

        const success = await addItemToCartDB(item.id, user.id);
        if (success) {
            await fetchExistingCart();  // Fetch updated cart after adding
        }
    }

    async function removeFromCart(id: number) {
        if (!user.id) return;

        const success = await removeItemFromCartDB(id, user.id);
        if (success) {
            await fetchExistingCart();  // Fetch updated cart after removing
        }
    }

    async function clearCart() {
        if (!user.id) return;

        const success = await clearCartDB(user.id);
        if (success) {
            setItems([]);
            setCount(0);
        }
    }

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, count, clearCart, loading }}>
            {children}
        </CartContext.Provider>
    );
}
