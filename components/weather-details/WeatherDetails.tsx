import WeatherDetailsItem from "./WeatherDetailsItem";

type WeatherMetric = {
  label: string;
  value: string;
};

const weatherMetrics: WeatherMetric[] = [
  { label: "Feels Like", value: "18°" },
  { label: "Humidity", value: "46%" },
  { label: "Wind", value: "14 km/h" },
  { label: "Precipitation", value: "0 mm" },
];

export default function WeatherDetails() {
  return (
    <article aria-label="Weather details" className="pb-8 lg:pb-12">
      <h2 className="sr-only">Current weather details</h2>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
        {weatherMetrics.map(({ label, value }) => (
          <WeatherDetailsItem key={label} label={label} value={value} />
        ))}
      </div>
    </article>
  );
}
