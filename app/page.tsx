import { Suspense } from "react";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import CurrentWeather from "@/components/CurrentWeather";
import WeatherDetails from "@/components/weather-details/WeatherDetails";
import DailyForecast from "@/components/daily-forecast/DailyForecast";
import HourlyForecast from "@/components/hourly-forecast/HourlyForecast";
import GeolocationLoader from "@/components/GeolocationLoader";
import WeatherBlurOverlay from "@/components/WeatherBlurOverlay";
import { WeatherProvider } from "@/contexts/WeatherContext";
import { getInitialWeather } from "@/lib/weather-data";

export default function Home() {
  const weatherPromise = getInitialWeather();

  return (
    <Suspense fallback={<WeatherLoadingFallback />}>
      <WeatherProvider initialWeatherPromise={weatherPromise}>
        <GeolocationLoader />
        <Header />
        <h1 className="col-span-4 mx-auto pb-12 text-center text-4xl leading-tight sm:max-w-96 md:col-span-8 md:text-[3.25rem] lg:col-span-12 lg:max-w-none lg:pb-16">
          How&apos;s the sky looking today?
        </h1>
        <SearchForm />
        <section
          aria-label="Weather information"
          className="relative col-span-4 grid grid-cols-1 gap-8 pb-12 md:col-span-8 md:pb-20 lg:col-span-12 lg:grid-cols-12"
        >
          <WeatherBlurOverlay />
          <div className="lg:col-span-8">
            <CurrentWeather />
            <WeatherDetails />
            <DailyForecast />
          </div>
          <div className="lg:col-span-4">
            <HourlyForecast />
          </div>
        </section>
      </WeatherProvider>
    </Suspense>
  );
}

function WeatherLoadingFallback() {
  return (
    <div className="col-span-4 md:col-span-8 lg:col-span-12">
      <Header />
      <h1 className="col-span-4 mx-auto pb-12 text-center text-4xl leading-tight sm:max-w-96 md:col-span-8 md:text-[3.25rem] lg:col-span-12 lg:max-w-none lg:pb-16">
        How&apos;s the sky looking today?
      </h1>
      <div className="mx-auto max-w-xl pb-8 text-center">
        <p className="text-lg">Loading weather data...</p>
      </div>
    </div>
  );
}
