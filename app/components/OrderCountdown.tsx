import { useContext, useEffect, } from "react";
import { OrdersContext } from "../context/orderContext";
import { toast } from "sonner";
import { Order } from "../types/order";

export default function OrderCountdown({ order }: { order: Order }) {
    const { deadOrder, setDeadOrder, clearOrder, countDown } = useContext(OrdersContext)
    useEffect(() => {
        if (order.id && countDown === 0) {
            if (!deadOrder) {
                toast.success("Your order has been served at the table. Thank You!")
            }
            if (order.isPaid) {
                clearOrder()
                return
            } else {
                setDeadOrder()
            }
            return;
        }



    }, [countDown, order.id, order.isPaid]);


    const minutes = Math.floor(countDown / 60);
    const secs = countDown % 60;

    return (
        !deadOrder && <div className={`text-xs  text-green font-semibold text-center`}>
            {minutes}:{secs.toString().padStart(2, "0")}
        </div>

    );
}