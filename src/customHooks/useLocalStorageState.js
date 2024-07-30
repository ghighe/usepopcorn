import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(() => {
    const getStoredValue = localStorage.getItem(key);
    return getStoredValue ? JSON.parse(getStoredValue) : initialState;
  });

  useEffect(() => {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
      console.log("localstorage customHook effect run");
    }
  }, [value, key]);

  return [value, setValue];
}
