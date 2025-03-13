import React from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'

export default function Button_WL({ loading, text, fullWidth = false, onClick }: { loading: boolean, text: string, fullWidth?: boolean, onClick: () => void }) {
    return loading ? <Button className={`${fullWidth ? "w-full" : ""}`} onClick={onClick}><Loader2 className='w-8 h-8 animate-spin text-white' /></Button> :
        <Button className={`${fullWidth ? "w-full" : ""}`} onClick={onClick}>{text}</Button>



}
