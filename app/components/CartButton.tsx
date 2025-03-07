"use client";
import { CartContext } from "@/app/context/cartContext";
import { Button } from "@/app/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/app/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { useContext } from "react";
import CartSummary from "./CartSummary";


export default function CartButton() {
    const { count, items } = useContext(CartContext);
    return (
        <Sheet>
            {/* Floating Button to open the drawer */}
            <SheetTrigger asChild>
                <Button
                    variant="default"
                    size="icon"
                    className="fixed bottom-6 right-6 w-14 h-14 rounded-xl shadow-lg bg-black text-white hover:bg-primary/80 transition"
                >
                    <ShoppingCart color="white" width={25} height={25} />
                    <p className="text-lg text-white">{count}</p>
                </Button>
            </SheetTrigger>

            {/* Bottom Drawer */}
            <SheetContent side="bottom" className="p-6">
                <SheetTitle className="text-3xl mb-6">
                    Cart Summary
                </SheetTitle>
                <CartSummary items={items} />
            </SheetContent>
        </Sheet>
    );
}
