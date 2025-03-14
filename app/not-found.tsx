
"use client";
import dynamic from "next/dynamic";
import React from "react";
import notFoundAnimation from "@/public/lottie/404.json";

// Dynamically import Lottie without SSR
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function NotFound() {
    return (
        <div className="sm:hidden w-full h-screen flex items-center justify-center">
            <Lottie animationData={notFoundAnimation} />
        </div>
    );
}
