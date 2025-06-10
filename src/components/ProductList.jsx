import { useSelector } from "react-redux";

import { useEffect, useState, useMemo } from "react";

import ProductItem from "./ProductItem.jsx";

export default function ProductList() {
  // getting product list from the redux store
  const products = useSelector((store) => store.products.data);
  // state for managing the searched term in search bar
  const [searchValue, setSearchValue] = useState("");
  // state for managing the lsit of products based on the condition
  const [filteredStore, setFilteredStore] = useState([]);

  useEffect(() => {
    // searched term
    const trimmedSearch = searchValue.trim().toLowerCase();
    // set a temporary store for the collection of items it product list is not defined set it to a empty array
    const tempStore = Array.isArray(products) ? products : [];

    // adding debounce effect so that the componet does not render on each searched term insead based on interval of time
    const debounce = setTimeout(() => {
      // if serach field is empty set the whole collection of items as filtered store
      if (!trimmedSearch) {
        setFilteredStore(tempStore);
      } else {
        // filter out the items based on the search term and the title of product
        const newFilteredStore = tempStore.filter((product) =>
          product.title?.toLowerCase().includes(trimmedSearch)
        );
        setFilteredStore(newFilteredStore);
      }
    }, 500);
    // after execution of above code removing the timeout function
    return () => clearTimeout(debounce);
  }, [searchValue, products]);

  // svaing the rendered product in useMemo so re-calculation does not occur for the searched term
  const renderedProducts = useMemo(() => {
    return filteredStore.map((product) => (
      <ProductItem key={product.id} product={product} />
    ));
  }, [filteredStore]);

  return (
    // Component showing al the items present in the items list
    <section className="mt-24 min-h-[90vh] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="text-center">
        {/* Input field for searching products */}
        <input
          className="outline-none bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-400 px-5 py-3 w-[50vw] text-lg rounded-md shadow-sm"
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <div className="grid lg:grid-cols-3 grid-cols-1 container mx-auto gap-7 my-5">
        {/* check condition if the filteredStore ahve items in it or not */}
        {filteredStore.length <= 0 ? (
          // in case there are no products in the filteredStore
          <div className="min-h-[70vh] flex items-center justify-center text-2xl font-bold text-red-800 dark:text-red-400 w-[90vw] text-center">
            No products found
          </div>
        ) : (
          renderedProducts
        )}
      </div>
    </section>
  );
}
