
import React from 'react'
import Image from 'next/image'
import { useCart } from '../context/CartContext'
import { useProductContext } from '../context/ProductContext'
import { useCartContext } from '../context/CartContext'
import { BsFillEyeFill } from 'react-icons/bs'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios';
import { ActionCodeOperation } from 'firebase/auth'

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
    const { cart } = state;
    const { products } = useProductContext();

    const inCart = cart.find(item => item.product.id === product.id);

    // console.log(inCart)

    const removeFromCart = () => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: product })
        getGrandTotal()
    }
    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product })
        getGrandTotal()
    }

    const getGrandTotal = () => {
        dispatch({ type: 'CALCULATE_GRAND_TOTAL' })
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
                    <button className={inCart ? "bg-blue-400 text-white text-xl h-11 w-11" : "bg-rose-400 text-white text-xl h-11 w-11 "}
                        onClick={() => {
                            if (inCart) {
                                removeFromCart({ product })

                            } else {
                                addToCart({ product });
                            }
                        }}>
                        {inCart ? "-" : "+"}
                    </button>
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
