"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { motion } from "framer-motion"
export default function Page() {
    const router = useRouter()
    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace("/order-history")
        }, 800)
        return () => { clearTimeout(timer) }
    }, [])
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            {/* <Lottie animationData={ratingAnimation} loop={false} className="w-40 h-40 " /> */}
            <motion.div

                animate
            >
                <p className="text-2xl font-bold text-gray-800 transition-all duration-500 translate-y-16  ease-in-out opacity-0 scale-110 animate-fadeIn">Thanks for your feedback!</p>
            </motion.div>
        </div>
    )
}
