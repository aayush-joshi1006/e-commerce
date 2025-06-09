import { useSelector } from "react-redux";

import ProductItem from "./ProductItem.jsx";
import { useEffect, useState, useMemo } from "react";

export default function ProductList() {
  const products = useSelector((store) => store.products.data);

  const [searchValue, setSearchValue] = useState("");
  const [filteredStore, setFilteredStore] = useState([]);

  useEffect(() => {
    const trimmedSearch = searchValue.trim().toLowerCase();
    const tempStore = Array.isArray(products) ? products : [];

    const debounce = setTimeout(() => {
      if (!trimmedSearch) {
        setFilteredStore(tempStore);
      } else {
        const newFilteredStore = tempStore.filter((product) =>
          product.title?.toLowerCase().includes(trimmedSearch)
        );
        setFilteredStore(newFilteredStore);
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [searchValue, products]);

  const renderedProducts = useMemo(() => {
    return filteredStore.map((product) => (
      <ProductItem key={product.id} product={product} />
    ));
  }, [filteredStore]);

  return (
    <>
      <div className="mt-24">
        <div className="text-center">
          <input
            className="outline-none bg-gray-100 px-5 py-3 w-[50vw] text-lg text-gray-400 rounded-md shadow-sm"
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-1 container mx-auto gap-7 my-5">
          {filteredStore.length <= 0 ? (
            <div className="min-h-[70vh] flex items-center justify-center text-2xl font-bold text-red-800 w-[90vw] text-center">
              No products found
            </div>
          ) : (
            renderedProducts
          )}
        </div>
      </div>
    </>
  );
}
