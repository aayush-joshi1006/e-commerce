import { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import ProductItem from "./ProductItem";

import { Link } from "react-router-dom";

export default function HomePage() {
  // getting list of products from the redux store
  const products = useSelector((store) => store.products.data);
  // state for setting highly rated popular products
  const [popularProducts, setPopularProducts] = useState([]);

  // useEffect Hook for managing popular products if the product list gets modified
  useEffect(() => {
    // run only if there is product array and its length is not zero
    if (products && products.length) {
      // getting first four popular product
      const tempProducts = products
        .slice()
        .sort((prod1, prod2) => prod2.rating - prod1.rating)
        .slice(0, 4);
      setPopularProducts(tempProducts);
    }
  }, [products]);

  return (
    <>
      {/* HomePage Component */}
      <main
        className="mt-24 flex flex-col xl:flex-row justify-center items-center min-h-[90vh] gap-8 container mx-auto px-4 text-center xl:text-left
        bg-white dark:bg-gray-900
        text-gray-900 dark:text-gray-100
        transition-colors duration-300
      "
      >
        <div className="flex flex-col items-center">
          {/* designed ShoppyGloble logo */}
          <div className="relative transition duration-700 hover:scale-105 cursor-pointer my-5">
            <h1 className="bg-black p-4 text-white dark:text-black dark:bg-white text-5xl md:text-7xl lg:text-8xl xl:text-9xl lg:h-36 h-20 tracking-widest z-10 relative">
              SHOPPYGLOBE
            </h1>
            <div
              className="lg:h-36 h-20 border-8 absolute -top-6 -left-6 lg:-top-10 lg:-left-10 w-full
              border-black dark:border-white
            "
            ></div>
            <div className="bg-black dark:bg-white h-4 lg:w-16 w-8 absolute bottom-0 lg:-right-20 -right-10"></div>
          </div>
          {/* description about the ShoppyGlobe */}
          <p
            className="text-base md:text-lg my-7 w-full max-w-sm italic
            text-gray-500 dark:text-gray-400
            animate-pulse text-center
          "
          >
            ShoppyGlobe – Your one-stop shop for trending products at unbeatable
            prices.
          </p>
        </div>
      </main>
      {/* Compopnent for popular products */}
      <section
        className="container mx-auto flex justify-center items-center flex-col px-4
        bg-white dark:bg-gray-900
        transition-colors duration-300
      "
      >
        <div className="flex flex-col sm:flex-row justify-between items-center w-full px-2 sm:px-8 gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300">
            Popular products
          </h2>
          {/* Link to the store page */}
          <Link
            to="/store"
            className="bg-[#202020] hover:bg-[#000f9f] px-3 py-2 text-white transition duration-300
              dark:bg-gray-700 dark:hover:bg-blue-700
            "
          >
            Explore More
          </Link>
        </div>
        {/* Mapping the popular products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 my-4 pb-5 w-full">
          {popularProducts.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
