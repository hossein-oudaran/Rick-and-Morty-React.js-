import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useCharacters(query) {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchData() {
      try {
        setIsLoading(true);
        // const res = await axios.get(
        //   "https://rickandmortyapi.com/api/character"
        // );
        // setCharacters(res.data.results);

        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`,
          { signal }
        );
        setCharacters(data.results);
      } catch (err) {
        if (!axios.isCancel()) {
          setCharacters([]);
          toast.error(err.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    }
    // if (query.length < 3) {
    //   setCharacters([]);
    //   return;
    // }
    fetchData();
    return () => {
      controller.abort();
    };
  }, [query]);
  return { characters, isLoading };
}
