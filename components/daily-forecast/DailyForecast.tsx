import DailyForecastItem from "./DailyForecastItem";

type DailyForecastData = {
  day: string;
  icon: string;
  iconAlt: string;
  highTemp: string;
  lowTemp: string;
};

const dailyForecast: DailyForecastData[] = [
  {
    day: "Tue",
    icon: "/images/icon-rain.webp",
    iconAlt: "Rain",
    highTemp: "20°",
    lowTemp: "14°",
  },
  {
    day: "Wed",
    icon: "/images/icon-rain.webp",
    iconAlt: "Rain",
    highTemp: "21°",
    lowTemp: "15°",
  },
  {
    day: "Thu",
    icon: "/images/icon-sunny.webp",
    iconAlt: "Sunny",
    highTemp: "24°",
    lowTemp: "14°",
  },
  {
    day: "Fri",
    icon: "/images/icon-partly-cloudy.webp",
    iconAlt: "Partly cloudy",
    highTemp: "25°",
    lowTemp: "13°",
  },
  {
    day: "Sat",
    icon: "/images/icon-storm.webp",
    iconAlt: "Storm",
    highTemp: "21°",
    lowTemp: "15°",
  },
  {
    day: "Sun",
    icon: "/images/icon-snow.webp",
    iconAlt: "Snow",
    highTemp: "25°",
    lowTemp: "16°",
  },
  {
    day: "Mon",
    icon: "/images/icon-fog.webp",
    iconAlt: "Fog",
    highTemp: "24°",
    lowTemp: "15°",
  },
];

export default function DailyForecast() {
  return (
    <article aria-label="Daily forecast">
      <h2 className="mb-5 text-xl font-semibold">Daily forecast</h2>
      <div className="grid grid-cols-3 gap-4 md:grid-cols-7">
        {dailyForecast.map(({ day, icon, iconAlt, highTemp, lowTemp }) => (
          <DailyForecastItem
            key={day}
            day={day}
            icon={icon}
            iconAlt={iconAlt}
            highTemp={highTemp}
            lowTemp={lowTemp}
          />
        ))}
      </div>
    </article>
  );
}
