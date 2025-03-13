import { Review } from "../types/review";
import { createClient } from "../utils/supabase/client";

const supabase = createClient();

export async function addReview(review: Review) {
  try {
    const { data, error } = await supabase
      .from("reviews")
      .insert({
        item_id: review.itemId,
        customer_id: review.customerId,
        rating: review.rating,
        review: review.review,
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
