import { useState, useEffect } from "react";
import { getCitySuggestions } from "@/app/actions/search";
import type { CitySuggestion } from "@/types/search";

export function useCitySuggestions(searchQuery: string) {
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const updateSuggestions = () => {
      if (searchQuery.trim().length < 2) {
        setSuggestions([]);
        setOpen(false);
        return;
      }

      getCitySuggestions(searchQuery.trim()).then((results) => {
        if (!isCancelled) {
          setSuggestions(results);
          setOpen(results.length > 0);
        }
      });
    };

    const timeoutId = setTimeout(updateSuggestions, 300); // Debounce for 300ms

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [searchQuery]);

  return { suggestions, open, setOpen };
}
