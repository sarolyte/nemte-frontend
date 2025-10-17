import { useState, useEffect } from "react";
import { useAppContext } from "../Store/Store.jsx";


export default function useFetchDataById(id) {
  const [data, setData] = useState(null);
  const { actions } = useAppContext();
    const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    actions.setLoading(true);

    fetch(`http://localhost:3000/recipe/${id}`)
      .then((resp) => {
        if (!resp.ok) throw new Error('Failed to fetch');
        return resp.json();
      })
      .then((result) => {
        setData(result.data || null);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      })
      .finally(() =>
        setTimeout(() => {
            actions.setLoading(false);
        }, 1000)
        )
  }, [id]);

  return { data, loading, error };
}