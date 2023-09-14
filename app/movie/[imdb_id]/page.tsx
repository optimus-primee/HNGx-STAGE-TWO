"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import MovieDetail from "@/app/components/MovieDetail";
interface Params {
  imdb_id: string; 
}
function MovieDetailsPage({ params }: { params: Params }){
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const TMDB_API_KEY = process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY;
  const router = useRouter();
  const { imdb_id } = params;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${imdb_id}?api_key=${TMDB_API_KEY}&language=en-US`
        );
        const movieData = response.data;
        setMovie(movieData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };
    fetchMovieDetails();
  }, [TMDB_API_KEY]);

  return (
    <div>
      {isLoading && (
        <div className="loading">
          <p>Loading...</p>
        </div>
      )}
      {isError && <p>Error fetching data</p>}
      {movie &&    <MovieDetail movie={movie} />}
     
      
    </div>
  );
}

export default MovieDetailsPage;
