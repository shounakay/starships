import { useEffect, useState } from "react";
import { APIResponse, StarshipType } from "../types/starship-types";
import { getStarships } from "../utils/api";

export const useStarships = () => {
  const [starships, setStarships] = useState<StarshipType[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const retrieveStarships = async () => {
      try {
        const data = await getStarships();
        if (data) {
          setStarships(data.results);
        }
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    retrieveStarships();
  }, []);

  return { starships, isLoading, isError };
};
