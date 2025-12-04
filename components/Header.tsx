import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
              <Image
                src="/images/icon-units.svg"
                alt="Units"
                width={14}
                height={14}
                priority
                className="w-auto h-auto"
              />
              Units
              <Image
                src="/images/icon-dropdown.svg"
                alt="Chevron Down"
                width={9}
                height={14}
                priority
                className="w-auto h-auto"
              />
            </Button>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </div>
    </header>
  );
}
