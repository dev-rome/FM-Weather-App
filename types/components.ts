import type { CitySuggestion } from "./search";

/**
 * Component prop types
 */

export type SearchAutocompleteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  suggestions: CitySuggestion[];
  onSelectCity: (city: CitySuggestion) => void;
  children: React.ReactNode;
};

export type WeatherMetric = {
  label: string;
  value: string;
};

export type DailyForecastItemProps = {
  day: string;
  icon: string;
  iconAlt: string;
  highTemp: string;
  lowTemp: string;
};

export type HourlyForecastItemProps = {
  time: string;
  icon: string;
  iconAlt: string;
  temperature: string;
};

export type WeatherDetailsItemProps = {
  label: string;
  value: string;
};

export type DaySelectorDropdownProps = {
  selectedDay: string;
  onDayChange: (day: string) => void;
  availableDays: string[];
};

export type UnitRadioItemProps<T extends string> = {
  value: T;
  label: string;
  selectedValue: T;
};
