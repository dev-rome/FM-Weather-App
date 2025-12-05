export type DayInfo = {
  date: string;
  dayName: string;
  shortDayName: string;
};

export type FormattedHourlyData = {
  time: string;
  icon: string;
  iconAlt: string;
  temperature: string;
};

export type GeolocationState = {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
};
