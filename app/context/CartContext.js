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

    //function for changing state on button click 
    let cartActive = false;

    //Get total quantity
    const totalQuantity = state.cart.reduce((total, item) => total + item.quantity, 0);

    // Create a function to get the quantity of a specific item

    const itemQuantity = (state, itemPrice) => {
        let quantity = 0;

        for (const item of state) {
            if (item.price === itemPrice) {
                quantity++;
            }
        }
    }

    // const itemQuantity = (price) => {
    //     state.cart.filter((cartItem) => cartItem.price === price).length;

    // }

    const clickHandler = () => {
        cartActive = !cartActive;
        console.log("clicked!")
        console.log(cartActive)
    };

    //function for displaying counter on cart logo


    return (
        <CartContext.Provider value={{ state, dispatch, cartActive, clickHandler, totalQuantity, itemQuantity }}>
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

export { CartProvider, useCart, CartContext };