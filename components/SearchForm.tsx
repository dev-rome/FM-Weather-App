"use client";

import { useState, useTransition } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { useWeather } from "@/contexts/WeatherContext";
import { searchWeather } from "@/app/actions/weather";
import type { CitySuggestion } from "@/types/search";
import { useCitySuggestions } from "@/hooks/useCitySuggestions";
import { formatCityName } from "@/lib/search-utils";
import SearchAutocomplete from "./search-form/SearchAutocomplete";

export default function SearchForm() {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { setWeatherData } = useWeather();
  const { suggestions, open, setOpen } = useCitySuggestions(searchQuery);

  const handleSearch = (cityName: string) => {
    setError(null);
    setOpen(false);

    startTransition(async () => {
      const result = await searchWeather(cityName.trim());

      if (result.error) {
        setError(result.error);
      } else if (result.data) {
        setWeatherData(result.data);
        setSearchQuery("");
      }
    });
  };

  const handleSelectCity = (city: CitySuggestion) => {
    const cityName = formatCityName(city);
    setSearchQuery(cityName);
    handleSearch(cityName);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      return;
    }

    handleSearch(searchQuery);
  };

  return (
    <section
      aria-label="Search for location"
      className="col-span-4 md:col-span-8 lg:col-span-12"
    >
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex flex-col gap-3 pb-8 md:max-w-xl md:flex-row md:gap-4 lg:pb-12"
      >
        <div className="relative flex-1">
          <SearchAutocomplete
            open={open}
            onOpenChange={setOpen}
            suggestions={suggestions}
            onSelectCity={handleSelectCity}
          >
            <div className="relative">
              <InputGroup className="border-none bg-neutral-800 text-neutral-200">
                <label htmlFor="location-search" className="sr-only">
                  Search for a place
                </label>
                <InputGroupInput
                  id="location-search"
                  placeholder="Search for a place..."
                  aria-label="Location search input"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setError(null);
                  }}
                  onFocus={() => {
                    if (suggestions.length > 0) {
                      setOpen(true);
                    }
                  }}
                  disabled={isPending}
                  autoComplete="off"
                />
                <InputGroupAddon aria-hidden="true">
                  <SearchIcon aria-hidden="true" />
                </InputGroupAddon>
              </InputGroup>
            </div>
          </SearchAutocomplete>
        </div>

        {error && (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        )}
        <Button
          type="submit"
          className="bg-blue-500 py-4 text-lg font-medium hover:bg-blue-700 disabled:opacity-50"
          disabled={isPending || !searchQuery.trim()}
        >
          {isPending ? "Searching..." : "Search"}
        </Button>
      </form>
    </section>
  );
}
