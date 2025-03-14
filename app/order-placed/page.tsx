"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import successAnimation from "@/public/lottie/success.json";

export default function Page() {
    const router = useRouter();
    const [exit, setExit] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setExit(true);
            router.replace("/home");
        }, 2000);
        return () => {
            clearTimeout(timer);
        };
    }, [router]);

    return (
        <div
            className={`sm:hidden w-full h-screen flex flex-col items-center justify-center bg-gray-100 transition-all ease-in-out duration-700 ${exit ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
                }`}
        >
            <div>
                <Lottie animationData={successAnimation} loop={false} className="w-40 h-40" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 transition-all duration-500 translate-y-2 ease-in-out opacity-0 animate-fadeIn">
                Order placed
            </h1>
        </div>
    );
}
