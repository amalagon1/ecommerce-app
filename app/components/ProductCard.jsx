import React from 'react'
import Image from 'next/image'
import { useProductContext } from '../context/ProductContext'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios';

const ProductCard = ({ title, image, price }) => {
    const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
    const stripePromise = loadStripe(publishableKey);

    const createCheckOutSession = async () => {
        const stripe = await stripePromise;
        const checkoutSession = await axios.post('/api/create-stripe-session', {
            item: item,
        });
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id,
        });
        if (result.error) {
            alert(result.error.message);
        }
    };

    const { products } = useProductContext()
    return (
        <div className=" border-solid border-2 border-black-900 col-span-6 md:col-span-4 lg:col-span-3 h-80 w-full bg-gray-100 relative">
            {/* <p>Hi I'm bob!</p> */}
            <div className='w-full flex justify-center mb-4'>
                <Image
                    // layout='fill'
                    width="70"
                    height="70"
                    src={image}
                    alt='product photo'
                />

            </div>
            <div className='bg-red-500'>
                <p>{title}</p>
                <p>${price}</p>
                <p>Add to cart</p>
                <button className="bg-green-700 p-1 rounded pointer"
                    onClick={createCheckOutSession}>
                    Purchase
                </button>
            </div>

        </div>
    )
}

export default ProductCard
