"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Settings, ChevronDown } from "lucide-react";

const UnitsDropdownMenu = dynamic(
  () => import("@/components/units/UnitsDropdownMenu"),
  {
    ssr: false,
    loading: () => (
      <Button
        className="bg-neutral-800 px-3 py-4 text-sm md:text-base"
        aria-label="Units settings"
      >
        <Settings size={14} aria-hidden="true" />
        Units
        <ChevronDown size={9} aria-hidden="true" />
      </Button>
    ),
  },
);

export default function UnitsDropdownMenuClient() {
  return <UnitsDropdownMenu />;
}
