'use client'
import React from 'react';
import { CartContext, useCart, useContext } from '../context/CartContext';
import CartProduct from '../components/CartProduct';
import Navbar from '../components/Navbar'

const Cart = () => {
    const { state, grandTotal } = useCart();
    // const { cart } = state;

    // const { totalQuantity } = useCart();
    // console.log(totalQuantity)

    // console.log(state.cart)


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
                        // <li key={product.id}>
                        //     <img
                        //         className="h-16 w-16"
                        //         src={product.image}></img>
                        //     <h1>{product.title}</h1>
                        //     <h1>{product.price}</h1>
                        //     <button onClick={() => removeFromCart(product)}>Remove</button>
                        // </li>
                    ))}
                </ul>
                <h1 className="mb-6">Total: ${grandTotal}</h1>
                <button className="cursor-pointer bg-black text-white py-2 px-6">
                    Check out
                </button>
            </div>


        </div>
    )
}

export default Cart
