"use client"
import React, { useEffect } from 'react'
import LoginForm from '../components/LoginForm'
import Lottie from 'lottie-react'
import foodAnimation from "@/public/lottie/food.json"
export default function Login() {
    useEffect(() => {
        console.log('Page render Login')
    }, [])
    console.log("Login PAGE render")
    return (
        <div className="w-full h-screen flex flex-col justify-center bg-[url('/images/background.jpg')] bg-cover 
        bg-center">

            <div className="m-2 p-1 bg-white rounded-xl pb-7 ">
                <div className="flex justify-center relative bottom-12">

                    <Lottie animationData={foodAnimation} loop={true} className='w-40 h-40' />
                </div>
                <div className="flex justify-center relative bottom-8">
                    <h1 className="text-2xl">Welcome to The Cuisine!</h1>
                </div>
                <LoginForm />

            </div>
        </div>
    )
}
