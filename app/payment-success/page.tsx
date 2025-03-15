"use client"
import dynamic from "next/dynamic";
import React, { Suspense, useEffect, useState } from 'react'
import paymentAnimation from "@/public/lottie/payment.json"
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Loader2 } from "lucide-react";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function PaymentSuccessPage() {
    return <Suspense>
        <PaymentSuccessContent />
    </Suspense>
}
function PaymentSuccessContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [valid, setValid] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (!searchParams.get("order-id")) {
            router.push("/not-found")
            return
        }
        setValid(true)
        const timer = setTimeout(() => {
            setLoading(true)
            router.replace("/home")
        }, 2000)
        return () => { clearTimeout(timer) }
    }, [router, searchParams])
    if (!valid) {
        return null
    }
    if (loading) {
        return <div className="w-full h-screen flex items-center justify-center">
            <Loader2 className="text-green w-8 h-8 animate-spin" />
        </div>
    }
    return (
        <div className='sm:hidden w-full h-screen flex flex-col gap-2 items-center justify-center'>
            <Lottie animationData={paymentAnimation} loop={false} />
            <motion.div
                initial={{ opacity: 0, y: 70 }}
                animate={{ opacity: 100, y: 0 }}
                transition={{ y: { duration: .2, delay: .8 }, opacity: { delay: 0.8 } }}
            >

                <h2 className='text-2xl font-bold text-jade '>Payment Successful</h2>

            </motion.div>
        </div>
    )
}
