import { createClient } from "@/app/utils/supabase/server";
import { Item } from "../types";

export default async function getItems(): Promise<Item[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("items").select("*");
  if (error) {
    console.log(`Error fetching items from supabase`, error);
    return [];
  }
  const parsedData = data.map((item) => {
    return {
      ...item,
      rating: item.rating?.toFixed(1),
      ratingCount: item.rating_count,
      createdAt: new Date(item.created_at).getTime(),
    };
  });
  console.log(
    `Successfully fetched items from supabase. Items found- `,
    parsedData
  );
  return parsedData as Item[];
}
