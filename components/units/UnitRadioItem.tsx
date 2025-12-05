"use client";

import { DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { Check } from "lucide-react";

type UnitRadioItemProps<T extends string> = {
  value: T;
  label: string;
  selectedValue: T;
};

export default function UnitRadioItem<T extends string>({
  value,
  label,
  selectedValue,
}: UnitRadioItemProps<T>) {
  const isSelected = value === selectedValue;

  return (
    <DropdownMenuRadioItem
      value={value}
      className="cursor-pointer px-2 py-2.5 data-[state=checked]:bg-neutral-700 [&>span]:hidden"
    >
      <div className="flex w-full items-center justify-between">
        <span className="text-base font-medium">{label}</span>
        {isSelected && <Check size={14} className="text-neutral-0" />}
      </div>
    </DropdownMenuRadioItem>
  );
}
