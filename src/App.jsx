import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/Loading";

import { addProducts } from "./utlis/productsSlice";

import { Outlet } from "react-router-dom";
import useFetch from "./utlis/useFetch";
import { useDispatch } from "react-redux";
import { useEffect, Suspense } from "react";

function App() {
  const url = "https://dummyjson.com/products";
  const { data, loading, error } = useFetch(url);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.products) {
      dispatch(addProducts(data.products));
    }
  }, [data, dispatch]);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  if (!data || !data.products) return <div>No products found</div>;

  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
