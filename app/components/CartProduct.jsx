import React from 'react'
import { useCart } from '../context/CartContext';


const CartProduct = ({ product }) => {

    // const { itemQuantity } = useContext(CartContext);
    const { state } = useCart();
    const { cart } = state;

    // const itemQuantities = useCart().calculateItemQuantities(cart)

    // console.log(itemQuantity(product.price))
    console.log(product.product.title)

    return (
        <div className="flex gap-3">

            <img
                className="h-16 w-16"
                src={product.product.image}></img>
            <div className="flex flex-col">
                <h1>{product.product.title}</h1>
                <div className="flex gap-2">
                    <h1>{product.product.price}</h1>
                    <div className='flex gap-2 border-solid-gray-950 border-2 px-1'>
                        <div className="cursor-pointer">-</div>
                        <div>{product.qty}</div>
                        <div className="cursor-pointer">+</div>
                    </div>
                    {/* <h1>Quantity: {product.qty}</h1> */}
                    <button onClick={() => removeFromCart(product)}>Remove</button>
                </div>
            </div>


        </div >
    )
}

export default CartProduct

