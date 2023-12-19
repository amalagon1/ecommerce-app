import React, { useState } from 'react'
import { UserAuth } from '../context/AuthContext';
import { RxCaretDown } from "react-icons/rx";
import Link from 'next/link';

const DropdownBtn = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { user, googleSignIn, logOut, signInWithGoogle } = UserAuth()

    const handleMouseEnter = () => {
        setTimeout(() => {
            setIsDropdownOpen(true);
        }, 200);

    };

    const handleMouseLeave = () => {
        setIsDropdownOpen(false);
    };

    const handleSignOut = async () => {
        try {
            await logOut()
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Button and Dropdown Menu Container */}
            <div className="group">
                {/* Button */}
                <button className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                    <div className="flex flex-row gap-2 items-center">
                        <p>welcome, {user.displayName.split('')[0]}</p>
                        <RxCaretDown className="text-xl" />
                    </div>

                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <div className="absolute z-10bg-white rounded-md shadow-lg">
                        <ul className="py-1">
                            <li>
                                <Link className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                    href='/orderHistory'>
                                    Order History
                                </Link>
                                {/* <a
                                    href="#"
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                >
                                    Order History
                                </a> */}
                            </li>
                            <li>
                                <button
                                    onClick={handleSignOut}
                                    className="block px-4 py-2 w-full text-gray-800 hover:bg-gray-200">
                                    <p>Log Out</p>
                                </button>

                            </li>
                            {/* Add more options as needed */}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DropdownBtn
