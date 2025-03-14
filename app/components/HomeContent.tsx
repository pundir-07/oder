"use client"
import BestSellers from "@/app/components/BestSellers";
import CartButton from "@/app/components/CartButton";
import Header from "@/app/components/Header";

import { Item } from "../types";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import SearchResults from "./SearchResults";
import { UserContext } from "../context/userContext";
import { OrdersContext } from "../context/orderContext";
import CurrentOrders from "./CurrentOrder";
import { fetchPendingOrderOfCustomer } from "../actions/order";
import { AccordianComponent } from "./ItemsAccordian";
import { toast, Toaster } from "sonner";
import { Input } from "./ui/input";
import { X } from "lucide-react";

export default function HomeContent({ items }: { items: Item[] }) {
    const [searchText, setSearchText] = useState<string>("")
    const { user } = useContext(UserContext)
    const { order, deadOrder, createOrder } = useContext(OrdersContext)
    const [focus, setFocus] = useState(false)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const showCross = focus && searchText?.length > 0;

    const fetchOrder = useCallback(async () => {
        const pendingOrder = await fetchPendingOrderOfCustomer(user?.id)
        console.log(`Pending order fetched from db-`, pendingOrder)
        if (pendingOrder) {
            console.log("PENDING ORDER USE EFFECT --", pendingOrder)
            createOrder(pendingOrder)
        }
    }, [user.id])

    useEffect(() => {
        if (user.id) {
            fetchOrder()
        }


    }, [user.id, fetchOrder])

    const handleFocus = () => {
        setFocus(true);
        setTimeout(() => {
            if (inputRef.current) {
                const inputPosition = inputRef.current.getBoundingClientRect().top;
                console.log(`Scroll lebel---`, window.scrollY)
                const targetPosition = window.scrollY + inputPosition - 10; // Adjust this value for fine-tuning
                window.scrollTo({ top: targetPosition, behavior: "smooth" });
            }
        }, 200); // Delay for smooth effect
    };

    const bestsellers = items?.filter(item => item.isBestseller)
    const mainCourse = items.filter(item => item.category?.toString() === "MAIN_COURSE")
    const desserts = items.filter(item => item.category?.toString() === "DESSERTS")
    const drinks = items.filter(items => items.category?.toString() === "DRINKS")
    return (
        <div className="flex flex-col gap-3 sm:hidden">
            <Header />
            <div className="relative z-10 flex justify-center w-auto">
                <div className=" w-[90%]">
                    <Input placeholder='Search' ref={inputRef} className={`text-gray-600 placeholder:text-sm  `} onChange={(e) => setSearchText(e.target.value)} onFocus={handleFocus} value={searchText} onBlur={() => setTimeout(() => setFocus(false), 200)} />

                    <div className='absolute flex items-center justify-center w-8 h-full right-6 top-0 '>
                        {showCross && <button onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSearchText("");
                            inputRef.current?.focus();
                            setTimeout(() => setFocus(true), 300)
                        }}>
                            <X size={20} color='black' />
                        </button>}

                    </div>
                </div>
            </div>

            {order.items.length > 0 && <CurrentOrders order={order} />}
            {searchText && <SearchResults onLoad={() => { }} query={searchText} items={items} />}
            {!searchText && <BestSellers items={bestsellers} />}

            <AccordianComponent items={mainCourse} category="Main Course" />
            <AccordianComponent items={desserts} category="Desserts" />
            <AccordianComponent items={drinks} category="Drinks" />
            {deadOrder && <div className="fixed bottom-6 right-6 w-14 h-14 rounded-xl  transition z-30" onClick={() => { toast.error("Please complete your pending payment to place a new order") }}></div>}
            <CartButton />
            <Toaster />
        </div>
    )
}
