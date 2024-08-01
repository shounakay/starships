export interface APIResponse {
  count: number;
  next: string;
  previous: unknown;
  results: StarshipType[];
}

export interface StarshipType {
  films: string[];
  name: string;
  starship_class: string;
  url: string;
}

export interface StarshipFilmsType {
  characters: string[];
  title: string;
  url: string;
  created: string;
}
