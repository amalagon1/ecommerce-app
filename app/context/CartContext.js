import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext()

export const useCartContext = () => {
    return useContext(CartContext);
}

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    return (
        <CartContext.Provider value={{ cart }}>
            {children}
        </CartContext.Provider>
    )
}
