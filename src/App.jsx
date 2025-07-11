import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/Loading";

import { addProducts } from "./utlis/productsSlice";
import useFetch from "./utlis/useFetch";

import { Outlet } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { useEffect, Suspense } from "react";

import { ToastContainer } from "react-toastify";
import { getCartAPI } from "./utlis/cartAPI";
import { setCart } from "./utlis/cartSlice";
import { getCurrentUser } from "./utlis/userSlice";

function App() {
  const url = "http://localhost:8080/products";
  // getting data,loading.error with using custom hook
  const { data, loading, error } = useFetch(url);
  // initialzing dispatch function for using function inside redux store
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart);

  const { loading: lodingUser, user } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(data)) {
      dispatch(addProducts(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await getCartAPI();
        if (Array.isArray(cartData)) {
          const minimalCart = cartData.map((item) => ({
            _id: item._id,
            productId: item.productId._id,
            quantity: item.quantity,
          }));
          dispatch(setCart(minimalCart));
        }
      } catch (err) {
        console.error("Failed to fetch cart:", err.message);
      }
    };

    if (!lodingUser) {
      if (user && user._id) {
        fetchCart();
      } else {
        dispatch(setCart([])); // ✅ Clear cart only after user is known to be absent
      }
    }
  }, [user, lodingUser, dispatch]);
  // in case data is still loading
  if (loading) return <Loading />;
  // in case error occurs
  if (error) return <div>Error: {error}</div>;
  // in case data or products inside data is not returned
  if (!Array.isArray(data) || data.length === 0)
    return <div>No products found</div>;

  return (
    <>
      <div className="dark:bg-gray-900 min-h-screen">
        {/* component for showing message as nortification */}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Header />
        {/* applying lazy loading */}
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
        <Footer />
      </div>
    </>
  );
}

export default App;

// const postProducts = async () => {
//   for (const product of data.products) {
//     try {
//       const newProduct = {
//         title: product.title,
//         description: product.description,
//         price: product.price,
//         rating: product.rating,
//         tags: product.tags,
//         thumbnail: product.thumbnail,
//         stock: product.stock,
//       };

//       const res = await fetch("http://localhost:8080/products", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newProduct),
//       });

//       if (!res.ok) {
//         console.error(`Failed to post product: ${product.title}`);
//       }
//     } catch (error) {
//       console.error(`Error posting product: ${product.title}`, error);
//     }
// }

// postProducts(); // Trigger the post logic
