'use client'

import React from 'react'
import { useRouter } from "next/navigation";


interface ButtonProps {
    text: string;
    href?: string;
}
const ConnectButton = ({ text, href }: ButtonProps) => {
    const router = useRouter();

    const handleClick = () => {
        if (href) {
            router.push(href);
        }
    };

    return (
        <button onClick={handleClick} className="w-full border border-blue-600 text-blue-600 px-6 py-3 rounded-full mb-20 hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out font-(family-name:--font-ibm-plex)">
            {text}
        </button>
    )
}

export default ConnectButton