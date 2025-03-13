"use client"
import { useRouter } from 'next/navigation'
import React, { ReactNode, useContext, useEffect } from 'react'
import { UserContext } from '../context/userContext'

export default function Loginlayout({ children }: { children: ReactNode }) {
    console.log("Login LAYOUT render")
    const { user } = useContext(UserContext)
    const router = useRouter()
    useEffect(() => {
        if (user.id) {
            router.push("/welcome-page")
        }
    }, [router, user.id])
    return (
        <div>
            {children}
        </div>
    )
}
