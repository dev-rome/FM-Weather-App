"use client";

import { useWeatherData } from "@/contexts/WeatherDataContext";
import SearchForm from "@/components/search-form/SearchForm";

export default function ConditionalContent() {
  const { error } = useWeatherData();

  // Hide heading and search form when there's an error
  if (error) {
    return null;
  }

  return (
    <>
      <h1 className="col-span-4 mx-auto pb-12 text-center text-4xl leading-tight sm:max-w-96 md:col-span-8 md:text-[3.25rem] lg:col-span-12 lg:max-w-none lg:pb-16">
        How&apos;s the sky looking today?
      </h1>
      <SearchForm />
    </>
  );
}
