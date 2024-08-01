import { render, screen, waitFor } from "@testing-library/react";
import { StarshipList } from "../components/StarshipList";
import { useStarships } from "../hooks/useStarships";
// import "@testing-library/jest-dom/extend-expect";
// import "jest";

jest.mock("../hooks/useStarships");

const mockedUseStarships = useStarships as jest.MockedFunction<
  typeof useStarships
>;

describe("StarshipList", () => {
  test("displays starship names when fetched", async () => {
    mockedUseStarships.mockReturnValue({
      starships: [
        { name: "Starship 1", url: "1", films: [], starship_class: "class" },
      ],
      isLoading: false,
      isError: false,
    });

    render(<StarshipList />);

    await waitFor(() => {
      expect(screen.getByText("Starship 1")).toBeInTheDocument();
    });
  });
});
