// components/MovieDetails.js

import { Button } from "../components/buttons/button";
import Link from "next/link";
import { AiFillPlayCircle } from "react-icons/ai";
import Sidebar from "./sidebar";

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
  runtime: number;
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
  return (
    <div className="grid grid-cols-6  gap-5">
      <div className="col-span-1">
        <Sidebar />
      </div>
      <div className="col-span-5 py-8 pr-6">
        <div className=" w-[100%] h-[370px]">
          <img
            src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
            alt={movie.title}
            className="w-[100%] h-[100%] object-cover rounded-[20px] "
          />
        </div>
        <div className="grid grid-cols-6 ">
          <div className="col-span-4">
           <div className="flex gap-3">
           <h5>{movie.title}</h5> •
            <p data-testid="movie-release-date" className="release">
          {`${formatDateToUTC(movie.release_date)} (UTC)`}
        </p>•
        <p data-testid="movie-runtime" className="release">
          Runtime: {movie.runtime} minutes
        </p>
   
       
           </div>
            <p className="text-[16px] my-3">
            {movie.overview}
            </p>
            <div>
              <h5>Director : Joseph Kosinski</h5>
              <h5>Director : Joseph Kosinski</h5>
              <h5>Director : Joseph Kosinski</h5>
            </div>
            <div className="flex">
              <Button type="button" variant="primary" paddingLess={true} className="px-5 py-3" >
                Top rated movie #65
              </Button>
              <Button type="button" variant="primary" paddingLess={true} className="px-5 py-3">
                Top rated movie #65
              </Button>
            </div>
          </div>
          <div className="col-span-2 px-8">
            <div className="flex flex-col">
              <Button type="button" variant="primary" paddingLess={true}  className="px-5 py-3">
              See Showtimes
              </Button>
              <Button type="button" variant="primary" paddingLess={true} className="px-5 py-3">
              More watch options
              </Button>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
