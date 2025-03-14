"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../types/user";

interface UserContextType {
    user: User;
    setUser: (user: User) => void;
    removeUser: () => void,
    loading: boolean
}

// Create context with a more explicit type
export const UserContext = createContext<UserContextType>({
    user: {
        id: "",
        name: "",
        phone: "",
    },
    setUser: () => { },
    removeUser: () => { },
    loading: true
});

export default function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUserState] = useState<User>({ id: "", name: "", phone: "" });
    const [loading, setLoading] = useState(true)
    // console.log("USER CONTEXT RUN , current user--", user)
    useEffect(() => {
        if (localStorage.getItem("user")) {
            const existingUser = JSON.parse(localStorage.getItem("user") || "")
            // console.log("<---Found user inlocal storage setting user context--->")
            setUserState(existingUser)
        }
        setLoading(false)
    }, [])
    function setUser(u: User) {
        // console.log("SEtting local storage user ...", u)
        localStorage.setItem("user", JSON.stringify(u))
        setUserState(u)
    }
    function removeUser() {
        setLoading(true)
        localStorage.removeItem("user")
        setUserState({
            id: "",
            phone: "",
            name: ""
        })
        setLoading(false)
    }
    return (
        <UserContext.Provider value={{ user, setUser, removeUser, loading }}>
            {children}
        </UserContext.Provider>
    );
}
