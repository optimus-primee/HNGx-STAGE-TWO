"use client";
import React, { useEffect, useRef, useState } from "react";
import { Sliderdata } from "../data/SliderData";
import Image from "next/image";
import axios from "axios";
import Loading from "../components/Loading";
import { Button } from "../components/buttons/button";
import play from "../assests/images/Play.svg";
import imdb from "../assests/images/imdb.png";
import tom from "../assests/images/tom.png";

const Slider:React.FC=() =>{
  const [current, setCurrent] = useState(0);
  const length = Sliderdata.length;
  const timeout = useRef<null | NodeJS.Timeout>(null);

  useEffect(() => {
    const nextSlide = () => {
      setCurrent((current) => (current === length - 1 ? 0 : current + 1));
    };
    timeout.current = setTimeout(nextSlide, 3000);
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [current, length]);

  const [isLoading, setIsLoading] = useState(false);
  const [isImgLoading, setIsImgLoading] = useState(false);

  const [movies, setMovies] = useState([]);

  interface IMovie {
    backdrop_path: string;
    title: string;
    overview: string;
    release_date: string;
  }

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setIsImgLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=ca0825715c06ebe0d0621ba9ead36000&language=en-US&page=1`
        );
        setMovies(response.data.results.slice(1, 8));
        setIsLoading(false);
        console.log(response.data.results.slice(1, 8));
      } catch (error) {
        console.error("Error fetching movies:", error);
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="">
      {movies.map((movie: IMovie, index: number) => {
        return (
          <div className="z-1 w-[100%] sm:h-[100%] h-[100%] overflow-hidden" key={index}>
            {index === current && (
              <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute top-0 left-0 w-[100%] sm:h-[100vh] h-[100vh] ">
                 <img
                  src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                  alt={movie.title}
                  className="w-[100%] h-[100%] object-cover "
                  onLoad={() => setIsImgLoading(false)}
        
               

                />
                
                {isImgLoading && <Loading />}
                <div className="absolute top-[30%]  text-white z-10 sm:px-24 ss:px-8 xs:px-5 px-4 ">
                  <h1 className="capitalize text-[48px] sm:w-[400px] h-[60px] overflow-hidden">
                    {movie.title}
                  </h1>
                  <div className="flex items-center gap-8 mt-4">
                    <div className="flex items-center gap-2">
                      <Image src={imdb} alt="" width={35} height={17} />
                      <h5 className="text-[12px]">86.0/100</h5>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src={tom} alt="" width={16} height={17} />
                      <h5 className="text-[12px]">97%</h5>
                    </div>
                  </div>
                  <p className="sm:w-[300px] h-[80px] overflow-hidden   text-sm my-4">
                    {movie.overview}
                  </p>
                  <Button
                    type="button"
                    variant="primary"
                    imgSrc={play}
                    imgAlt="play"
                  >
                    Watch Trailer
                  </Button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Slider;
