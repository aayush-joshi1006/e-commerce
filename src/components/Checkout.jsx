import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../utlis/cartSlice";

export default function Checkout() {
  const products = useSelector((store) => store.products.data);
  const cartItems = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartProducts = Object.entries(cartItems).reduce(
    (acc, [id, quantity]) => {
      let item = products.find((product) => product.id == parseInt(id));
      if (item) {
        acc.push({ ...item, quantity });
      }
      return acc;
    },
    []
  );

  return (
    <>
      <div>
        {cartProducts.map((product) => (
          <div key={product.id}>
            <p>{product.title}</p>
            <p>{product.quantity}</p>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          dispatch(clearCart());
          navigate("/store");
        }}
      >
        Pay Amount
      </button>
    </>
  );
}
