'use client'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { User } from 'next-auth'
import { Button } from './ui/button'
import { redirect } from 'next/navigation'
 
 
const Navbar = () => {

    const {data: session} = useSession();
    const user : User = session?.user as User;

   return (
     <nav className='p-4 md:p-6 shadow-md bg-lime-50'>
        <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
            <a className='text-xl font-bold mb-4 md:mb-0' href="/">Anony Message</a>
            {
                session? (
                    <>
                    <span className='mr-4 font-semibold'>Welcome, {user?.username || user?.email}</span>
                    <div className='flex gap-3'><Button onClick={()=>(redirect(`/dashboard`))}>Dashboard </Button>
                    <Button className='w-full md:w-auto' onClick={()=>signOut()}>Logout</Button></div>
                    
                    </>
                ) : (<Link href='/sign-in'>
                    <Button className='w-full md:w-auto'>Login</Button>
                </Link>)
            }
        </div>
     </nav>
   )
 }
 
 export default Navbar