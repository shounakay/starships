import { APIResponse, StarshipFilmsType } from "../types/starship-types";

const APP_URL = "https://swapi.dev/api/starships/?page=1&format=json";

export const getStarships = async (): Promise<APIResponse> => {
  try {
    const data = await fetch(APP_URL);
    console.log("data", data);
    if (!data.ok) {
      throw new Error("Something went wrong");
    }
    const result: APIResponse = await data.json();
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const fetchFilms = async (
  films: string[]
): Promise<StarshipFilmsType[]> => {
  const filmsRes = films.map((film) => fetch(film));
  return Promise.all(filmsRes)
    .then((filmsRes) => {
      const films = filmsRes.map((filmRes) => {
        if (!filmRes.ok) {
          throw new Error("Oops! Something went wrong.");
        }
        return filmRes.json();
      });
      return Promise.all(films);
    })
    .then((films) => films)
    .catch((err) => {
      console.log(err);
      throw err;
    });
};
