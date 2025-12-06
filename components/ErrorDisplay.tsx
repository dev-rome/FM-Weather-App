"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useWeather } from "@/contexts/WeatherContext";
import { isApiError } from "@/lib/error-utils";

export default function ErrorDisplay() {
  const { error } = useWeather();

  if (!error) {
    return null;
  }

  const handleRetry = () => {
    // Reload page to retry geolocation
    window.location.reload();
  };

  return (
    <div className="col-span-4 md:col-span-8 lg:col-span-12 flex items-center justify-center min-h-[400px]">
      <div className="p-8 md:p-12 max-w-xl w-full text-center">
        <div className="flex justify-center mb-6">
          <Image
            src="/images/icon-error.svg"
            alt="Error icon"
            width={42}
            height={50}
            className="w-10 h-10"
          />
        </div>
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          Something went wrong
        </h2>
        <p className="text-neutral-200 mb-8 text-base md:text-lg">
          {isApiError(error)
            ? "We couldn't connect to the server (API error). Please try again in a few moments."
            : error}
        </p>
        <Button
          onClick={handleRetry}
          className="bg-neutral-700 hover:bg-neutral-600 px-6 py-3 flex items-center gap-2 mx-auto"
        >
          <Image
            src="/images/icon-retry.svg"
            alt="Retry icon"
            width={18}
            height={18}
            className="w-[18px] h-[18px]"
          />
          Retry
        </Button>
      </div>
    </div>
  );
}

