import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { StarshipItem } from "../components/StarshipItem";
import { fetchFilms } from "../utils/api";

jest.mock("../utils/api");

const mockedFetchFilms = fetchFilms as jest.MockedFunction<typeof fetchFilms>;

describe("StarshipItem", () => {
  const starship = {
    name: "Starship 1",
    url: "1",
    films: ["film1"],
    starship_class: "class",
  };

  test("displays film titles when starship name is clicked", async () => {
    mockedFetchFilms.mockResolvedValue([
      {
        title: "Film 1",
        created: "1",
        characters: ["a", "b"],
        url: "//https:www.google.com",
      },
    ]);

    render(<StarshipItem starship={starship} />);

    fireEvent.click(screen.getByText("Starship 1"));

    await waitFor(() => {
      expect(screen.getByText("Film 1")).toBeInTheDocument();
    });
  });

  test("hides film titles when starship name is clicked again", async () => {
    mockedFetchFilms.mockResolvedValue([
      {
        title: "Film 1",
        created: "1",
        characters: ["a", "b"],
        url: "//https:www.google.com",
      },
    ]);

    render(<StarshipItem starship={starship} />);

    fireEvent.click(screen.getByText("Starship 1"));

    await waitFor(() => {
      expect(screen.getByText("Film 1")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Starship 1"));

    expect(screen.queryByText("Film 1")).not.toBeInTheDocument();
  });
});
