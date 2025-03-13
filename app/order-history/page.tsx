"use client"
import React, { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import OrderHistoryItem from "../components/OrderHistoryItem";
import { Button } from "../components/ui/button";
import { fetchTenCustomerOrders } from "../actions/order";
import { Order } from "../types/order";
import LoadingSpinner from "../components/ui/loadingSpinner";

export default function OrderHistoryPage() {
    const { user, loading } = useContext(UserContext);
    const [orders, setOrders] = useState<Order[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [loadCount, setLoadCount] = useState(1);
    const [error, setError] = useState("");
    const [loadingOrders, setLoadingOrders] = useState<boolean>(true);
    const [pageLoading, setPageLoading] = useState(true)
    const router = useRouter();

    const fetchCustomerOrders = useCallback(async () => {
        console.trace("fetchCustomerOrders called----");
        if (!user.id) return;

        setLoadingOrders(true);
        setError("");

        try {
            const start = (loadCount - 1) * 10;
            const end = start + 9;

            const fetchedOrders = await fetchTenCustomerOrders(user.id, start, end);
            console.log("Fetched orders inside the ordehistory page---", fetchedOrders)
            if (!fetchedOrders) {
                throw new Error("Error fetching orders");
            }

            setOrders(prev => [...prev, ...fetchedOrders]);

            if (fetchedOrders.length < 10) {
                setHasMore(false);
            } else {
                setLoadCount(prev => prev + 1);
            }
        } catch (error) {
            console.error(error);
            setError("Failed to load order history.");
        } finally {
            setLoadingOrders(false); // ✅ Ensuring loading state is updated
        }
    }, [loadCount, user])

    useEffect(() => {

        if (!user.id && !loading) {
            router.push("/login");
            return;
        }
    }, [user.id, loading, router]);

    useEffect(() => {

        if (user.id && orders.length === 0) {
            console.log('Use effect about to fetch orders')
            fetchCustomerOrders(); // 
            setPageLoading(false)
        }
    }, [user.id, fetchCustomerOrders, orders.length])// 



    return (
        <div className="w-full min-h-screen pb-12 bg-white">
            {/* Header */}
            <div className="h-14 p-2 bg-maroon text-white text-xl font-medium text-center rounded-bl-2xl rounded-br-full flex items-center gap-6 sticky top-0">
                <ArrowLeft onClick={() => {

                    router.back()
                }
                }
                />

                <p>Order History</p>
            </div>

            {/* Order List */}

            {orders.length > 0 ? (
                <div className="px-1">
                    {orders.map(order => {
                        const date = new Date(order.createdAt);
                        const formattedDate = date.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                        });
                        return (
                            <OrderHistoryItem
                                key={order.id}
                                items={order.items}
                                orderValue={order.value}
                                date={formattedDate}
                            />
                        );
                    })}
                </div>) : (
                !loadingOrders && <p className="text-center text-gray-500 mt-10">No orders found.</p>

            )}


            {/* Load More Button */}



            {pageLoading && <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center"><LoadingSpinner /> </div>}
            {!loadingOrders && error && <p className="text-center text-gray-500 mt-10">Error Loading Orders</p>}
            <div className="mt-10 w-full flex justify-center">
                {loadingOrders && !pageLoading && <LoadingSpinner />}
                {!loadingOrders && hasMore && (
                    <Button className="w-1/2" onClick={fetchCustomerOrders}>
                        Load more
                    </Button>
                )}
            </div>
        </div>
    );
}
