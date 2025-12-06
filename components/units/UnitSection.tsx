"use client";

import {
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import UnitRadioItem from "./UnitRadioItem";
import type { TemperatureUnit, WindSpeedUnit, PrecipitationUnit } from "./types";

type UnitOption = {
  value: string;
  label: string;
};

type UnitSectionProps<T extends TemperatureUnit | WindSpeedUnit | PrecipitationUnit> = {
  label: string;
  options: UnitOption[];
  value: T;
  onValueChange: (value: T) => void;
};

export default function UnitSection<T extends TemperatureUnit | WindSpeedUnit | PrecipitationUnit>({
  label,
  options,
  value,
  onValueChange,
}: UnitSectionProps<T>) {
  return (
    <>
      <DropdownMenuSeparator className="bg-neutral-600" />
      <DropdownMenuLabel className="px-2 py-1.5 text-sm text-neutral-300">
        {label}
      </DropdownMenuLabel>
      <DropdownMenuRadioGroup
        value={value}
        onValueChange={(val) => onValueChange(val as T)}
      >
        {options.map(({ value: optionValue, label: optionLabel }) => (
          <UnitRadioItem
            key={optionValue}
            value={optionValue}
            label={optionLabel}
            selectedValue={value}
          />
        ))}
      </DropdownMenuRadioGroup>
    </>
  );
}

