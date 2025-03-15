"use client"
import React, { useContext, useEffect } from 'react'
import welcomeAnimation from "@/public/lottie/welcome.json"
import { motion } from "framer-motion"
import { useRouter } from 'next/navigation'
import { UserContext } from '../context/userContext'
import dynamic from 'next/dynamic'

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
export default function WelcomePage() {
    const router = useRouter()
    const { user } = useContext(UserContext)
    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace("/home")
        }, 2000)
        return () => { clearTimeout(timer) }
    }, [router])
    return (


        <motion.div
            initial={{ x: 0 }}
            exit={{ x: -100 }}
            transition={{ duration: .5 }}
            key="welcome-page"
        >

            <div className='sm:hidden w-full h-screen flex flex-col justify-center items-center bg-white'>
                <Lottie animationData={welcomeAnimation} loop={false} className='w-80 h-80' />
                <motion.div
                    initial={{ opacity: 0, y: 70 }}
                    animate={{ opacity: 100, y: 0 }}
                    transition={{ y: { duration: .2, delay: .8 }, opacity: { delay: 0.8 } }}
                >
                    <p className="text-3xl text-gray-800"><span className='text-2xl'>Let&apos;s Eat</span> {user.name}!</p>

                </motion.div>
            </div>
        </motion.div>

    )
}
