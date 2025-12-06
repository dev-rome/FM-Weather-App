/**
 * Utility functions for formatting values
 */

import type {
  TemperatureUnit,
  WindSpeedUnit,
  PrecipitationUnit,
} from "@/components/units/types";

/**
 * Converts Celsius to Fahrenheit
 */
function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

/**
 * Converts km/h to mph
 */
function kmhToMph(kmh: number): number {
  return kmh * 0.621371;
}

/**
 * Converts mm to inches
 */
function mmToInches(mm: number): number {
  return mm * 0.0393701;
}

/**
 * Formats a temperature value to a string with degree symbol
 * @param temperature - Temperature value in Celsius
 * @param unit - Temperature unit (celsius or fahrenheit)
 * @returns Formatted temperature string (e.g., "25°" or "77°F")
 */
export function formatTemperature(
  temperature: number,
  unit: TemperatureUnit = "celsius",
): string {
  const convertedTemp =
    unit === "fahrenheit" ? celsiusToFahrenheit(temperature) : temperature;
  const symbol = unit === "fahrenheit" ? "°F" : "°";
  return `${Math.round(convertedTemp)}${symbol}`;
}

/**
 * Formats a wind speed value
 * @param windSpeed - Wind speed value in km/h
 * @param unit - Wind speed unit (kmh or mph)
 * @returns Formatted wind speed string (e.g., "15 km/h" or "9 mph")
 */
export function formatWindSpeed(
  windSpeed: number,
  unit: WindSpeedUnit = "kmh",
): string {
  const convertedSpeed = unit === "mph" ? kmhToMph(windSpeed) : windSpeed;
  const unitLabel = unit === "mph" ? "mph" : "km/h";
  return `${Math.round(convertedSpeed)} ${unitLabel}`;
}

/**
 * Formats a precipitation value
 * @param precipitation - Precipitation value in mm
 * @param unit - Precipitation unit (mm or in)
 * @returns Formatted precipitation string (e.g., "5 mm" or "0.2 in")
 */
export function formatPrecipitation(
  precipitation: number,
  unit: PrecipitationUnit = "mm",
): string {
  const convertedPrecip =
    unit === "in" ? mmToInches(precipitation) : precipitation;
  const unitLabel = unit === "in" ? "in" : "mm";
  const decimals = unit === "in" ? 1 : 0;
  return `${convertedPrecip.toFixed(decimals)} ${unitLabel}`;
}

