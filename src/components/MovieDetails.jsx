import { useState, useEffect, useRef } from "react";
import { StarRating } from "./StarRating";
import { useKey } from "../customHooks/useKey";
import { Loading } from "./Loading";
import { APIKEY } from "../ApiKey";

export function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) {
      countRef.current += 1;
    }
  }, [userRating]);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre
  } = movie;

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  //console.log(watchedUserRating);

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const request = await fetch(
        `https://www.omdbapi.com/?i=${selectedId}&apikey=${APIKEY}`
      );
      const response = await request.json();
      setMovie(response);
      setIsLoading(false);
    }
    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (title) {
      document.title = `Movie | ${title}`;
    }
    //on component unmount set the default title
    return () => {
      document.title = "🍿usePopcorn";
      // console.log("cleanup function run!");
    };
  }, [title]);

  useKey("Escape", onCloseMovie);

  function handleAddWatch() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      userRating,
      poster,
      imdbRating: Number(imdbRating),
      runtime: runtime.split(" ").at(0),
      countRatingDecisions: countRef.current
    };
    //console.log(newWatchedMovie);
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  function addRatingHandler(selectedRating) {
    setUserRating(selectedRating);
  }

  return (
    <div className="details">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
              <p>Released Year: {year}</p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onAddRating={addRatingHandler}
                  />
                  {userRating && (
                    <button className="btn-add" onClick={handleAddWatch}>
                      Add to list
                    </button>
                  )}{" "}
                </>
              ) : (
                <p>
                  You rated this movie with {watchedUserRating} <span>⭐</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
