'use client'
import React, { useState } from 'react';
import { CartContext, useCart, useContext } from '../context/CartContext';
import CartProduct from '../components/CartProduct';
import { UserAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { firestore } from '../firebase';
import { collection, addDoc, doc, updateDoc, arrayUnion, serverTimestamp } from '@firebase/firestore';

import { saveOrderToFirestore } from '../firebase';
import { newCollection } from '../firebase';
import { getDoc } from 'firebase/firestore';


const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(publishableKey);

//demo function for adding data to firestore
// async function addDataToFirestore(name, email, order) {
//     try {
//         const docRef = await addDoc(collection(firestore, "orders"), {
//             name: name,
//             email: email,
//             order: order,
//         });
//         console.log("Document written with ID: ", docRef.id);
//         return true;
//     } catch (error) {
//         console.error("Error adding document ", error)
//         return false;
//     }
// }


const Cart = () => {
    const { state, grandTotal } = useCart();
    const { user, googleSignIn, logOut, signInWithGoogle } = UserAuth()

    // console.log(user.uid)



    //demo state for firestore function
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [order, setOrder] = useState("");




    const storeCart = () => {
        let order = JSON.stringify(state)
        localStorage.setItem("order", order)
    }

    const createCheckOutSession = async () => {

        const stripe = await stripePromise;
        const checkoutSession = await axios.post('/api/create-stripe-session',
            {
                items: state.cart,
            });

        //redirect user/customer to Stripe checkout
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id,
        });

        if (result.error) {
            alert(result.error.message)
        } else {
            alert('success')
        }



    };

    const handleClick = () => {
        if (!user) {
            window.alert('You must be signed in to do that')
        } else {
            storeCart()
            createCheckOutSession();
        }


    }

    return (
        <div className="my-24 m-6">
            <h1>This is your shopping cart</h1>
            {/* <p>Total items: {totalQuantity}</p> */}
            <div className="container">
                <ul className="flex flex-col gap-6 my-6">
                    {state.cart.map((product) => (
                        <CartProduct
                            id={product.id}
                            product={product}
                        />

                    ))}
                </ul>
                <h1 className="mb-6">Total: ${grandTotal}</h1>
                <div className="flex flex-col gap-3">
                    <button
                        className="cursor-pointer bg-black text-white py-2 px-6"
                        role="link"
                        onClick={handleClick}>
                        Check out
                    </button>
                    {/* <button
                    onClick={saveOrderToFirestore(user.id, state.cart)}
                    className="cursor-pointer bg-rose-400 text-white py-2 px-6">
                    Test
                </button> */}
                    {/* <button
                        className="bg-rose-400 py-2"
                        onClick={placeOrder}>
                        test
                    </button> */}
                </div>



            </div>

            {/* <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'>
                        Name:
                    </label>
                    <input
                        type='text'
                        id='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='email'>
                        Email:
                    </label>
                    <input
                        type='text'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='order'>
                        Order:
                    </label>
                    <textarea
                        rows={5}
                        id='order'
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}>

                    </textarea>


                </div>
                <button className='text-center text-white bg-black p-3 rounded-sm'>
                    Submit
                </button>
            </form> */}


        </div>
    )
}

export default Cart
