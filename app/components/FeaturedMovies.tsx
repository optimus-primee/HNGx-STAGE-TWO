"use client";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import imdb from "../assests/images/imdb.png";
import Image from "next/image";
import tom from "../assests/images/tom.png";
import { toast } from "react-toastify";
import { FaRegHeart,FaHeart} from "react-icons/fa";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

const FeaturedMovies = () => {
  interface IMovie {
    poster_path: string;
    backdrop_path: string;
    title: string;
    genre_ids: number[];
    original_language: string;
    release_date: string;
    runtime: string;
    vote_average: string;
    overview: string;
    videos: { results: [{ type: string; key: string }] };
    id: string;
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

  const [movies, setMovies] = useState<IMovie[]>([]); // Use an array to store multiple movies
  const [isLoading, setIsLoading] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [trailer, setTrailer] = useState("");
  const [movie, setMovie] = useState<IMovie>();

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=ca0825715c06ebe0d0621ba9ead36000&language=en-US&page=1`
      )
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
    // Generate a random percentage for each movie and add it to the results
    const moviesWithRandomPercentage = movies.map((movie) => ({
      ...movie,
      randomPercentage: getRandomPercentage(0, 100), // Adjust the range as needed
    }));

    // Store the movie results in the state
    setMovies(moviesWithRandomPercentage);
  }, []);

  const [notificationType, setNotificationType] = useState("success");

  // Function to toggle between success and error toast
  const toggleToast = () => {
    if (notificationType === "success") {
      toast.success("E be like you like that film", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error("Omoo,e be like you no like that film ooo", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    // Toggle the notification type
    setNotificationType(notificationType === "success" ? "error" : "success");
  };

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
      
      <div className="sm:hidden flex pt-3 mx-4 w-[100%]"></div>
      {isLoading && <Loading />}
       
        <h2 className="sm:text-[36px] sm:px-24 px-4 text-[28px] font-bold my-8">
          Featured Movie
        </h2>
      <div className="">
        <div className="relative sm:px-24 px-4 pt-32 grid gap-4 sm:grid-cols-4 w-[100%]">
          {movies.slice(0, 10).map((movie) => (
            <div key={movie.id} className="mx-auto flex-none relative" data-testid="movie-card">
              {/* Render movie details for each movie in the 'movies' array */}
              <Link
                href={`/movie/${movie.id}`}
                title={`More information about ${movie.title}`}
              >
                <div className="sm:w-[250px] h-[370px] w-[100%] relative">
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path || movie?.poster_path}`}
                    alt={movie.title}
                    className="w-[100%] h-[100%] object-cover "
                    data-testid="movie-poster"
                    
                    onLoad={() => setIsLoading(false)}
                  />
                  <div className="absolute right-2 top-2 cursor-pointer">
                  <button
                  className={`toggle-button ${
                    notificationType === "success"
                      ? "success-background"
                      : "error-background"
                  }`}
                  onClick={toggleToast}
                >
                  {notificationType === "success" ? (
                    <FaRegHeart  />
                  ) : (
                    < FaHeart className="text-red-500" />
                  )}
                 
                </button>
                  </div>
                </div>
                <h2 className="text-[#9CA3AF] text-[12px] font-bold mt-3" data-testid="movie-release-date">
                  {movie.release_date}
                </h2>
                <h2 className="text-[#4f70b7] text-sm my-3" data-testid="movie-title">{movie.title}</h2>
                <div className="flex justify-between items-center sm:w-[250px] w-[100%]">
                  <div className="flex gap-2 items-center">
                    <Image src={imdb} alt="" width={35} height={17} />
                    <h2 className="text-[#9CA3AF] text-[12px]">
                      {movie.vote_average}/100
                    </h2>
                  </div>
                  <div className="flex gap-2">
                    <Image src={tom} alt="" width={16} height={17} />
                    <h2 className="text-[#9CA3AF] text-[12px]">20%</h2>
                  </div>
                </div>
                <h2 className="text-[#9CA3AF] text-[12px] font-bold mt-3">
                  {getGenreNames(movie.genre_ids).join(", ")}
                </h2>
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

export default FeaturedMovies;
