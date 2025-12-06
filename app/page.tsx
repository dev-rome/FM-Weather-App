import Header from "@/components/Header";
import ConditionalContent from "@/components/ConditionalContent";
import GeolocationLoader from "@/components/GeolocationLoader";
import WeatherBlurOverlay from "@/components/WeatherBlurOverlay";
import ErrorDisplay from "@/components/ErrorDisplay";
import WeatherContent from "@/components/WeatherContent";
import { WeatherProvider } from "@/contexts/WeatherContext";

export default function Home() {
  return (
    <WeatherProvider>
      <GeolocationLoader />
      <Header />
      <ConditionalContent />
      <section
        aria-label="Weather information"
        className="relative col-span-4 grid grid-cols-1 gap-8 pb-12 md:col-span-8 md:pb-20 lg:col-span-12 lg:grid-cols-12"
      >
        <WeatherBlurOverlay />
        <ErrorDisplay />
        <WeatherContent />
      </section>
    </WeatherProvider>
  );
}
