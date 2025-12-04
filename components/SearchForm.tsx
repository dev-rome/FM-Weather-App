import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

export default function SearchForm() {
  return (
    <form className="flex flex-col gap-3 md:flex-row md:gap-4 md:max-w-xl mx-auto">
      <InputGroup className="bg-(--neutral-800) text-(--neutral-200) border-none">
        <InputGroupInput placeholder="Search for a place..." />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
      <Button className="bg-(--blue-500) font-medium py-4 text-lg hover:bg-(--blue-700)">
        Search
      </Button>
    </form>
  );
}
