import { Clock } from 'lucide-react'
import React from 'react'

export default function OrderTimer() {
    return (
        <div className='px-1 w-14 flex gap-1 items-center rounded-lg bg-primary text-center  '>
            <p className='text-xs text-white font-bold'>12 m</p>
            <Clock size={10} strokeWidth={3} color='white' />
        </div>
    )
}
