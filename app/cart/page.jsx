'use client'
import React from 'react';
import { CartContext, useCart, useContext } from '../context/CartContext';
import CartProduct from '../components/CartProduct';
import { UserAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

import { saveOrderToFirestore } from '../firebase';

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(publishableKey);

const Cart = () => {
    const { state, grandTotal } = useCart();
    const { user, googleSignIn, logOut } = UserAuth()
    // const { cart } = state;

    // const { totalQuantity } = useCart();
    // console.log(totalQuantity)
    // console.log(user.uid)
    // let id = user.id
    // let order = state.cart

    const createCheckOutSession = async () => {
        const stripe = await stripePromise;
        const checkoutSession = await axios.post('/api/create-stripe-session',
            {
                items: state.cart
            });

        //redirect user/customer to Stripe checkout
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id,
        });
        if (result.error) alert(result.error.message);


    };

    const handleClick = () => {
        createCheckOutSession();
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
                <button
                    className="cursor-pointer bg-black text-white py-2 px-6"
                    role="link"
                    onClick={handleClick}>
                    Check out
                </button>
                {/* <button
                    onClick={saveOrderToFirestore(user.id, state.cart)}
                    className="cursor-pointer bg-red-500 text-white py-2 px-6">
                    Test
                </button> */}
            </div>


        </div>
    )
}

export default Cart
