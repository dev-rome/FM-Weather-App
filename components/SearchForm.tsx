"use client";

import { useState, useTransition, useEffect } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { useWeather } from "@/contexts/WeatherContext";
import { searchWeather } from "@/app/actions/weather";
import { getCitySuggestions, type CitySuggestion } from "@/app/actions/search";
import {
  Popover,
  PopoverContent,
  PopoverAnchor,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export default function SearchForm() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { setWeatherData } = useWeather();

  // Fetch suggestions as user types
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

  const handleSelectCity = (city: CitySuggestion) => {
    const cityName = city.state
      ? `${city.name}, ${city.state}, ${city.country}`
      : `${city.name}, ${city.country}`;
    
    setSearchQuery(cityName);
    setOpen(false);
    setError(null);

    startTransition(async () => {
      const result = await searchWeather(cityName);
      
      if (result.error) {
        setError(result.error);
      } else if (result.data) {
        setWeatherData(result.data);
        setSearchQuery("");
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      return;
    }

    setError(null);
    setOpen(false);

    startTransition(async () => {
      const result = await searchWeather(searchQuery.trim());

      if (result.error) {
        setError(result.error);
      } else if (result.data) {
        setWeatherData(result.data);
        setSearchQuery("");
      }
    });
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
          <Popover open={open} onOpenChange={setOpen} modal={false}>
            <PopoverAnchor asChild>
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
            </PopoverAnchor>
            <PopoverContent
              className="w-(--radix-popover-trigger-width) p-0 border-0"
              align="start"
              onOpenAutoFocus={(e) => e.preventDefault()}
              onInteractOutside={(e) => {
                // Don't close if clicking on the input
                const target = e.target as HTMLElement;
                if (target.closest('#location-search') || target.closest('[id="location-search"]')) {
                  e.preventDefault();
                }
              }}
            >
            <Command 
              className="bg-neutral-800 border-0"
              shouldFilter={false}
            >
              <CommandList>
                <CommandEmpty>No cities found.</CommandEmpty>
                <CommandGroup>
                  {suggestions.map((city) => {
                    const cityName = city.state
                      ? `${city.name}, ${city.state}, ${city.country}`
                      : `${city.name}, ${city.country}`;
                    
                    return (
                      <CommandItem
                        key={`${city.lat}-${city.lon}`}
                        value={cityName}
                        onSelect={() => handleSelectCity(city)}
                        className="cursor-pointer hover:bg-neutral-700"
                      >
                        <span className="font-medium">{cityName}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
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
