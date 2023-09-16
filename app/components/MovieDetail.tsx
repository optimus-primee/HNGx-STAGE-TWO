// components/MovieDetails.js
"use client"
import { Button } from "../components/buttons/button";
import Link from "next/link";
import { AiFillPlayCircle } from "react-icons/ai";
import Sidebar from "./sidebar";
import * as PiIcons from "react-icons/pi";
import { useState } from "react";

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
  overview: string;
  director: string;
  runtime: number;
  adult:boolean;
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

function MovieDetail({ movie }: { movie: IMovie }) {
  const formatDateToUTC = (dateString: string) => {
    const date = new Date(dateString);
    const utcDateString = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getUTCDate().toString().padStart(2, "0")}`;
    return utcDateString;
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="grid sm:grid-cols-6 sm:gap-5">
      <div className="col-span-1">
        <Sidebar />
      </div>
      <div className="col-span-5 sm:pt-3 pt-5 sm:pr-6 px-4 sm:px-0">
        <div className=" w-[100%] sm:h-[370px] h-[200px]">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
            alt={movie.title}
            className="w-[100%] h-[100%] object-cover rounded-[20px] "
            data-testid="movie-poster"
          />
        </div>
        <div className="grid sm:grid-cols-6 ">
          <div className="col-span-4 mt-3">
            <div className="flex sm:flex-row flex-col gap-3">
              <h5 data-testid="movie-title">{movie.title}</h5> <span className="hidden sm:flex">•</span>
              <span>{movie.adult === false ? "PG-13" : "18+"}</span>
              <p data-testid="movie-release-date">
                {`${formatDateToUTC(movie.release_date)} `}
              </p>
              <span>(UTC)</span>
              <span className="hidden sm:flex">•</span>
              <p data-testid="movie-runtime">
                 {movie.runtime} 
              </p>
              <span>Minutes</span>
            </div>
            <p className="text-[15px] my-2 " data-testid="movie-overview">{movie.overview}</p>
            <div>
              <h5 className="my-1 ">Director : <span className="text-[#BE123C]">Joseph Kosinski</span></h5>
              <h5 className="my-1 ]">Director : <span className="text-[#BE123C]">Jim Cash, Jack Epps Jr,  Peter Craig</span></h5>
              <h5 className="my-1">Director : <span className="text-[#BE123C]">Tom Cruise, Jennifer Connelly</span></h5>
    
            </div>
            <div className="flex gap-3 sm:flex-row flex-col sm:items-center mb-3">
              <Button
                type="button"
                variant="primary"
                paddingLess={true}
                className="px-5 py-3"
              >
                Top rated movie #65
              </Button>
              <div className="relative cursor-pointer   ">
                <div
                  className="flex justify-center items-center gap-3   "
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  <h6 className="">Awards 9 nominations</h6>
                  {!isOpen ? (
                    <PiIcons.PiCaretDownBold />
                  ) : (
                    <PiIcons.PiCaretUpBold />
                  )}
                </div>
                {isOpen && (
                  <div className="absolute bg-[#BE123C] shadow-[0_4px_6px_-2px_rgba(0,0,0,0.3)] rounded-[4px] top-10 left-0  flex col items-start p-2 w-[200px]">
                    <div className="w-full flex flex-col">
                      <div className="hover:bg-blue-300 cursor-pointer border-l-transparent hover:border-l-white border-l-4 w-full ">
                        <h6>Awards 9 nominations</h6>
                      </div>
                      <div className="hover:bg-blue-300 cursor-pointer border-l-transparent hover:border-l-white border-l-4 w-full ">
                        <h6>Awards 9 nominations</h6>
                      </div>
                      
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="sm:col-span-2 sm:grid hidden sm:px-8 ">
            <div className="flex flex-col sm:gap-3 mt-3">
              <Button
                type="button"
                variant="primary"
                paddingLess={true}
                className="px-5 py-3"
              >
                See Showtimes
              </Button>
              <Button
                type="button"
                variant="primary"
                paddingLess={true}
                className="px-5 py-3"
              >
                More watch options
              </Button>
          
       
            </div>
            
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
