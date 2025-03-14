import { Rating, Review } from "../types/review";
import { createClient } from "../utils/supabase/client";

const supabase = createClient();

export async function addReview(review: Review) {
  if (!review.text) {
    return;
  }
  try {
    const { data, error } = await supabase
      .from("reviews")
      .insert({
        order_id: review.orderId,
        customer_id: review.customerId,
        text: review.text,
      })
      .select("*")
      .single();
    if (error) {
      throw new Error("Error creating review in DB");
    }
    return { success: true, review: data };
  } catch (error) {
    console.log(error);
  }
  return { success: false, review: null };
}

export async function addRatings(ratings: Rating[], order_id: string) {
  const ratingsDB = ratings
    .filter((r) => r.rating && r.rating > 0 && r.rating <= 5)
    .map((r) => {
      return { item_id: r.itemId, customer_id: r.customerId, rating: r.rating };
    });
  if (ratingsDB.length <= 0) {
    return { success: false, error: "No Ratings provided" };
  }
  let orderRating = 0;
  for (const r of ratingsDB) {
    orderRating = orderRating + (r.rating || 0);
  }
  orderRating = parseFloat((orderRating / ratingsDB.length).toFixed(1));
  console.log("AVERAGE ORDER RATING ___", orderRating);
  try {
    const { data, error: createRatingError } = await supabase
      .from("ratings")
      .insert(ratingsDB)
      .select("*");
    if (createRatingError) {
      console.log(createRatingError);
      return { success: false, error: createRatingError };
    }
    const { error } = await supabase
      .from("orders")
      .update({ rating: orderRating })
      .eq("id", order_id);
    if (error) {
      return { success: false, error: error };
    }
    return { success: true, ratings: data };
  } catch (error) {
    console.log(error);
  }
  return { success: false, error: "Unknown Error" };
}

export async function fetchItemRating(itemId: number) {
  try {
    const { data, error } = await supabase
      .from("ratings")
      .select("rating")
      .eq("item_id", itemId);
    if (error) {
      throw new Error(error.message);
    }
    console.log("Ratings fetched for item ----", data);
    const sum = data.reduce((sum, curr) => {
      return sum + curr.rating;
    }, 0);
    const ratingAVG = parseFloat((sum / data.length).toFixed(2));
    console.log("Calculated Rating for item ----", ratingAVG);
    return { success: true, rating: ratingAVG };
  } catch (error) {
    console.log(error);
    return { success: false, error: error };
  }
}

export async function rateItemsWithRollback(
  order_id: string,
  ratings: Rating[]
) {
  const { error } = await supabase.rpc("rate_items_or_rollback", {
    p_order_id: order_id, // Order ID being rated
    p_ratings: JSON.stringify(ratings),
  });

  if (error) {
    console.error("Rating submission failed:", error.message);
  } else {
    console.log("✅ Ratings submitted successfully!");
  }
}
