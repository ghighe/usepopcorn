import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(() => {
    function onKeyboardKeyPressed(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }

    document.addEventListener("keypress", onKeyboardKeyPressed);

    return () => {
      document.removeEventListener("keypress", onKeyboardKeyPressed);
      // console.log("cleanup eventListener");
    };
  }, [action, key]);
}
