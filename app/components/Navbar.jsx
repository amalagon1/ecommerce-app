
"use client"
import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { UserAuth } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { CartProvider } from '../context/CartContext';
import { RiShoppingCartLine } from 'react-icons/ri';
import Cart from '../cart/page';


const Navbar = () => {
    const { user, googleSignIn, logOut, signInWithGoogle } = UserAuth()
    const [loading, setLoading] = useState(true);

    const { clickHandler } = useContext(CartContext);
    const { state } = useContext(CartContext);



    // const itemCount = state.cart.reduce((count, item) => count + item.quantity, 0);


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

        <div className="p-2 w-full flex items-center justify-between fixed top-0 bg-gray-500 text-white z-20">
            <ul className='flex'>
                <li className='p-2 cursor-pointer'>
                    <Link href='/'>Bargain Depot</Link>
                </li>
                {/* <li className='p-2 cursor-pointer'>
                    <Link href='/profile'>Profile</Link>
                </li> */}
            </ul>
            {loading ? null : !user ? (<div className='flex gap-10 items-center'>

                <button onClick={clickHandler}>
                    <Link href="/cart">

                        <div className="text-xl cursor-pointer relative">
                            <RiShoppingCartLine />
                            <div className="absolute p-2 -right-1 -bottom-2 bg-red-600 h-3.5 w-3.5 rounded-full flex items-center justify-center">
                                <p className="text-sm">{state.cart.length}</p>
                            </div>
                        </div>
                    </Link>

                </button>
                <button
                    className="cursor-pointer bg-rose-400 px-4 py-1.5 rounded"
                    onClick={signInWithGoogle}>
                    Login
                </button>


            </div>) : (
                <div className='flex gap-5 items-center'>
                    <button onClick={clickHandler}>
                        <Link href="/cart">

                            <div className="text-xl cursor-pointer relative">
                                <RiShoppingCartLine />
                                <div className="absolute p-2 -right-1 -bottom-2 bg-red-600 h-3.5 w-3.5 rounded-full flex items-center justify-center">
                                    <p className="text-sm">{state.cart.length}</p>
                                </div>
                            </div>
                        </Link>

                    </button>

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

