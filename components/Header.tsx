import Image from "next/image";
import UnitsDropdownMenu from "@/components/units/UnitsDropdownMenu";

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
        <UnitsDropdownMenu />
      </nav>
    </header>
  );
}
