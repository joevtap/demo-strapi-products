import { useEffect, useState } from "react";

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(url);

        if (res.ok) {
          setData(await res.json());
          setIsLoading(false);
          return;
        }

        setIsLoading(false);
        setIsError(true);
      } catch (err) {
        console.log(err);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return {
    data,
    isLoading,
    isError,
  };
}
