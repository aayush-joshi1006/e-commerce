import { useState, useEffect } from "react";
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
      <div className="mt-24 flex flex-col xl:flex-row justify-center items-center min-h-[90vh] gap-8 container mx-auto px-4 text-center xl:text-left">
        <div>
          <img
            src="../src/assets/shoppingImage.avif"
            alt="Shopping Family"
            className="w-full lg:w-[40vw] max-w-md mx-auto"
          />
        </div>

        <div className="flex flex-col items-center lg:items-start">
          <div className="relative transition duration-700 hover:scale-105 cursor-pointer my-5">
            <h1 className="bg-black p-4 text-white text-4xl md:text-5xl lg:text-7xl lg:h-28 h-20 tracking-widest z-10 relative">
              SHOPPYGLOBE
            </h1>
            <div className="lg:h-28 h-20 border-8 absolute -top-6 -left-6 lg:-top-10 lg:-left-10 w-full"></div>
            <div className="bg-black h-4 w-16 absolute bottom-0 -right-20"></div>
          </div>
          <p className="text-base md:text-lg my-7 w-full max-w-sm italic text-gray-500 animate-pulse">
            ShoppyGlobe – Your one-stop shop for trending products at unbeatable
            prices.
          </p>
        </div>
      </div>

      <div className="container mx-auto flex justify-center items-center flex-col px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center w-full px-2 sm:px-8 gap-2">
          <h2 className="text-lg sm:text-xl font-bold">Popular products</h2>
          <Link
            to="/store"
            className="bg-[#202020] hover:bg-[#000f9f] px-3 py-2 text-white transition duration-300"
          >
            Explore More
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 my-4 pb-5 w-full">
          {popularProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
