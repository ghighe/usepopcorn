import Main from "./components/Main";
import { useState } from "react";
import { Loading } from "./components/Loading";
import Logo from "./components/Logo";
import { MovieDetails } from "./components/MovieDetails";
import { SearchBar } from "./components/Search";
import { SearchResults } from "./components/SearchResults";
import { CustomBox } from "./components/AvailableMovieBox";
import MovieList from "./components/MovieList";
import Summary from "./components/Summary";
import WatchedMovieList from "./components/WatchedMovieList";
import NavBar from "./components/NavBar";
import { useMovies } from "./customHooks/useMovies";
import { ErrorMessage } from "./components/ErrorMessage";
import { useLocalStorageState } from "./customHooks/useLocalStorageState";

export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");

  //custom hooks
  const [isLoading, movies, error] = useMovies(query, handleCloseMovie);
  const [watched, setWatched] = useLocalStorageState([], "watchedMovies");

  function handleSelectedMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
    // localStorage.setItem("watchedMovies", JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        {/*component composition using {children} in navBar comp  */}
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <SearchResults movies={movies} />
      </NavBar>
      <Main>
        <CustomBox>
          {isLoading && <Loading />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectedMovie={handleSelectedMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </CustomBox>
        <CustomBox>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched}>Movies you watched</Summary>
              <WatchedMovieList
                watched={watched}
                onDeletedWatchedMovie={handleDeleteWatched}
              />
            </>
          )}
        </CustomBox>
      </Main>
    </>
  );
}
