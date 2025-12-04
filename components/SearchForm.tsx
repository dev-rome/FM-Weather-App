import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

export default function SearchForm() {
  return (
    <section
      aria-label="Search for location"
      className="col-span-4 md:col-span-8 lg:col-span-12"
    >
      <form className="mx-auto flex flex-col gap-3 pb-8 md:max-w-xl md:flex-row md:gap-4 lg:pb-12">
        <InputGroup className="border-none bg-(--neutral-800) text-(--neutral-200)">
          <label htmlFor="location-search" className="sr-only">
            Search for a place
          </label>
          <InputGroupInput
            id="location-search"
            placeholder="Search for a place..."
            aria-label="Location search input"
          />
          <InputGroupAddon aria-hidden="true">
            <SearchIcon aria-hidden="true" />
          </InputGroupAddon>
        </InputGroup>
        <Button
          type="submit"
          className="bg-(--blue-500) py-4 text-lg font-medium hover:bg-(--blue-700)"
        >
          Search
        </Button>
      </form>
    </section>
  );
}
