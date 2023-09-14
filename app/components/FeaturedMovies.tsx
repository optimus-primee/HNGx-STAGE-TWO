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
    genre_ids: number[]; // Change genre_ids to be an array of numbers
    backdrop_path: string;
  }
  const genreMap: { [key: number]: string } = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
  };

  // Function to get the genre names for a movie
  const getGenreNames = (genreIds: number[]): string[] => {
    return genreIds.map((genreId) => genreMap[genreId]);
  };

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
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="grid sm:grid-cols-4 w-[100%] sm:px-24 px-6 overflow-x-hidden">
      {isLoading ? (
        <Loading />
      ) : (
        movies &&
        movies.map((movie: IMovie) => (
          <div key={movie.id}>
            {movie.imdb_id && (
              <Link href={`/movie/${movie.imdb_id}`} title={`More information about ${movie.title}`}>
                <div className="sm:w-[250px] h-[370px] w-[100%] ">
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                    alt={movie.title}
                    className="w-[100%] h-[100%] object-cover "
                  />
                </div>
                <h2>{movie.title}</h2>
                <h2>{movie.release_date}</h2>
                <h2>{movie.vote_average}</h2>
                <h2>Genres: {getGenreNames(movie.genre_ids).join(", ")}</h2>
              </Link>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default FeaturedMovies;
