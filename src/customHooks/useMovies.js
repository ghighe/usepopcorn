import { useState, useEffect } from "react";

const APIKEY = "f28e06d0";

export function useMovies(query, callback) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    callback?.();
    if (query.length === 0) {
      setMovies([]);
      setError("");
      return;
    }
    const controller = new AbortController();
    async function getMovies() {
      try {
        setIsLoading(true);
        setError("");
        const request = await fetch(
          `http://www.omdbapi.com/?apikey=${APIKEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!request.ok) {
          throw new Error("Movies cannot be fetched from API!");
        }
        const response = await request.json();

        if (response.Response === "False") {
          throw new Error("Movie doesn't exist!");
        }

        setMovies(response.Search);
        setError("");
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
        if (error.message !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
      if (query.length < 3) {
        setMovies([]);
        setError("movie not found...");
      }
    }
    getMovies();
    return () => {
      // console.log("Cleaning function");
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  //can also be returned as an object
  return [isLoading, movies, error];
  // return {isLoading, movies, error};
}
