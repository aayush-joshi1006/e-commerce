import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaPlus, FaStar } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { addToCart, removeFromCart } from "../utlis/cartSlice";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

export default function ProductDetail() {
  let { id } = useParams();
  let products = useSelector((store) => store.products.data);
  let cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  let currentProduct = products.filter((product) => product.id == id)[0];
  let quantity = cart[id] || 0;

  return (
    <>
      <div className="mt-24 flex justify-center items-center min-h-[85vh] container mx-auto relative">
        <Link
          to="/store"
          className="absolute top-2 left-2 flex justify-center items-center gap-1 hover:text-[#000f9f]"
        >
          <IoMdArrowBack />
          <span>Back to Store</span>
        </Link>
        <div className="flex justify-between items-center min-w-[50vw] gap-10">
          <div>
            <img src={currentProduct.thumbnail} alt="" className="w-[30vw]" />
          </div>
          <div className="flex justify-center items-start flex-col w-[35vw]">
            <h2 className="text-3xl font-bold my-3">{currentProduct.title} </h2>
            <p className="text-gray-500 italic text-sm">{currentProduct.description}</p>
            <div className="flex justify-between items-center w-full px-5">
              <div className="flex justify-center items-center gap-2 my-3">
                {currentProduct.tags.map((tag) => (
                  <span className="bg-gray-300 px-2 py-1 rounded-xl hover:bg-gray-200 cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-center items-center gap-1 cursor-pointer">
                <FaStar className="text-orange-500" />
                <span>{currentProduct.rating}/5</span>
              </div>
            </div>
            <div>
              <span className="font-thin italic px-5">${currentProduct.price}</span>
            </div>
            <div className="mt-4 flex justify-between items-center w-full px-5">
              <div>
                <button
                  onClick={() => dispatch(addToCart(id))}
                  className="bg-[#202020] hover:bg-[#000f9f] px-3 py-2 text-white transition duration-300"
                >
                  Add to Cart
                </button>
              </div>
              <div className="flex justify-center items-center gap-3">
                <button
                  onClick={() => dispatch(removeFromCart(id))}
                  className="p-1 rounded-full bg-amber-500 hover:bg-amber-400"
                >
                  <FaMinus />
                </button>
                {quantity}
                <button
                  onClick={() => dispatch(addToCart(id))}
                  className="p-1 rounded-full bg-amber-500 hover:bg-amber-400"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
