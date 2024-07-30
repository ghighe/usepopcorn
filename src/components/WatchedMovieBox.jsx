import { useState } from "react";
import Box from "../components/Box";
import Button from "../components/Button";

export const WatchedMovieBox = () => {
  const [isOpen2, setIsOpen2] = useState(true);

  const watchedMovieBtn = () => setIsOpen2((open) => !open);

  return (
    <Box>
      <Button onClick={watchedMovieBtn}>{isOpen2 ? "–" : "+"}</Button>
      {isOpen2 && <></>}
    </Box>
  );
};
