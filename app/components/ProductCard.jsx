
import React from 'react'
import Image from 'next/image'
import { useCart } from '../context/CartContext'
import { useProductContext } from '../context/ProductContext'
import { useCartContext } from '../context/CartContext'
import { BsFillEyeFill } from 'react-icons/bs'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios';

const ProductCard = ({ product }) => {
    // const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
    // const stripePromise = loadStripe(publishableKey);

    // const createCheckOutSession = async () => {
    //     const stripe = await stripePromise;
    //     const checkoutSession = await axios.post('/api/create-stripe-session', {
    //         item: item,
    //     });
    //     const result = await stripe.redirectToCheckout({
    //         sessionId: checkoutSession.data.id,
    //     });
    //     if (result.error) {
    //         alert(result.error.message);
    //     }
    // };

    // const { cart } = useCartContext()
    const { state, dispatch } = useCart();
    const { products } = useProductContext();

    // const addToCart = (title, id) => {
    //     dispatch({ type: 'ADD_TO_CART', payload: product });
    // }

    const addToCart = (product) => {
        const itemIndex = state.cart.findIndex((item) => item.id === product.id);
        if (itemIndex !== -1) {
            // Product already in the cart, update the quantity
            const updatedCart = [...state.cart];
            updatedCart[itemIndex].quantity += 1;
            setState(updatedCart);
        } else {
            // Product not in the cart, add a new item
            const newItem = { ...product, quantity: 1 };
            setState([...state.cart, newItem]);
        }
    }
    return (
        <div>
            <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
                <div className='w-full h-full flex justify-center items-center'>
                    <div className="w-[200px] mx-auto flex justify-center items-center group-hover:scale-110 transition duration-300">
                        <Image
                            // layout='fill'
                            width="100"
                            height="100"
                            src={product.image}
                            alt='product photo'
                        />
                    </div>


                </div>
                <div className="absolute top-3 -right-40 group-hover:right-5 flex flex-col justify-center gap-2 items-center opacity-0 group-hover:opacity-100 transition-all duration-30">
                    <button className="bg-rose-400 text-white text-xl h-11 w-11 "
                        onClick={() => addToCart({ product })}>+</button>
                    <a className='shadow-md p-2 w-11 h-11 cursor-pointer flex justify-center items-center'><BsFillEyeFill /></a>
                </div>


            </div>
            <div>
                <div className="text-sm capitalize text-gray-500 mb-1">{product.category}</div>
                <p>{product.title}</p>
                <p>${product.price}</p>
                {/* <button className="bg-green-700 p-1 rounded pointer"
                    onClick={createCheckOutSession}>
                    Purchase
                </button> */}
            </div>
            {/* <p>Hi I'm bob!</p> */}


        </div>
    )
}

export default ProductCard
