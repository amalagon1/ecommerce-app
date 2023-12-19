'use client'
import { useEffect } from 'react'
import { BsCheckCircleFill } from 'react-icons/bs'
import { UserAuth } from '../context/AuthContext';
import { firestore } from '../firebase';
import { CartContext, useCart, useContext } from '../context/CartContext';
import { collection, addDoc, doc, updateDoc, arrayUnion, serverTimestamp, getDoc } from '@firebase/firestore';
import Link from 'next/link';
import { signOut, onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase";
import { get } from 'mongoose';


const page = () => {
    const { state, grandTotal } = useCart();
    const { user, setUser, googleSignIn, logOut, signInWithGoogle } = UserAuth()

    console.log(user)


    // useEffect(() => {
    //     const storedOrder = localStorage.getItem('order');
    //     if (storedOrder) {
    //         const orderData = JSON.parse(storedOrder);
    //         sendToFirestore(orderData, user)
    //         let ID = user?.uid
    //         console.log(ID)
    //     } else {
    //         console.error('No order data found!')
    //     }
    // }, []);

    const getOrder = () => {
        const storedOrder = localStorage.getItem('order');
        if (storedOrder) {
            const orderData = JSON.parse(storedOrder);
            sendToFirestore(orderData, user)
            let ID = user?.uid
            console.log(ID)
        } else {
            console.error('No order data found!')
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        console.log('User object:', user);
        getOrder()
        // console.log('User ID:', user?.uid);
        return () => unsubscribe()


    }, [user])


    const sendToFirestore = async (orderData, user) => {
        let currentDate = new Date()
        try {
            const userDocRef = doc(firestore, 'users', user.uid);


            await updateDoc(userDocRef, {
                orders: arrayUnion(
                    {
                        ...orderData,
                        timestamp: currentDate.toDateString()

                    }
                ),
            });

            console.log('Order placed successfully!');
        } catch (error) {
            console.error('Error placing order:', error.message);
        }
    };


    return (
        <div className="bg-gray-100 h-screen">
            <main className="max-w-screen-lg mx-auto my-14">
                <div className="flex flex-col p-10 bg-white">
                    <div className="flex items-center space-x-2 mb-5">
                        <BsCheckCircleFill className="text-green-500 text-3xl" />
                        <h1 className="text-3xl">
                            Thank you, your order has been placed!
                        </h1>
                    </div>
                    <p>Thank you for shopping with us. We'll send a confirmation once the item has been shipped. If you would like to check the status of your order(s) please click the link below.</p>
                    <Link href="/orderHistory">
                        <button className="mt-8">Got to my orders</button>
                    </Link>


                </div>

            </main>

        </div>
    )
}

export default page
