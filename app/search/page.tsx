"use client";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import axios from "axios";



import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

const page = () => {
  

  const [input, setInput] = useState("");
  const router = useRouter();


  interface IMovie {
    poster_path: string;
    title: string;
    release_date: string;
    backdrop_path: string;
   
  }

  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isImgLoading, setIsImgLoading] = useState(false);

  const [movies, setMovies] = useState([]);

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

  return (
    <div className="relative sm:px-24 px-6 pt-32 grid sm:grid-cols-4 w-[100%] bg-black">
      
      {isLoading && <Loading />}
      {movies.map((movie: IMovie, key: number) => {
        return (
          <div key={key}>
           <div className="sm:w-[250px] h-[370px] w-[100%] ">
           <img
                  src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                  alt={movie.title}
                  className="w-[100%] h-[100%] object-cover "
                  onLoad={() => setIsImgLoading(false)}
        
               

                />
            </div>
            {isImgLoading && <Loading />}
            <h5 className="text-white">{movie.title}</h5>
            <h5 className="text-white">{movie.release_date}</h5>
          </div>
        );
      })}
    </div>
  );
};

export default page;