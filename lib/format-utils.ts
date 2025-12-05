/**
 * Utility functions for formatting values
 */

/**
 * Formats a temperature value to a string with degree symbol
 * @param temperature - Temperature value
 * @returns Formatted temperature string (e.g., "25°")
 */
export function formatTemperature(temperature: number): string {
  return `${Math.round(temperature)}°`;
}

/**
 * Formats a wind speed value
 * @param windSpeed - Wind speed value
 * @returns Formatted wind speed string (e.g., "15 km/h")
 */
export function formatWindSpeed(windSpeed: number, unit: string = "km/h"): string {
  return `${Math.round(windSpeed)} ${unit}`;
}

