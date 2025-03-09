"use client";
import { createContext, ReactNode, useState } from "react";
import { User } from "../types/user";

interface UserContextType {
    user: User;
    setUser: (user: User) => void;
}

// Create context with a more explicit type
export const UserContext = createContext<UserContextType>({
    user: {
        id: "",
        name: "",
        phone: "",
    },
    setUser: () => { }
});

export default function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User>({ id: "", name: "", phone: "" });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
