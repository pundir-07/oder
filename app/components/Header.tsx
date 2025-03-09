"use client"
import React, { useContext, useRef, useState } from 'react'
import { Input } from './ui/input'
import Image from 'next/image'
import { X, User } from "lucide-react"
import { UserContext } from '../context/userContext'
export default function Header({ setSearchText, searchText }: { setSearchText: (text: string) => void, searchText: string }) {
    const [focus, setFocus] = useState(false)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const headerRef = useRef<HTMLElement | null>(null)
    const { user } = useContext(UserContext);

    const showCross = focus && searchText?.length > 0;
    console.log(`Header rerender searchText = ${searchText} showCross value = ${showCross}`)
    const handleFocus = () => {
        setFocus(true);
        setTimeout(() => {
            if (inputRef.current) {
                const inputPosition = inputRef.current.getBoundingClientRect().top;
                console.log(`Scroll lebel---`, window.scrollY)
                const targetPosition = window.scrollY + inputPosition - 10; // Adjust this value for fine-tuning
                window.scrollTo({ top: targetPosition, behavior: "smooth" });
            }
        }, 200); // Delay for smooth effect
    };
    return (
        <header ref={headerRef} className=" relative flex flex-col justify-end p-5 bg-[url('/images/background.jpg')] bg-cover bg-center rounded-bl-3xl rounded-br-3xl">
            <div className="absolute z-0 inset-0 bg-black/50 rounded-b-3xl">

            </div>
            <div className="relative  w-full z-10 flex justify-between items-center">

                <Image alt='logo' src="/images/logo.jpg" width={150} height={150} className='rounded-full my-4' />
                <div className='relative flex items-end'>
                    <p className='text-white absolute top-1 right-8'>{user?.name}</p>
                    <User size={25} color='white' />
                </div>
            </div>
            <div className="relative z-10">
                <Input placeholder='Search' ref={inputRef} className='text-white ' onChange={(e) => setSearchText(e.target.value)} onFocus={handleFocus} value={searchText} onBlur={() => setTimeout(() => setFocus(false), 200)} />
                <div className='absolute flex items-center justify-center w-8 h-full right-0 top-0 '>
                    {showCross && <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSearchText(""); inputRef.current?.focus(); setTimeout(() => setFocus(true), 300) }}>
                        <X size={20} color='white' />
                    </button>}

                </div>
            </div>
        </header>
    )
}
