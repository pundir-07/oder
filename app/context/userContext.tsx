"use client"
import { createContext, ReactNode, useState } from "react";
import { User } from "../types/user";

const initialUserContext = {
    user: { id: "", name: "", phone: "" }, // Ensure it matches the User type
    setUser: (user: User) => { },
};

export const UserContext = createContext(initialUserContext);

export default function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User>({ id: "", name: "", phone: "" });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
