
"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserAuth } from '../context/AuthContext';


const Navbar = () => {
    const { user, googleSignIn, logOut } = UserAuth()
    const [loading, setLoading] = useState(true);

    const handleSignIn = async () => {
        try {
            await googleSignIn()
        } catch (error) {
            console.log(error)
        }
    }

    const handleSignOut = async () => {
        try {
            await logOut()
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            await new Promise((resolve) => setTimeout(resolve, 50))
            setLoading(false)
        }
        checkAuth();

    }, [user])

    // let display = (user.displayName)
    // console.log(display)
    // console.log(display.split(''))

    return (

        <div className="p-2 w-full flex items-center justify-between fixed top-0 bg-transparent text-white z-20">
            <ul className='flex'>
                <li className='p-2 cursor-pointer'>
                    <Link href='/'>Home</Link>
                </li>
                <li className='p-2 cursor-pointer'>
                    <Link href='/profile'>Profile</Link>
                </li>
            </ul>
            {loading ? null : !user ? (<ul className='flex'>
                <li onClick={handleSignIn} className='p-2 cursor-pointer'>
                    Login
                </li>
                <li onClick={handleSignIn} className='p-2 cursor-pointer'>
                    Sign up
                </li>
            </ul>) : (
                <div>
                    <p>welcome, {user.displayName.split('')[0]}</p>
                    <p className="cursor-pointer" onClick={handleSignOut}>Log Out</p>
                </div>
            )}


        </div>
    )
}

export default Navbar

