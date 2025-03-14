"use client"
import React, { ReactNode, useContext, useEffect } from 'react'
import { UserContext } from '../context/userContext'
import { useRouter } from 'next/navigation'

export default function Layout({ children }: { children: ReactNode }) {
    const { user, loading: userLoading } = useContext(UserContext)
    const router = useRouter()
    useEffect(() => {
        if (!userLoading && !user.id) {
            console.log('Home layout USEeFFECT----navigating now to login')
            router.push("/login")
        }
    }, [user.id, userLoading, router])


    return (
        <div>
            {children}
        </div>
    )
}
