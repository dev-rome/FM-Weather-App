"use client";

import type { SearchAutocompleteProps } from "@/types/components";
import { formatCityName } from "@/lib/search-utils";
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

export default function SearchAutocomplete({
  open,
  onOpenChange,
  suggestions,
  onSelectCity,
  children,
}: SearchAutocompleteProps) {
  return (
    <Popover open={open} onOpenChange={onOpenChange} modal={false}>
      <PopoverAnchor asChild>{children}</PopoverAnchor>
      <PopoverContent
        className="w-(--radix-popover-trigger-width) border-0 p-0 mt-2"
        align="start"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onInteractOutside={(e) => {
          const target = e.target as HTMLElement;
          if (
            target.closest("#location-search") ||
            target.closest('[id="location-search"]')
          ) {
            e.preventDefault();
          }
        }}
      >
        <Command className="border-0 bg-neutral-800" shouldFilter={false}>
          <CommandList>
            <CommandEmpty>No cities found.</CommandEmpty>
            <CommandGroup>
              {suggestions.map((city) => {
                const cityName = formatCityName(city);

                return (
                  <CommandItem
                    key={`${city.lat}-${city.lon}`}
                    value={cityName}
                    onSelect={() => onSelectCity(city)}
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
  );
}
