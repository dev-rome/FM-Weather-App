"use client";

import Image from "next/image";
import { useWeather } from "@/contexts/WeatherContext";

export default function CurrentWeather() {
  const { weatherData } = useWeather();

  if (!weatherData) {
    return null;
  }

  const { location, current } = weatherData;
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const dateTime = currentDate.toISOString().split("T")[0];

  return (
    <article
      aria-label="Current weather conditions"
      className="relative pb-5 lg:pb-8"
    >
      <picture>
        <source
          srcSet="/images/bg-today-large.svg"
          media="(min-width: 768px)"
        />
        <Image
          src="/images/bg-today-small.svg"
          alt=""
          width={343}
          height={286}
          className="h-auto w-full"
          aria-hidden="true"
          preload={true}
          fetchPriority="high"
        />
      </picture>
      <div className="absolute inset-0 flex w-full flex-col items-center justify-center md:flex-row md:justify-between md:px-6">
        <div className="text-center md:text-left">
          <h2 className="text-[1.75rem] font-bold">
            {location.name}, {location.country}
          </h2>
          <time
            dateTime={dateTime}
            className="text-lg font-medium"
          >
            {formattedDate}
          </time>
        </div>
        <div className="flex items-center">
          <Image
            src="/images/icon-sunny.webp"
            alt="Sunny weather"
            width={120}
            height={120}
            className="h-auto w-auto"
            preload={true}
            fetchPriority="high"
          />
          <p
            className="text-8xl font-semibold"
            aria-label={`Temperature ${Math.round(current.temperature)} degrees`}
          >
            {Math.round(current.temperature)}°
          </p>
        </div>
      </div>
    </article>
  );
}
