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
        calculateItemPrice()
        getGrandTotal()
    }

    const decrementQuantity = () => {
        dispatch({ type: 'DECREMENT_QTY', payload: { itemId: product.product.id } });
        calculateItemPrice()
        getGrandTotal()
    }

    const calculateItemPrice = () => {
        dispatch({ type: 'CALCULATE_PRICE', payload: { priceId: product.product.id } })
    }

    const getGrandTotal = () => {
        dispatch({ type: 'CALCULATE_GRAND_TOTAL' })
    }

    console.log(product.product.title)

    return (
        <div className="flex items-center gap-3 border-t-2 py-3">

            <img
                className="h-16 w-16"
                src={product.product.image}></img>
            <div className="flex flex-col justify-center">
                <h1>{product.product.title}</h1>
                <div className="flex gap-4">

                    <div className='flex gap-2 border-solid-gray-950 border-2 px-1'>
                        <div className="cursor-pointer"
                            onClick={decrementQuantity}>-</div>
                        <div>{product.qty}</div>
                        <div className="cursor-pointer"
                            onClick={incrementQuantity}>+</div>
                    </div>
                    <p className="font-thin">$ {product.product.price}</p>
                    <p>$ {product.totalPrice}</p>

                    {/* <button onClick={() => removeFromCart(product)}>Remove</button> */}
                </div>
            </div>


        </div >
    )
}

export default CartProduct

