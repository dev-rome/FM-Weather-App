/**
 * Utility functions for error handling
 */

/**
 * Type guard to check if an error is an API/server error
 */
export function isApiError(error: unknown): error is string {
  if (typeof error !== "string") {
    return false;
  }

  const apiErrorIndicators = [
    "API",
    "server",
    "fetch",
    "connect",
    "Failed to fetch",
    "network",
  ];

  return apiErrorIndicators.some((indicator) =>
    error.toLowerCase().includes(indicator.toLowerCase()),
  );
}

