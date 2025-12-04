import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="col-span-4 pt-3 pb-12 md:pt-6 lg:pt-12 lg:pb-16 md:col-span-8 lg:col-span-12">
      <div className="flex items-center justify-between">
        <Image
          src="/images/logo.svg"
          alt="Weather App"
          width={144}
          height={28}
          priority
          className="w-[138px] md:w-auto h-auto"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="px-3 py-4 text-sm md:text-base bg-(--neutral-800)">
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
