"use client"
import Lottie from 'lottie-react'
import React from 'react'
import notFoundAnimation from "@/public/lottie/404.json"
export default function NotFound() {
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <Lottie animationData={notFoundAnimation} />
        </div>
    )
}
