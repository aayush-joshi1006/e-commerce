import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/Loading";

import { addProducts } from "./utlis/productsSlice";
import useFetch from "./utlis/useFetch";

import { Outlet } from "react-router-dom";

import { useDispatch } from "react-redux";

import { useEffect, Suspense } from "react";

import { ToastContainer } from "react-toastify";

function App() {
  const url = "https://dummyjson.com/products";
  // getting data,loading.error with using custom hook
  const { data, loading, error } = useFetch(url);
  // initialzing dispatch function for using function inside redux store
  const dispatch = useDispatch();

  useEffect(() => {
    // if data is there and there are products add the product list in the redux store
    if (data?.products) {
      // function for adding to the store
      dispatch(addProducts(data.products));
    }
  }, [data, dispatch]);

  // in case data is still loading
  if (loading) return <Loading />;
  // in case error occurs
  if (error) return <div>Error: {error}</div>;
  // in case data or products inside data is not returned
  if (!data || !data.products) return <div>No products found</div>;

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
