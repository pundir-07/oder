"use client"
import { ReactNode, useRef, useState } from "react";
import { createContext } from "react";
import { Order } from "../types/order";
import { closeOrderInDatabase, processPaymentDB } from "../actions/order";
import { useRouter } from "next/navigation";


interface OrderContextType {
    order: Order,
    createOrder: (order: Order) => void,
    clearOrder: () => void,
    processPayment: () => void,
    deadOrder: boolean,
    setDeadOrder: () => void
    countDown: number
}
export const OrdersContext = createContext<OrderContextType>({
    order: {
        id: "",
        items: [],
        isPaid: false,
        createdAt: "",
        value: 0,
        status: "",
        countDown: 0
    },
    deadOrder: false,
    setDeadOrder: () => { },
    createOrder: () => { },
    clearOrder: () => { },
    processPayment: () => { },
    countDown: 0
})

export default function OrderProvider({ children }: { children: ReactNode }) {
    const [order, setOrder] = useState<Order>({
        id: "",
        items: [],
        isPaid: false,
        createdAt: "",
        value: 0,
        status: "",
        countDown: 0
    })
    const [countDown, setCoundown] = useState<number>(0)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const [deadOrder, setDead] = useState(false)
    const router = useRouter()

    function createOrder(order: Order) {
        setOrder(order);
        setCoundown(order.countDown);

        if (order.countDown === 0 && !order.isPaid) {
            setDeadOrder();
            return;
        }

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            setCoundown((prev) => {
                console.log("ORDER COUNTDOWN NOW----", prev);
                if (prev <= 1) {
                    clearInterval(intervalRef.current!);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }
    async function clearOrder() {
        const orderClosed = await closeOrderInDatabase(order.id)
        if (orderClosed) {

            setOrder({
                id: "",
                items: [],
                isPaid: false,
                createdAt: "",
                value: 0,
                status: "",
                countDown: 0
            })
        }
    }
    function setDeadOrder() {
        setDead(true)
    }
    async function processPayment() {
        const { success } = await processPaymentDB(order.id)
        if (!success) {
            return
        }
        if (countDown === 0) {
            clearOrder()
        }
        router.replace("/payment-success?order-id=${order.id}")
    }
    return <OrdersContext.Provider value={{ order, createOrder, clearOrder, processPayment, deadOrder, setDeadOrder, countDown }}>
        {children}
    </OrdersContext.Provider>
}