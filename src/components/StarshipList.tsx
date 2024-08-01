import { useStarships } from "../hooks/useStarships";
import { StarshipType } from "../types/starship-types";
import { StarshipItem } from "./StarshipItem";
import error from "../assets/error.svg";
import { FC } from "react";

export const StarshipList: FC = () => {
  const { starships, isLoading, isError } = useStarships();

  return (
    <section className="flex flex-col p-4">
      <header className="flex justify-center items-center gap-2 mb-8">
        <h1 className="text-2xl">🚀</h1>
        <h3 className="text-3xl text-neutral-200 font-semibold font-mono underline">
          Starships
        </h3>
      </header>
      {isLoading ? (
        <article
          className="flex justify-center items-center h-screen"
          aria-live="polite"
        >
          Loading ...
        </article>
      ) : isError ? (
        <article
          className="flex justify-center items-center h-screen"
          aria-live="assertive"
        >
          <img src={error} alt="Error due to fetch" />
        </article>
      ) : (
        <article className="flex flex-col justify-center items-center gap-8 p-4">
          {starships &&
            (starships as StarshipType[]).map((starship) => {
              return <StarshipItem key={starship.url} starship={starship} />;
            })}
        </article>
      )}
    </section>
  );
};
