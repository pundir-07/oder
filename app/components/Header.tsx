"use client"
import React, { useContext, useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { UserContext } from '../context/userContext'
import UserDropdown from './UserDropdown'
export default function Header() {
    const [entry, setEntry] = useState(false)
    const headerRef = useRef<HTMLElement | null>(null)
    const { user } = useContext(UserContext);

    useEffect(() => {
        const timer = setTimeout(() => { setEntry(true) }, 300)
        return () => { clearTimeout(timer) }
    }, [])

    return (
        <header ref={headerRef} className={`relative flex flex-col justify-end p-5 bg-[url('/images/background.jpg')] bg-cover 
        bg-center rounded-bl-3xl rounded-br-3xl transition-all ease-in-out duration-500 ${entry ? " " : " "}`} >
            <div className="absolute z-0 inset-0 bg-black/50 rounded-b-3xl">

            </div>
            <div className="relative  w-full z-10 flex justify-between items-center">

                <Image alt='logo' src="/images/logo.jpg" width={150} height={150} className='rounded-full my-4' />
                <div className='relative flex items-end'>
                    <p className='text-white absolute top-1 right-8'>{user?.name}</p>
                    <UserDropdown />
                </div>
            </div>

        </header>
    )
}
