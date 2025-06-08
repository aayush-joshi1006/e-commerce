import { useSelector } from "react-redux";

import ProductItem from "./ProductItem.jsx";
import { useEffect, useState } from "react";

export default function ProductList() {
  const products = useSelector((store) => store.products.data);

  const [searchValue, setSearchValue] = useState("");
  const [filteredStore, setFilteredStore] = useState([]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      const trimmedSearch = searchValue.trim().toLowerCase();
      const tempStore = Array.isArray(products) ? products : [];

      if (!trimmedSearch) {
        setFilteredStore(tempStore);
        return;
      }

      let newFilteredStore = tempStore.filter((product) =>
        product.title.toLowerCase().includes(trimmedSearch)
      );
      setFilteredStore(newFilteredStore);
    }, 500);

    return () => clearTimeout(debounce);
  }, [searchValue, products]);

  return (
    <>
      <div className="mt-24">
        <div className="text-center">
          <input
          className="outline-none bg-gray-100 px-5 py-3 w-[50vw] rounded-2xl text-lg text-gray-400"
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-1 container mx-auto gap-7 my-5">
          {filteredStore.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
