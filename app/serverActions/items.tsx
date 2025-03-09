
import { createClient } from "@/app/utils/supabase/server";
import { Item } from "../types";


export default async function getItems(): Promise<Item[]> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("items").select("*");
    if (error) {
        console.log(`Error fetching items from supabase`, error)
        return []
    }
    console.log(`Successfully fetched items from supabase. No of items found- ${data.length}`)
    return data as Item[];
}