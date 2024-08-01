import { FC, useState } from "react";
import { StarshipFilmsType, StarshipType } from "../types/starship-types";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FiYoutube } from "react-icons/fi";
import { fetchFilms } from "../utils/api";

interface FetchStateTypes {
  isLoading: boolean;
  isError: boolean;
}

export const StarshipItem: FC<{ starship: StarshipType }> = ({ starship }) => {
  const { name, films } = starship;
  const [isOpen, setIsOpen] = useState(false);
  const [filmTitles, setFilmTitles] = useState<StarshipFilmsType[]>();
  const [fetchStates, setFetchStates] = useState<FetchStateTypes>({
    isLoading: false,
    isError: false,
  });

  const handleToggle = () => {
    if (isOpen || filmTitles) {
      setIsOpen((prev) => !prev);
      return;
    }
    setIsOpen(true);
    setFetchStates((prev) => ({ ...prev, isLoading: true }));
    retrieveFilmTitles();
  };

  const retrieveFilmTitles = async () => {
    try {
      const filmsData = await fetchFilms(films);
      setFilmTitles(filmsData as StarshipFilmsType[]);
    } catch (err) {
      setFetchStates((prev) => ({ ...prev, isError: true }));
    } finally {
      setFetchStates((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const { isLoading, isError } = fetchStates;

  return (
    <section className="flex flex-col items-center justify-center rounded-md border-neutral-400 p-6 gap-5 bg-neutral-300">
      <div
        className="flex justify-between items-center min-w-24 sm:min-w-60 sm:w-96"
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onClick={handleToggle}
        aria-description="toggler to expand and collapse films view"
      >
        <h3 className="font-semibold text-neutral-600 text-sm sm:text-xl">
          {name}
        </h3>
        {isOpen ? <IoIosArrowUp size={32} /> : <IoIosArrowDown size={32} />}
      </div>
      {isOpen && (
        <div className="self-start" aria-live="assertive">
          {isLoading ? (
            <div>Loading ...</div>
          ) : isError ? (
            <h3 className=" text-red-400 font-medium text-sm" role="alert">
              Something went wrong. Try refreshing the browser.
            </h3>
          ) : (
            <div className="flex flex-col pl-4">
              {(filmTitles as StarshipFilmsType[]).map((film) => {
                return (
                  <div className="flex items-center gap-3" key={film.created}>
                    <FiYoutube />
                    <p>{film.title}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </section>
  );
};
