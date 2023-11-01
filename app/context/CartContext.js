'use client'
import React, { createContext, useState, useReducer, useContext } from 'react';

const CartContext = createContext()

//Create a reducer funtion to handle cart actions
const cartReducer = (state, action) => {
    switch (action.type) {

        case 'ADD_TO_CART':
            return { ...state, cart: [...state.cart, { ...action.payload, qty: 1, totalPrice: action.payload.product.price }] };


        // case 'UPDATE_CART':
        //     return { ...state, cart: action.payload }

        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter((item) => item.id !== action.payload.id),
            };

        case 'INCREMENT_QTY':
            const { id } = action.payload;
            const updatedCart = state.cart.map((item) =>
                item.product.id === id ? { ...item, qty: item.qty + 1 } : item
            );
            return { ...state, cart: updatedCart };

        case 'DECREMENT_QTY':
            const { itemId } = action.payload;
            const updatedCartDecrement = state.cart.map((item) =>
                //if qty=0, return null. else:
                item.product.id === itemId ? { ...item, qty: item.qty - 1 } : item
            );
            return { ...state, cart: updatedCartDecrement };

        case 'CALCULATE_PRICE':
            const { priceId } = action.payload;
            const updatedPrice = state.cart.map((item) =>
                item.product.id === priceId ? {
                    ...item, totalPrice: item.product.price * item.qty
                } :
                    item
            );
            return { ...state, cart: updatedPrice };

        default:
            return state;
    }
};

//Create CartProvider component
const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { cart: [] });
    console.log(state.cart)

    //function for changing state on button click 
    let cartActive = false;

    // Get total quantity
    const totalQuantity = state.cart.reduce((total, item) => total + item.quantity, 0);

    // Create a function to get the quantity of a specific item

    // const itemQuantity = (state, id) => {
    //     let quantity = 0;

    //     for (const item of state) {
    //         if (item.price === itemPrice) {
    //             quantity++;
    //         }
    //     }
    // }

    // const itemQuantity = (price) => {
    //     state.cart.filter((cartItem) => cartItem.price === price).length;

    // }

    // This function takes the cart state as an argument and calculates the quantity of each item in the cart.
    function calculateItemQuantities(cart) {
        const itemQuantities = {};

        // Loop through the items in the cart
        for (const item of cart) {
            if (item.id in itemQuantities) {
                // If the item is already in the quantities object, increment its count
                itemQuantities[item.id] += 1;
            } else {
                // If the item is not in the quantities object, initialize it with a count of 1
                itemQuantities[item.id] = 1;
            }
        }

        return itemQuantities;
    }

    // const itemQuantity = () => {
    //     return "Hello"
    // }

    const clickHandler = () => {
        cartActive = !cartActive;
        console.log("clicked!")
        console.log(cartActive)
    };

    //function for displaying counter on cart logo


    return (
        <CartContext.Provider value={{
            state,
            dispatch,
            cartActive,
            clickHandler,
            totalQuantity,
            calculateItemQuantities
        }}>
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

export const CartState = () => {
    return useContext(cart)
}

export { CartProvider, useCart, CartContext };