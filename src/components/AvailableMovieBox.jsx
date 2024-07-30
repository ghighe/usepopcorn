import { useState } from "react";
import Box from "../components/Box";
import Button from "../components/Button";

export const CustomBox = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const movieBtnToggle = () => setIsOpen((open) => !open);

  return (
    <Box>
      <Button onClick={movieBtnToggle}>{isOpen ? "–" : "+"}</Button>
      {isOpen && children}
    </Box>
  );
};
