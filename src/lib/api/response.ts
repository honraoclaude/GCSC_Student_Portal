import { ApiResponse } from "@/types";

/**
 * Success response factory
 */
export function successResponse<T>(
  data: T,
  status: number = 200
): [T, number] {
  return [data, status];
}

/**
 * Error response factory
 */
export function errorResponse(
  error: string,
  status: number = 500
): [{ error: string }, number] {
  return [{ error }, status];
}

/**
 * Create JSON response for API route
 */
export function jsonResponse<T>(
  data: T,
  status: number = 200
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Create error JSON response
 */
export function jsonError(
  error: string,
  status: number = 500
): Response {
  return jsonResponse({ error }, status);
}

/**
 * Create SSE response for streaming
 */
export function sseResponse(stream: ReadableStream): Response {
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}

/**
 * Encode text for SSE
 */
export const sseEncoder = new TextEncoder();

/**
 * Format SSE data chunk
 */
export function formatSSEChunk(data: any): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}
