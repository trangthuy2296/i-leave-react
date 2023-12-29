import { useState } from "react";

export const useLocalStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);

      if (value !== null) {
        console.log(`Retrieved ${keyName} from localStorage:`, JSON.parse(value));
        return JSON.parse(value);
      } else {
        console.log(`No ${keyName} found in localStorage. Setting default value:`, defaultValue);
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      console.error(`Error in useLocalStorage (${keyName}):`, err);
      return defaultValue;
    }
  });

  const setValue = (newValue) => {
    try {
      console.log(`Setting ${keyName} in localStorage:`, newValue);
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      console.error(`Error setting ${keyName} in localStorage:`, err);
    }
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};