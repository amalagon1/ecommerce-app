import React from 'react'
import { useCart } from '../context/CartContext';


const CartProduct = ({ product }) => {

    // const { itemQuantity } = useContext(CartContext);
    const { state } = useCart();
    const { cart } = state;

    const itemQuantities = useCart().calculateItemQuantities(cart)

    // console.log(itemQuantity(product.price))

    return (
        <div>
            <li key={product.id}>
                <img
                    className="h-16 w-16"
                    src={product.image}></img>
                <h1>{product.title}</h1>
                <h1>{product.price}</h1>
                <h1>Quantity: {itemQuantities[product.id]}</h1>
                <button onClick={() => removeFromCart(product)}>Remove</button>
            </li>
        </div >
    )
}

export default CartProduct

