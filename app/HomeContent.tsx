"use client"
import BestSellers from "@/app/components/BestSellers";
import CartButton from "@/app/components/CartButton";
import Categories from "@/app/components/Categories";
import Header from "@/app/components/Header";

import { Item } from "./types";
import { useContext, useEffect, useState } from "react";
import SearchResults from "./components/SearchResults";
import UserModal from "./components/UserModal";
import { UserContext } from "./context/userContext";
import { OrdersContext } from "./context/orderContext";
import CurrentOrders from "./components/CurrentOrder";
import { fetchPendingOrderOfCustomer } from "./serverActions/order";
export default function HomeContent({ items }: { items: Item[] }) {
    const [searchText, setSearchText] = useState<string>("")
    // const [userInfo, setUserInfo] = useState<{ name: string; phone: string } | null>(null);
    const { user, setUser } = useContext(UserContext)
    const { order, createOrder } = useContext(OrdersContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedUser = localStorage.getItem("userInfo");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false)
    }, []);
    // useEffect(() => {
    //     if (user?.id) {
    //         fetchAllCustomerOrders(user.id);
    //     }
    // }, [user.id]);
    useEffect(() => {
        async function fetchOrder() {
            const pendingOrder = await fetchPendingOrderOfCustomer(user?.id)
            console.log(`Pending order fetched from db-`, pendingOrder)
            if (pendingOrder) {

                createOrder(pendingOrder)
            }
        }
        if (user.id) {
            fetchOrder()
        }
    }, [user.id])
    // console.log(`SearchText state in HomeContent = ${searchText}`)
    const bestsellers = items?.filter(item => item.isBestseller)
    return (
        <div className="flex flex-col gap-3 md:hidden">
            <Header setSearchText={setSearchText} searchText={searchText} />
            {!loading && !user.id && <UserModal onSave={(id, name, phone) => setUser({ id, name, phone })} />}
            {order.items.length > 0 && <CurrentOrders order={order} />}
            {searchText && <SearchResults onLoad={() => { }} query={searchText} items={items} />}
            {!searchText && <BestSellers items={bestsellers} />}
            {!searchText && <Categories items={items} />}


            <CartButton />
        </div>
    )
}
