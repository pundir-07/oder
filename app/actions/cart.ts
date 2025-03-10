import { CartItem } from "../types";
import { createClient } from "../utils/supabase/client";

const supabase = createClient();

export async function fetchCartItemsDB(customerId: string) {
  try {
    // Fetch cart items for the given customer
    console.log("Fetching cart items from DB...");
    const { data: cartData, error: cartError } = await supabase
      .from("cart_items")
      .select("item_id, quantity")
      .eq("customer_id", customerId);

    if (cartError) {
      console.error("Error fetching cart items:", cartError);
      throw new Error(cartError.message);
    }

    if (!cartData || cartData.length === 0) {
      return []; // Return empty array if the cart is empty
    }

    // Extract item IDs
    const itemIds = cartData.map((item) => item.item_id);

    // Fetch item details from "items" table
    const { data: items, error: itemsError } = await supabase
      .from("items")
      .select("*")
      .in("id", itemIds);

    if (itemsError) {
      console.error("Error fetching item details:", itemsError);
      throw new Error(itemsError.message);
    }

    // Combine cart quantity with item details
    const cartItems: CartItem[] = items.map((item) => {
      const cartItem = cartData.find((c) => c.item_id === item.id);
      return {
        ...item,
        quantity: cartItem?.quantity || 0,
      };
    });

    console.log("Fetching cart items from DB.....#Success");
    return cartItems;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return []; // Return an empty array instead of `undefined` in case of failure
  }
}

export async function addItemToCartDB(itemId: number, customerId: string) {
  try {
    console.log("Adding cart item to Db....");

    // Fetch existing cart item safely
    const { data: existingItem, error: fetchError } = await supabase
      .from("cart_items")
      .select("*")
      .eq("customer_id", customerId)
      .eq("item_id", itemId)
      .maybeSingle(); // ✅ Prevents "PGRST116" error

    if (fetchError) {
      throw new Error("Error fetching cart item from database");
    }

    if (existingItem) {
      // If item exists, update its quantity
      const { data, error: updateError } = await supabase
        .from("cart_items")
        .update({ quantity: existingItem.quantity + 1 })
        .eq("item_id", existingItem.item_id)
        .eq("customer_id", existingItem.customer_id) // ✅ Fix: Corrected key name
        .select("*")
        .maybeSingle(); // ✅ Prevents errors if update returns nothing

      if (updateError) {
        throw new Error("Error updating cart item in database");
      }

      return { success: true, updatedItem: data };
    } else {
      // If item does not exist, insert it
      const { data, error: insertError } = await supabase
        .from("cart_items")
        .insert({ customer_id: customerId, item_id: itemId, quantity: 1 })
        .select("*")
        .maybeSingle(); // ✅ Ensures safe return

      if (insertError) {
        throw new Error("Error inserting cart item in database");
      }

      console.log("Adding cart item to Db.......#success");
      return { success: true, newItem: data };
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error occurred";
    console.error(errorMessage);
    return { success: false, error: errorMessage };
  }
}

export async function removeItemFromCartDB(itemId: number, customerId: string) {
  try {
    // Fetch the current quantity before updating
    const { data: cartItem, error: fetchError } = await supabase
      .from("cart_items")
      .select("quantity")
      .eq("customer_id", customerId)
      .eq("item_id", itemId)
      .single();

    if (fetchError || !cartItem) {
      throw new Error("Error fetching cart item from database");
    }

    const currentQuantity = cartItem.quantity;

    if (currentQuantity <= 1) {
      // Remove item if quantity is 1
      const { error: deleteError } = await supabase
        .from("cart_items")
        .delete()
        .eq("customer_id", customerId)
        .eq("item_id", itemId);

      if (deleteError) {
        throw new Error("Error deleting cart item from database");
      }

      return { success: true, deleted: true };
    } else {
      // Decrease quantity if more than 1
      const { data, error: updateError } = await supabase
        .from("cart_items")
        .update({ quantity: currentQuantity - 1 })
        .eq("customer_id", customerId)
        .eq("item_id", itemId)
        .select("*")
        .single();

      if (updateError) {
        throw new Error("Error decreasing cart item in database");
      }

      return { success: true, deleted: false, updatedItem: data };
    }
  } catch (error) {
    console.error("Failed to Remove Item from cart DB");
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error occured";
    return { success: false, error: errorMessage };
  }
}

export async function clearCartDB(customerId: string) {
  try {
    const { data, error } = await supabase
      .from("cart_items")
      .delete()
      .eq("customer_id", customerId)
      .select(); // Select returns the deleted records (optional)

    if (error) {
      throw new Error("Error clearing cart in database: " + error.message);
    }

    return { success: true, deletedItems: data || [] };
  } catch (error: unknown) {
    console.error("Failed to clear cart:", error);

    // Ensure error is an instance of Error before accessing `message`
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return { success: false, error: errorMessage };
  }
}
