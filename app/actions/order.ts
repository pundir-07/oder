import { CartItem } from "../types";
import { Order } from "../types/order";
import { createClient } from "../utils/supabase/client";

const supabase = createClient();

export async function createOrderInDatabase(
  items: CartItem[],
  customerId: string | undefined
) {
  await finishPendingOrdersOfCustomer(customerId);
  const orderValue = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  try {
    const { data, error } = await supabase
      .from("orders")
      .insert({ customer_id: customerId, value: orderValue, status: "PENDING" })
      .select("*");
    if (error) {
      throw new Error("Error Creating Order in the database");
    }
    const createdOrder = data?.[0] as Order;
    const orderItems = items.map((item) => {
      return {
        item_id: item.id,
        order_id: createdOrder.id,
        price: item.price,
        quantity: item.quantity,
      };
    });
    await supabase.from("order_items").insert(orderItems);
    await supabase.from("payments").insert({
      order_id: createdOrder.id,
      status: "PENDING",
      method: "UPI",
      value: orderValue,
    });
    console.log("Order created Successfully in DB");
    const newOrder = {
      id: createdOrder.id,
      items: items,
      isPaid: false,
      value: orderValue,
    };
    return newOrder as Order;
  } catch (error) {
    console.log(error);
  }
  return null;
}

export async function fetchTenCustomerOrders(
  customerId: string,
  start: number,
  end: number
) {
  try {
    const { data } = await supabase
      .from("orders")
      .select("id,value,status,created_at,rating,is_paid")
      .eq("customer_id", customerId)
      .order("created_at", { ascending: false })
      .range(start, end);

    if (!data) {
      throw new Error("Error fetching all cutomer orders from DB");
    }
    const orders: Order[] = data.map((o) => {
      return {
        ...o,
        createdAt: o.created_at,
        items: [],
        isPaid: o.is_paid,
        countDown: 0,
      };
    });
    // console.log("Fetched 10 customer orders:::::::::::::::::::::", orders);
    const orderIds: string[] = [];
    orders.forEach((o) => {
      orderIds.push(o.id);
    });

    const { data: orderItems } = await supabase
      .from("order_items")
      .select("item_id,quantity,price,order_id,items(name)")
      .in("order_id", orderIds);

    const { data: items, error } = await supabase.from("items").select("*");
    if (error) {
      throw new Error("Error fetching items for items map for all orders");
    }
    const itemsMap = new Map();
    items?.forEach((i) => {
      itemsMap.set(i.id, i.name);
    });
    // console.log("Order items for orderids--", orderItems);

    const finalOrders = orders.map((order) => ({
      ...order,
      items: (orderItems || []) // Ensures orderItems is always an array
        .filter((oi) => oi.order_id === order.id) // No need for `?.`
        .map((oi) => ({
          id: oi.item_id,
          quantity: oi.quantity,
          price: oi.price,
          name: itemsMap.get(oi.item_id),
        })),
      rating: order.rating,
    }));

    // console.log("Final Orders object-=-=-=-==....>>>", finalOrders);
    return finalOrders;
  } catch (error) {
    console.log(error);
  }
}

export async function finishPendingOrdersOfCustomer(
  customerId: string | undefined
) {
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
    console.log(error);
  }
  return false;
}

export async function fetchPendingOrderOfCustomer(customerId: string) {
  if (!customerId) {
    return;
  }
  try {
    const { data: currentOrder, error } = await supabase
      .from("orders")
      .select("id,value,order_items(item_id,quantity,price),created_at,is_paid")
      .eq("customer_id", customerId)
      .eq("status", "PENDING")
      .single();
    if (error) {
      throw new Error("Error fetching pending Order");
    }
    const orderTime = new Date(currentOrder.created_at);
    const expiryTime = new Date(orderTime.getTime() + 1 * 60 * 1000); // Add 10 minutes
    const now = new Date();
    const timeDiff = Math.max(
      Math.floor((expiryTime.getTime() - now.getTime()) / 1000),
      0
    ); // Avoid negative values

    const itemIds = currentOrder.order_items.map((item) => {
      return item.item_id;
    });

    const { data: items } = await supabase
      .from("items")
      .select("*") // Select all columns or specify required columns
      .in("id", itemIds);

    items?.forEach((item) => {
      const orderItem = currentOrder.order_items.find(
        (i) => i.item_id == item.id
      );
      item.quantity = orderItem?.quantity;
    });
    const pendingOrder = {
      id: currentOrder.id,
      items: items,
      isPaid: currentOrder.is_paid,
      value: currentOrder.value,
      countDown: timeDiff,
    };
    console.log(`pending order--`, pendingOrder);
    return pendingOrder as Order;
  } catch (error) {
    console.log(error);
  }
}

export async function closeOrderInDatabase(orderId: string) {
  try {
    const { error } = await supabase
      .from("orders")
      .update({ status: "COMPLETED" })
      .eq("id", orderId);
    if (error) {
      throw new Error("Error closing the order in the database");
    }
    return true;
  } catch (error) {
    console.log(error);
  }
}

export async function processPaymentDB(orderId: string) {
  try {
    const { error } = await supabase
      .from("payments")
      .update({ status: "PAID" })
      .eq("order_id", orderId)
      .single();
    if (error) {
      return { success: false, error: error };
    }

    return { success: true, error: null };
  } catch (error) {
    console.log(error);
  }
  return { success: false, error: "Payment Error" };
}
