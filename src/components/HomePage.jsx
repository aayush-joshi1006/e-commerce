import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";

export default function HomePage() {
  const products = useSelector((store) => store.products.data);
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    let tempProducts = products
      .slice()
      .sort((prod1, prod2) => prod2.rating - prod1.rating)
      .slice(0, 4);
    setPopularProducts(tempProducts);
  }, [products]);

  return (
    <>
      <div className="mt-24  flex justify-center items-center min-h-[90vh] gap-12 container mx-auto">
        <div>
          <img
            src="../src/assets/shoppingImage.avif"
            alt="Shopping Family"
            className="w-[40vw]"
          />
        </div>
        <div>
          <div className="relative transition duration-700 hover:scale-105 cursor-pointer">
            <h1 className="bg-black p-4 text-white text-7xl h-28 tracking-widest z-10 relative">
              SHOPPYGLOBE
            </h1>
            <div className="h-28 border-8 absolute -top-10 -left-10 w-full"></div>
            <div className="bg-black h-4 w-16 absolute bottom-0 -right-20"></div>
          </div>
          <p className="text-xl my-7 w-[25vw] italic text-gray-500 animate-pulse">
            ShoppyGlobe – Your one-stop shop for trending products at unbeatable
            prices.
          </p>
        </div>
      </div>
      <div className="container mx-auto flex justify-center items-center flex-col">
        <div className="flex justify-between items-center w-full px-8">
          <h2 className="text-xl font-bold">Popular products</h2>
          <Link
            to="/store"
            className="bg-[#202020] hover:bg-[#000f9f] px-3 py-2 text-white transition duration-300"
          >
            Explore More
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 my-4 pb-5">
          {popularProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
