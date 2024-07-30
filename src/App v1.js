import Main from "./components/Main";
import { useState } from "react";
import { tempMovieData, tempWatchedData } from "./movieData";
import Logo from "./components/Logo";
import { SearchBar } from "./components/Search";
import { SearchResults } from "./components/SearchResults";
import { CustomBox } from "./components/AvailableMovieBox";
import MovieList from "./components/MovieList";
import Summary from "./components/Summary";
import WatchedMovieList from "./components/WatchedMovieList";

import NavBar from "./components/NavBar";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavBar>
        {/*component composition using {children} in navBar comp  */}
        <Logo />
        <SearchBar />
        <SearchResults movies={movies} />
      </NavBar>
      <Main>
        <CustomBox>
          <MovieList movies={movies} />
        </CustomBox>
        <CustomBox>
          <Summary watched={watched}>Movies you watched</Summary>
          <WatchedMovieList watched={watched} />
        </CustomBox>
      </Main>
    </>
  );
}
