"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Header = () => {
    const path = usePathname();


    return (
        <div className='flex p-4 justify-between bg-secondary shadow-sm'>
            <Image src={"/logo.svg"} width={160} height={100} alt="logo" />
            <ul className='hidden md:flex gap-6'>
            <Link href="/dashboard">
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/dashboard' && 'text-primary font-bold'}`}>Dashboard</li>
                </Link>
                <Link href="/pricing">
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/pricing' && 'text-primary font-bold'}`}>Pricing</li>
                </Link>
                {/* <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/dashboard/upgrade' && 'text-primary font-bold'}`}>Upgrade</li> */}
                {/* <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/dashboard/how-it-works' && 'text-primary font-bold'}`}>How it works</li> */}
            </ul>
            <UserButton />
        </div>
    )
}

export default Header