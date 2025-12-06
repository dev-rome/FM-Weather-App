/**
 * Utility functions for error handling
 */

/**
 * Checks if an error message indicates an API/server error
 */
export function isApiError(error: string): boolean {
  return (
    error.includes("API") ||
    error.includes("server") ||
    error.includes("fetch") ||
    error.includes("connect") ||
    error.includes("Failed to fetch") ||
    error.includes("network")
  );
}

