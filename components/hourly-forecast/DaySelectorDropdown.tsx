"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import type { DaySelectorDropdownProps } from "@/types/components";

export default function DaySelectorDropdown({
  selectedDay,
  onDayChange,
  availableDays,
}: DaySelectorDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-neutral-600 text-base" aria-label="Select day">
          {selectedDay}
          <ChevronDown size={12} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-neutral-600 bg-neutral-800">
        <DropdownMenuRadioGroup value={selectedDay} onValueChange={onDayChange}>
          {availableDays.map((day) => (
            <DropdownMenuRadioItem
              key={day}
              value={day}
              className="cursor-pointer px-2 py-2.5 hover:bg-neutral-700 data-[state=checked]:bg-neutral-700 [&>span]:hidden"
            >
              {day}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
