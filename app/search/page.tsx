"use client";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Search from "../components/Search";
import imdb from "../assests/images/imdb.png"
import tom from "../assests/images/tom.png";
import menu from "../assests/images/menu.svg";
import tv from "../assests/images/tv.png";

import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

const page = () => {
  const [input, setInput] = useState("");
  const router = useRouter();

  const searchMovie = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`search?movie=${input}`);
    setInput("");
  };

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
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isImgLoading, setIsImgLoading] = useState(false);

  const [movies, setMovies] = useState<IMovie[] | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setIsImgLoading(true);

    let searchMovie = searchParams.get("movie");

    if (searchMovie === null) {
      searchMovie = "avengers";
    }

    axios
      .get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: "ca0825715c06ebe0d0621ba9ead36000",
          query: searchMovie,
        },
      })
      .then((res) => {
        setMovies(res.data.results);
        setIsLoading(false);
        console.log(res.data.results);
      });
  }, []);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: "ca0825715c06ebe0d0621ba9ead36000",
          query: searchMovie,
        },
      })

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
    <div className="sm:px-24 px-6 ">
      <div className="py-4 lg:px-24  px-4 sm:flex hidden justify-between items-center">
        <Link href="/">
          <div className="flex gap-6 items-center  ">
            <Image src={tv} width={50} height={50} alt="" />
            <h3 className="sm:flex hidden text-[24px] font-bold text-[#FFF]">
              MovieBox
            </h3>
          </div>
        </Link>

        <div>
          <div className="sm:flex hidden">
            <Search />
          </div>
        </div>
        <div>
          <div className="flex sm:gap-7 xs:gap-5 gap-4 items-center">
            <h3 className="text-[#FFF] text-base sm:flex hidden">Sign in</h3>
            <div className="p-[6px] rounded-full bg-[#BE123C] cursor-pointer">
              <Image src={menu} width={24} height={24} alt="" />
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={searchMovie}>
        <div className="pt-4 sm:hidden flex">
          <div className="sm:w-[512px] w-[100%] h-[36px] border-[2px] rounded-[6px] border-[#D1D5DB] flex justify-between items-center px-3 mt-4">
            <input
              className="w-[100%] h-[100%]  text-white bg-transparent outline-none"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </div>
      </form>

      <div className="relative sm:px-24 px-4 pt-32 grid sm:grid-cols-4 w-[100%] bg-black">
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
                  <h2 className="text-[#9CA3AF] text-[12px] font-bold mt-3">
                    {movie.release_date}
                  </h2>
                  <h2 className="text-[#4f70b7] text-sm my-3">{movie.title}</h2>
                  <div className="flex justify-between items-center sm:w-[250px] w-[100%]">
                    <div className="flex gap-2 items-center">
                      <Image src={imdb} alt="" width={35} height={17} />
                      <h2 className="text-[#9CA3AF] text-[12px]">
                        {movie.vote_average}/100
                      </h2>
                    </div>
                    <div className="flex gap-2">
                      <Image src={tom} alt="" width={16} height={17} />
                      
                    </div>
                  </div>
                  <h2 className="text-[#9CA3AF] text-[12px] font-bold mt-3">
                    {getGenreNames(movie.genre_ids).join(", ")}
                  </h2>
                </Link>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default page;
