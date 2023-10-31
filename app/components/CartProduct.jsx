import React from 'react'
import { useCart } from '../context/CartContext';


const CartProduct = ({ product }) => {

    // const { itemQuantity } = useContext(CartContext);
    const { state, dispatch } = useCart();
    const { cart } = state;

    // const itemQuantities = useCart().calculateItemQuantities(cart)

    // console.log(itemQuantity(product.price))
    // const addQuantity = () => {
    //     product.qty++
    // }

    const incrementQuantity = () => {
        // Dispatch an action to increment the quantity of the item
        dispatch({ type: 'INCREMENT_QTY', payload: { id: product.product.id } });
    }

    const decrementQuantity = () => {
        dispatch({ type: 'DECREMENT_QTY', payload: { itemId: product.product.id } });
    }

    console.log(product.product.title)

    return (
        <div className="flex gap-3">

            <img
                className="h-16 w-16"
                src={product.product.image}></img>
            <div className="flex flex-col">
                <h1>{product.product.title}</h1>
                <div className="flex gap-4">

                    <div className='flex gap-2 border-solid-gray-950 border-2 px-1'>
                        <div className="cursor-pointer"
                            onClick={decrementQuantity}>-</div>
                        <div>{product.qty}</div>
                        <div className="cursor-pointer"
                            onClick={incrementQuantity}>+</div>
                    </div>
                    <h1>{product.product.price}</h1>
                    {/* <h1>Quantity: {product.qty}</h1> */}
                    <button onClick={() => removeFromCart(product)}>Remove</button>
                </div>
            </div>


        </div >
    )
}

export default CartProduct

