'use client'
import React, { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'

const ProductContext = createContext()

export const useProductContext = () => {
    return useContext(ProductContext);
}

export const ProductProvider = ({ children }) => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get(
                'https://fakestoreapi.com/products'
            );
            console.log(data)
            setProducts(data);
        };
        fetchProducts()
    }, []);


    // const getProducts = () => {
    //     fetch('https://api.storerestapi.com/products')
    //         .then(response => response.json())
    //         .then(json => console.log(json))
    // }

    // getProducts()
    // fetchProducts

    return (
        <ProductContext.Provider value={{ products }}>
            {children}
        </ProductContext.Provider>
    )
}

// export default ProductProvider;
