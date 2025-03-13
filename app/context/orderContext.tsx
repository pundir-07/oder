"use client"
import { ReactNode, useState } from "react";
import { createContext } from "react";
import { Order } from "../types/order";


interface OrderContextType {
    order: Order,
    createOrder: (order: Order) => void,
    clearOrder: () => void,
    setPaymentCompleted: () => void
}
export const OrdersContext = createContext<OrderContextType>({
    order: {
        id: "",
        items: [],
        isPayed: false,
        createdAt: "",
        value: 0
    },
    createOrder: () => { },
    clearOrder: () => { },
    setPaymentCompleted: () => { }
})

export default function OrderProvider({ children }: { children: ReactNode }) {
    const [order, setOrder] = useState<Order>({
        id: "",
        items: [],
        isPayed: false,
        createdAt: "",
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
            createdAt: "",
            value: 0
        })
    }
    function setPaymentCompleted() {
        setOrder(prev => {
            return { ...prev, isPayed: true }
        })
    }
    return <OrdersContext.Provider value={{ order, createOrder, clearOrder, setPaymentCompleted }}>
        {children}
    </OrdersContext.Provider>
}