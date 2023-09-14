// components/MovieDetails.js


import Link from "next/link";
import { AiFillPlayCircle } from "react-icons/ai";
interface IMovie {
    poster_path: string;
    id: string;
    imdb_id: string;
    title: string;
    vote_average: number;
    release_date: string;
    genre_ids: [
      {
        name: string;
        id: string;
      }
    ];
    runtime:string;
    overview:string;
    backdrop_path:string;
  

  }
function MovieDetail({ movie }: { movie: IMovie }) {
  const formatDateToUTC = (dateString:string) => {
    const date = new Date(dateString);
    const utcDateString = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getUTCDate().toString().padStart(2, "0")}`;
    return utcDateString;
  };
  return (
    <div>
      <div
        className="banner-single"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(https://image.tmdb.org/t/p/w1280/${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "60vh",
          backgroundColor: "#000",
        }}
        key={movie.id}
      >
  
        <div className="movie-inner" style={{ zIndex: 20 }}>
          <Link href="#" className="banner-btn">
            <AiFillPlayCircle className="icon" />
            <p>Watch Trailer</p>
          </Link>
        </div>
      </div>
      <div className="movie-details">
        <h2 data-testid="movie-title">{movie.title}</h2>
        <p data-testid="movie-release-date" className="release">
          {`Release Date (UTC): ${formatDateToUTC(movie.release_date)} `}
        </p>
        <p data-testid="movie-runtime" className="release">
          Runtime: {movie.runtime} minutes
        </p>
        <p data-testid="movie-overview">{movie.overview}</p>
      </div>

    </div>
  );
}

export default MovieDetail;
