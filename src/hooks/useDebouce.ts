import { useState, useEffect } from "react";

/**
 * Custom hook that debounces a value.
 *
 * @param value - The value to be debounced.
 * @param delay - The delay in milliseconds before the value is updated.
 * @returns The debounced value.
 */
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
