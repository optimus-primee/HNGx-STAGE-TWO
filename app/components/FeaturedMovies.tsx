"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import Link from "next/link";

function FeaturedMovies() {
  const [movies, setMovies] = useState<IMovie[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  interface IMovie {
    poster_path: string;
    id: string;
    imdb_id: string | null;
    title: string;
    vote_average: number;
    release_date: string;
    genre_ids: [
      {
        name: string;
        id: string;
      }
    ];
  }

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=ca0825715c06ebe0d0621ba9ead36000&language=en-US&page=1`
        );

        const moviesWithImdbId = await Promise.all(
          response.data.results.map(async (movie: IMovie) => {
            const imdbResponse = await axios.get(
              `https://api.themoviedb.org/3/movie/${movie.id}?api_key=ca0825715c06ebe0d0621ba9ead36000`
            );
            movie.imdb_id = imdbResponse.data.imdb_id || null;
            return movie;
          })
        );

        setMovies(moviesWithImdbId);
       console.log(moviesWithImdbId);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="grid grid-cols-4 px-24 overflow-x-hidden">
      {isLoading ? (
        <Loading />
      ) : (
        movies &&
        movies.map((movie: IMovie) => (
          <div key={movie.id}>
            {movie.imdb_id && (
              <Link href={`/movie/${movie.imdb_id}`} title={`More information about ${movie.title}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
                <h2>{movie.title}</h2>
              </Link>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default FeaturedMovies;
