"use client"
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios from "axios";

import { BsPlayFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import dynamic from "next/dynamic";
import Search from "../components/Search";
import Navbar from "../components/Navbar";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

const Page = () => {
  interface IMovie {
    poster_path: string;
    backdrop_path: string;
    title: string;
    genres: [
      {
        name: string;
        id: string;
      }
    ];
    original_language: string;
    release_date: string;
    runtime: string;
    vote_average: string;
    overview: string;
    videos: { results: [{ type: string; key: string }] };
    id: string;
  }

  const searchParams = useSearchParams();

  const [movies, setMovies] = useState<IMovie[]>([]); // Use an array to store multiple movies
  const [isLoading, setIsLoading] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [trailer, setTrailer] = useState("");
  const [movie, setMovie] = useState<IMovie>();

  useEffect(() => {
    setIsLoading(true);

    let searchMovie = searchParams.get("movie");

    if (searchMovie === null) {
      searchMovie = "avengers";
    }

    axios
      .get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: 'ca0825715c06ebe0d0621ba9ead36000',
          query: searchMovie,
        },
      })
      .then((res) => {
        // Extract the array of movie results
        const movieResults = res?.data?.results || [];

        // Store the movie results in the state
        setMovies(movieResults);

        // Assuming you want to load details for the first movie initially
        if (movieResults.length > 0) {
          loadMovieDetails(movieResults[0].id);
        } else {
          setIsLoading(false);
        }
      });
  }, [searchParams]);

  const loadMovieDetails = (movieId: number) => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=ca0825715c06ebe0d0621ba9ead36000&append_to_response=videos`
      )
      .then((res) => {
        setMovie(res.data);
        setIsLoading(false);
        console.log(res.data);
      });
  };

  return (
    <div className="">
      <div className="sm:hidden flex pt-3 mx-4 w-[100%]">
        <Search />
      </div>
      <div className="sm:flex hidden pt-3 mx-4 w-[100%]">
        <Navbar/>
      </div>
      {isLoading && <Loading />}

      <div className="">
        <div className="relative sm:px-24 px-4 pt-32 grid gap-4 sm:grid-cols-4 w-[100%]">
          {movies.map((movie) => (
            <div key={movie.id} className="mx-auto flex-none relative" data-testid="movie-card">
              {/* Render movie details for each movie in the 'movies' array */}
              <Link
                href={`/movie/${movie.id}`}
                title={`More information about ${movie.title}`}
              >
                <div className="sm:w-[250px] h-[370px] w-[100%] ">
                  <img
                    src={`https://image.tmdb.org/t/p/original${ movie.backdrop_path || movie.poster_path}`}
                    alt={movie.title}
                    className="w-[100%] h-[100%] object-cover "
                    onLoad={() => setIsLoading(false)} // Update isImgLoading here
                    data-testid="movie-poster"
                  />
                </div>
                <h2 className="text-[#9CA3AF] text-[12px] font-bold mt-3" data-testid="movie-release-date">
                  {movie.release_date}
                </h2>
                <h2 className="text-[#4f70b7] text-sm my-3" data-testid="movie-title">{movie.title}</h2>
              </Link>
            </div>
          ))}

          {/* ... Other movie details */}
        </div>

        {/* ... React Player */}
      </div>
    </div>
  );
};

export default Page;
