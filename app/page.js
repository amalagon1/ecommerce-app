'use client'
import axios from 'axios'
import Banner from './components/Banner'
import { useProductContext } from './context/ProductContext';
import ProductCard from './components/ProductCard';

export default function Home() {

  const { products } = useProductContext();
  // const getProducts = () => {
  //   fetch('https://api.storerestapi.com/products')
  //     .then(response => response.json())
  //     .then(json => console.log(json))
  // }
  // getProducts()

  // const fetchProducts = async () => {
  //   const { data } = await axios.get(
  //     'https://fakestoreapi.com/products'
  //   );
  //   console.log(data)
  // }

  // fetchProducts()

  return (

    <>
      <Banner />
      <main className="m-2 grid grid-cols-12 gap-2 border border-red-600">
        {products && products.map((product) =>
          <ProductCard
            key={product.id}
            title={product.title}
            image={product.image}
            price={product.price} />
        )}
      </main>
    </>

  )
}
