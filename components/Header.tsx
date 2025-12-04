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
      <div className="flex items-center justify-between">
        <Image
          src="/images/logo.svg"
          alt="Weather App"
          width={144}
          height={28}
          priority
          className="h-auto w-[138px] md:w-auto"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-(--neutral-800) px-3 py-4 text-sm md:text-base">
              <Settings size={14} />
              Units
              <ChevronDown size={9} />
            </Button>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </div>
    </header>
  );
}
