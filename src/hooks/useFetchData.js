import { useState, useEffect } from "react";
import { useAppContext } from "../Store/Store.jsx";


export default function useFetchData(
  url = "http://localhost:3000/recipes"
) {
  const [data, setData] = useState([]);
  const { actions } = useAppContext();

  // const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    actions.setLoading(true);

    fetch(url)
      .then((resp) => resp.json())
      .then((result) => {
        setData(result.data || [])
        actions.setError(null)
        })
      .catch((error) => {
        console.error('Fetch errror:', error);
      })
      .finally(() =>
        setTimeout(() => {
          actions.setLoading(false);
        }, 1000)
      );
  }, [url]);
  return { data };
}