'use client'
import React, { createContext, useState, useReducer, useContext } from 'react';

const CartContext = createContext()

//Create a reducer funtion to handle cart actions
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return { ...state, cart: [...state.cart, action.payload] };
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter((item) => item.id !== action.payload.id),
            };
        default:
            return state;
    }
};

//Create CartProvider component
const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { cart: [] });

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}

//Create custom hook to access cart context
const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context;
};

export { CartProvider, useCart };