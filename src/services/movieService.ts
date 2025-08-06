import axios from "axios";
import type { MovieSearchResponse } from "../types/movie";
import { useQuery } from "@tanstack/react-query";

export async function fetchMovies(
  query: string,
  page: number
): Promise<MovieSearchResponse> {
  const token = import.meta.env.VITE_TMDB_TOKEN;

  const response = await axios.get<MovieSearchResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: { query, page },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}
export function useMovies(query: string, page: number) {
  return useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
  });
}
