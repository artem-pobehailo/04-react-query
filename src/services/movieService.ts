import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEffect } from "react";

interface MovieSearchResponse {
  results: Movie[];
  total_pages: number;
}

interface Movie {
  id: number;
  poster_path: string;
  backdrop_path: string;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

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
  const result = useQuery<MovieSearchResponse, Error>({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query.trim() !== "",
  });

  useEffect(() => {
    if (result.data?.results.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [result.data]);

  return result;
}
