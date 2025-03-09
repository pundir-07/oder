import { CartItem } from "../types";
import { Order } from "../types/order";
import { createClient } from "../utils/supabase/client";


const supabase = createClient();


export async function createOrderInDatabase(items: CartItem[], customerId: string) {
    await finishPendingOrdersOfCustomer(customerId)
    const orderValue = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    try {
        const { data, error } = await supabase.from("orders").insert({ customer_id: customerId, value: orderValue, status: "PENDING" }).select("*")
        if (error) {
            throw new Error('Error Creating Order in the database')
        }
        const createdOrder = data?.[0] as Order
        const orderItems = items.map(item => {
            return { item_id: item.id, order_id: createdOrder.id, price: item.price, quantity: item.quantity }
        })
        await supabase.from("order_items").insert(orderItems)
        await supabase.from("payments").insert({ order_id: createdOrder.id, status: "PENDING", method: "UPI", value: orderValue, })
        console.log("Order created Successfully")
        const newOrder = {
            id: createdOrder.id,
            items: items,
            isPayed: false,
            value: orderValue
        }
        return newOrder as Order
    } catch (error) {
        console.log(error)
    }
    return null
}

export async function fetchAllCustomerOrders(customerId: string) {
    try {
        const { data: orders } = await supabase.from("orders").select("id,value,status,order_items(item_id,quantity,price,items(name))").eq("customer_id", customerId)
        console.log(orders)


    } catch (error) {
        console.log(error)
    }
    return null
}

export async function finishPendingOrdersOfCustomer(customerId: string) {
    try {
        const { error } = await supabase
            .from("orders")
            .update({ status: "COMPLETED" })
            .eq("customer_id", customerId)
            .eq("status", "PENDING");

        if (error) {
            console.error("Error updating orders:", error.message);
        } else {
            console.log("Orders updated successfully!");
        }
    } catch (error) {
        console.log(error)
    }
    return false
}
export async function fetchPendingOrderOfCustomer(customerId: string) {
    try {
        const { data, error } = await supabase.from("orders").select("id,value,order_items(item_id,quantity,price,items(name))").eq("customer_id", customerId).eq("status", "PENDING").single()
        if (error) {
            throw new Error("Error fetching pending Order")
        }
        const items = data.order_items.map(item => {
            return {
                id: item.item_id,
                name: item.items.name,
                price: item.price,
                quantity: item.quantity
            }
        })
        const pendingOrder = {
            id: data.id,
            items: items,
            isPayed: false,
            value: data.value
        }
        return pendingOrder as Order
    } catch (error) {
        console.log(error)
    }
}

export async function closeOrderInDatabase(orderId: string) {
    try {
        const { data, error } = await supabase.from("orders").update({ status: "COMPLETED" }).eq("id", orderId)
        if (error) {
            throw new Error("Error closing the order in the database")
        }
        return true
    } catch (error) {
        console.log(error)
    }
}