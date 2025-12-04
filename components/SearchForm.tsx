import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

export default function SearchForm() {
  return (
    <form className="mx-auto flex flex-col gap-3 pb-8 md:max-w-xl md:flex-row md:gap-4 lg:pb-12">
      <InputGroup className="border-none bg-(--neutral-800) text-(--neutral-200)">
        <InputGroupInput placeholder="Search for a place..." />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
      <Button className="bg-(--blue-500) py-4 text-lg font-medium hover:bg-(--blue-700)">
        Search
      </Button>
    </form>
  );
}
