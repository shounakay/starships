import { APIResponse, StarshipFilmsType } from "../types/starship-types";

const APP_URL = "https://swapi.dev/api/starships/?page=1&format=json";

export const getStarships = async (): Promise<APIResponse> => {
  try {
    const data = await fetch(APP_URL);
    if (!data.ok) {
      throw new Error("Something went wrong");
    }
    const result = data.json();
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const fetchFilms = async (
  films: string[]
): Promise<StarshipFilmsType[]> => {
  try {
    const filmsRes = await Promise.all(films.map((film) => fetch(film)));
    const filmsData = await Promise.all(
      filmsRes.map(async (filmRes) => {
        if (!filmRes.ok) {
          throw new Error("Oops! Something went wrong.");
        }
        return filmRes.json();
      })
    );
    return filmsData;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
