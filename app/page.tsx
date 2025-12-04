import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import CurrentWeather from "@/components/CurrentWeather";
import WeatherDetails from "@/components/weather-details/WeatherDetails";
import DailyForecast from "@/components/daily-forecast/DailyForecast";
import HourlyForecast from "@/components/hourly-forecast/HourlyForecast";

export default function Home() {
  return (
    <>
      <Header />
      <h1 className="col-span-4 mx-auto pb-12 text-center text-4xl leading-tight sm:max-w-96 md:col-span-8 md:text-[3.25rem] lg:col-span-12 lg:max-w-none lg:pb-16">
        How&apos;s the sky looking today?
      </h1>
      <SearchForm />
      <section
        aria-label="Weather information"
        className="col-span-4 grid grid-cols-1 gap-8 pb-12 md:col-span-8 md:pb-20 lg:col-span-12 lg:grid-cols-12"
      >
        <div className="lg:col-span-8">
          <CurrentWeather />
          <WeatherDetails />
          <DailyForecast />
        </div>
        <div className="lg:col-span-4">
          <HourlyForecast />
        </div>
      </section>
    </>
  );
}
