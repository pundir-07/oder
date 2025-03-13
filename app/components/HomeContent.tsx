"use client"
import BestSellers from "@/app/components/BestSellers";
import CartButton from "@/app/components/CartButton";
import Header from "@/app/components/Header";

import { Item } from "../types";
import { useContext, useEffect, useState } from "react";
import SearchResults from "./SearchResults";
import { UserContext } from "../context/userContext";
import { OrdersContext } from "../context/orderContext";
import CurrentOrders from "./CurrentOrder";
import { fetchPendingOrderOfCustomer } from "../actions/order";
import { AccordianComponent } from "./ItemsAccordian";
export default function HomeContent({ items }: { items: Item[] }) {
    const [searchText, setSearchText] = useState<string>("")
    const { user } = useContext(UserContext)
    const { order, createOrder } = useContext(OrdersContext)



    useEffect(() => {
        async function fetchOrder() {
            const pendingOrder = await fetchPendingOrderOfCustomer(user?.id)
            console.log(`Pending order fetched from db-`, pendingOrder)
            if (pendingOrder) {
                console.log("PENDING ORDER USE EFFECT --", pendingOrder)
                createOrder(pendingOrder)
            }
        }
        if (user.id) {
            fetchOrder()
        }
    }, [user.id, createOrder])
    // console.log(`SearchText state in HomeContent = ${searchText}`)
    const bestsellers = items?.filter(item => item.isBestseller)
    const mainCourse = items.filter(item => item.category?.toString() === "MAIN_COURSE")
    const desserts = items.filter(item => item.category?.toString() === "DESSERTS")
    const drinks = items.filter(items => items.category?.toString() === "DRINKS")
    return (
        <div className="flex flex-col gap-3 md:hidden">
            <Header setSearchText={setSearchText} searchText={searchText} />
            {order.items.length > 0 && <CurrentOrders order={order} />}
            {searchText && <SearchResults onLoad={() => { }} query={searchText} items={items} />}
            {!searchText && <BestSellers items={bestsellers} />}

            <AccordianComponent items={mainCourse} category="Main Course" />
            <AccordianComponent items={desserts} category="Desserts" />
            <AccordianComponent items={drinks} category="Drinks" />
            <CartButton />
        </div>
    )
}
