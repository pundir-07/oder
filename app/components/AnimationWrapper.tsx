"use client"; // ✅ Ensure this is a Client Component

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function AnimationWrapper({ children }: { children: ReactNode }) {
    const pathname = usePathname(); // Get the current route

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 1, y: 0 }}
                // animate={{ opacity: 1, y: 0 }}
                exit={pathname === "/welcome-page" ? { opacity: 0, scale: 0.7 } : { opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
