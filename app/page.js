'use client'
import axios from 'axios'
import Banner from './components/Banner'
import { useProductContext } from './context/ProductContext';
import { useCartContext } from './context/CartContext';
import ProductCard from './components/ProductCard';

export default function Home() {

  const { products } = useProductContext();

  // const { cart } = useCartContext()

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



      {/* <Banner /> */}
      <main className="container mx-auto my-20">

        <h1 className="text-center mb-10 text-xl">Our Products</h1>



        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
          {products && products.map((product) =>
            <ProductCard
              id={product.id}
              product={product} />
          )}
        </div >
      </main>
    </>

  )

}