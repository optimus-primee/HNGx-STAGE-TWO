"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import Link from "next/link";
import imdb from "../assests/images/imdb.png";
import Image from "next/image";

function FeaturedMovies() {
  const [movies, setMovies] = useState<IMovie[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  interface IMovie {
    poster_path: string;
    id: string;
    imdb_id: string | null;
    title: string;
    vote_average: string;
    release_date: string;
    genre_ids: number[]; // Change genre_ids to be an array of numbers
    backdrop_path: string;
    randomPercentage: number;
  }
  const genreMap: { [key: number]: string } = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  // Function to get the genre names for a movie
  const getGenreNames = (genreIds: number[]): string[] => {
    return genreIds.map((genreId) => genreMap[genreId]);
  };
  // Function to generate a random percentage between min and max
  const getRandomPercentage = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
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
            movie.id = imdbResponse.data.id || null;
            movie.randomPercentage = getRandomPercentage(0, 100); // Generate a random percentage
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
            {movie.id && (
              <Link
                href={`/movie/${movie.id}`}
                title={`More information about ${movie.title}`}
              >
                <div className="sm:w-[250px] h-[370px] w-[100%] ">
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                    alt={movie.title}
                    className="w-[100%] h-[100%] object-cover "
                  />
                </div>
                <h2 className="text-[#9CA3AF] text-[12px] font-bold">
                  {movie.release_date}
                </h2>
                <h2 className="text-[#4f70b7] text-[18px]">{movie.title}</h2>
                <div>
                  {" "}
                  <Image src={imdb} alt="" width={35} height={17} />
                  <h2 className="text-[#9CA3AF] text-[12px]">
                    {movie.vote_average}/100
                  </h2>
                </div>
                <h2>Genres: {getGenreNames(movie.genre_ids).join(", ")}</h2>
                <h2>Random Percentage: {movie.randomPercentage.toFixed(1)}%</h2>
              </Link>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default FeaturedMovies;
