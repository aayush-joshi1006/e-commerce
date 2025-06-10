import { useEffect, useState } from "react";

// custom hook for getting product list from a api
export default function useFetch(url) {
  // state for loading status
  const [loading, setLoading] = useState(true);
  // state for product data
  const [data, setData] = useState(null);
  // state for error handling
  const [error, setError] = useState(null);

  useEffect(() => {
    // function for getting data from api
    const fetchData = async () => {
      try {
        let response = await fetch(url);
        let result = await response.json();
        // setting data in the state of data
        setData(result);
      } catch (error) {
        // handling error and setting it in state of error
        setError(error);
      } finally {
        // initialized value of loading is true setting it to false
        setLoading(false);
      }
    };
    //  calling the fetch data
    fetchData();
  }, [url]);
  // returning data,laoding,error
  return { data, loading, error };
}
