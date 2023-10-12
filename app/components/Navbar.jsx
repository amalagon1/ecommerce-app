
"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserAuth } from '../context/AuthContext';
import { RiShoppingCartLine } from 'react-icons/ri';
import { useCartContext } from '../context/CartContext';


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
                <div className='flex gap-5 items-center'>
                    {/* <Link href="/Cart">
                        <div className="text-xl cursor-pointer relative">
                            <RiShoppingCartLine />
                            <div className="absolute p-2 -right-1 -bottom-2 bg-red-600 h-3.5 w-3.5 rounded-full flex items-center justify-center">
                                <p className="text-sm">0</p>
                            </div>
                        </div>
                    </Link> */}

                    <div>
                        <p>welcome, {user.displayName.split('')[0]}</p>
                    </div>
                    <div><button className="cursor-pointer bg-rose-400 p-1.5 rounded" onClick={handleSignOut}>Log Out</button></div>

                </div>
            )}


        </div>
    )
}

export default Navbar

