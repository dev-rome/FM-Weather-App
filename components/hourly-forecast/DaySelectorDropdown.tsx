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

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type DaySelectorDropdownProps = {
  selectedDay: string;
  onDayChange: (day: string) => void;
};

export default function DaySelectorDropdown({
  selectedDay,
  onDayChange,
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
          {days.map((day) => (
            <DropdownMenuRadioItem
              key={day}
              value={day}
              className="cursor-pointer pl-2 data-[state=checked]:bg-neutral-700 [&>span]:hidden"
            >
              {day}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
