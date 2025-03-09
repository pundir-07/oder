"use client"
import { ReactNode, useState } from "react";
import { createContext } from "react";
import { Order } from "../types/order";


interface OrderContextType {
    order: Order,
    createOrder: (order: Order) => void,
    clearOrder: () => void
}
export const OrdersContext = createContext<OrderContextType>({
    order: {
        id: "",
        items: [],
        isPayed: false,
        createdAt: null,
        value: 0
    },
    createOrder: () => { },
    clearOrder: () => { }
})

export default function OrderProvider({ children }: { children: ReactNode }) {
    const [order, setOrder] = useState<Order>({
        id: "",
        items: [],
        isPayed: false,
        createdAt: null,
        value: 0
    })
    function createOrder(order: Order) {
        setOrder(order)
    }
    function clearOrder() {
        setOrder({
            id: "",
            items: [],
            isPayed: false,
            createdAt: null,
            value: 0
        })
    }
    return <OrdersContext.Provider value={{ order, createOrder, clearOrder }}>
        {children}
    </OrdersContext.Provider>
}