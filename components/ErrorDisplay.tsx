"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useWeatherData } from "@/contexts/WeatherDataContext";
import { isApiError } from "@/lib/error-utils";

export default function ErrorDisplay() {
  const { error } = useWeatherData();

  if (!error) {
    return null;
  }

  const handleRetry = () => {
    // Reload page to retry geolocation
    window.location.reload();
  };

  return (
    <div className="col-span-4 flex min-h-[400px] items-center justify-center md:col-span-8 lg:col-span-12">
      <div className="w-full max-w-xl p-8 text-center md:p-12">
        <div className="mb-6 flex justify-center">
          <Image
            src="/images/icon-error.svg"
            alt="Error icon"
            width={42}
            height={50}
            className="h-10 w-10"
          />
        </div>
        <h2 className="mb-4 text-2xl font-bold md:text-4xl">
          Something went wrong
        </h2>
        <p className="mb-8 text-base text-neutral-200 md:text-lg">
          {isApiError(error)
            ? "We couldn't connect to the server (API error). Please try again in a few moments."
            : error}
        </p>
        <Button
          onClick={handleRetry}
          className="mx-auto flex items-center gap-2 bg-neutral-700 px-6 py-3 hover:bg-neutral-600"
        >
          <Image
            src="/images/icon-retry.svg"
            alt="Retry icon"
            width={18}
            height={18}
            className="h-[18px] w-[18px]"
          />
          Retry
        </Button>
      </div>
    </div>
  );
}
