import { User } from "../types/user";
import { createClient } from "../utils/supabase/client";

const supabase = createClient();

export async function createUser(user: User) {
  try {
    if (user.name.length < 3) {
      throw new Error("Invalid Name. Name should be atleast 4 letters");
    }
    if (!isValidPhoneNumber(user.phone)) {
      throw new Error("Invalid Phone Number");
    }
    user.name = user.name.charAt(0).toUpperCase() + user.name.slice(1);
    console.log("Creating new user...");
    const { data } = await supabase
      .from("customers")
      .insert(user)
      .select("*")
      .single();
    return { success: true, user: data as User, error: null };
  } catch (error) {
    console.log(error);
  }
  return {
    success: false,
    user: { id: "", name: "", phone: "" },
    error: "Unknown Error",
  };
}

export async function checkUser(phone: string) {
  try {
    if (!isValidPhoneNumber(phone))
      return { found: false, error: "Invalid Phone Number", user: null };
    const { data } = await supabase
      .from("customers")
      .select("*")
      .eq("phone", phone)
      .single();
    if (data) {
      console.log(data);
      const user = { id: data.id, name: data.name, phone: data.phone };
      return { found: true, error: null, user: user as User };
    }
  } catch (error) {
    console.log(error);
  }
  return {
    found: false,
    error: "Unknown Error",
    user: { id: "", name: "", phone: "" },
  };
}

function isValidPhoneNumber(phone: string): boolean {
  return /^[0-9]{10}$/.test(phone);
}
