import { NextRequest, NextResponse } from "next/server";
import { getWeather } from "@/lib/weather";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const cityName = searchParams.get("city");

  if (!cityName) {
    return NextResponse.json(
      { error: "City name is required" },
      { status: 400 }
    );
  }

  try {
    const weatherData = await getWeather(cityName);
    return NextResponse.json(weatherData);
  } catch (error) {
    console.error("Weather API Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}

