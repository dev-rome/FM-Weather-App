import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="col-span-4 pt-3 pb-12 md:col-span-8 md:pt-6 lg:col-span-12 lg:pt-12 lg:pb-16">
      <nav
        className="flex items-center justify-between"
        aria-label="Main navigation"
      >
        <Image
          src="/images/logo.svg"
          alt="Weather App"
          width={144}
          height={28}
          priority
          fetchPriority="high"
          className="h-auto w-[138px] md:w-auto"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="bg-(--neutral-800) px-3 py-4 text-sm md:text-base"
              aria-label="Units settings"
            >
              <Settings size={14} aria-hidden="true" />
              Units
              <ChevronDown size={9} aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </nav>
    </header>
  );
}
