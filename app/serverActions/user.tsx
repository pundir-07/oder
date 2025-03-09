import { User } from "../types/user";
import { createClient } from "../utils/supabase/client";


const supabase = await createClient()
export async function createUser(user: User) {

    try {
        if (user.name.length < 3) {
            throw new Error("Invalid Name. Name should be atleast 4 letters")
        }
        if (!isValidPhoneNumber(user.phone)) {
            throw new Error("Invalid Phone Number")
        }
        user.name = user.name.charAt(0).toUpperCase() + user.name.slice(1)
        console.log("Creating new user...")
        const { data } = await supabase.from('customers').insert(user).select("*")
        return data?.[0]
    } catch (error) {
        console.log(error)
    }
}

export async function checkUser(phone: string) {
    try {
        const { data } = await supabase.from("customers").select("id,name,phone").eq("phone", phone).limit(1)
        if (data) {
            console.log(data)
            return data[0]
        }
    } catch (error) {
        console.log(error)
    }
}

function isValidPhoneNumber(phone: string): boolean {
    return /^[0-9]{10}$/.test(phone);
}