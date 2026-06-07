/**
 * Shared API handler patterns and utilities
 * Reduces boilerplate across all API routes
 */

import { jsonResponse, jsonError } from "./response";
import { ApiError, isApiError, ValidationError } from "./errors";

/**
 * Parse JSON from request body, handling errors
 */
export async function parseRequestBody<T = any>(req: Request): Promise<T> {
  try {
    return await req.json();
  } catch (error) {
    throw new Error("Invalid JSON in request body");
  }
}

/**
 * Validate required fields in an object
 * Throws ValidationError if any field is missing
 */
export function validateRequired(
  obj: Record<string, any>,
  fields: string[]
): void {
  const missing = fields.filter((field) => !obj[field]);
  if (missing.length > 0) {
    throw new ValidationError(
      `Missing required fields: ${missing.join(", ")}`
    );
  }
}

/**
 * Wrap a route handler with standardized error handling
 * Catches errors, logs them, and returns proper JSON responses
 *
 * Usage:
 * export const GET = withErrorHandler(async (req) => {
 *   // handler code
 * });
 */
export function withErrorHandler(
  handler: (req: Request, context?: any) => Promise<Response>
): (req: Request, context?: any) => Promise<Response> {
  return async (req: Request, context?: any) => {
    try {
      return await handler(req, context);
    } catch (error) {
      // Log all errors
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error("Handler error:", errorMessage);

      // Handle ApiError with proper status codes
      if (isApiError(error)) {
        return jsonError(error.message, error.status);
      }

      // Handle standard errors
      if (error instanceof Error) {
        return jsonError(error.message, 500);
      }

      // Handle unknown errors
      return jsonError("Internal server error", 500);
    }
  };
}

/**
 * Get Prisma client (avoid duplicating dynamic import across routes)
 */
export async function getPrisma() {
  const { prisma } = await import("@/lib/db/prisma");
  return prisma;
}

/**
 * Create a handler that wraps common patterns
 * - Error handling with logging
 * - Response formatting
 * - Prisma initialization
 *
 * Usage:
 * export const POST = createHandler(async ({ req, prisma, userId }) => {
 *   return { data: ... };
 * });
 */
interface HandlerContext {
  req: Request;
  prisma: any;
  userId?: string;
  params?: any;
}

type HandlerFunction = (
  context: HandlerContext
) => Promise<{ data?: any; error?: string; status?: number }>;

export function createHandler(
  handler: HandlerFunction
): (req: Request, context?: any) => Promise<Response> {
  return withErrorHandler(async (req: Request, context?: any) => {
    const prisma = await getPrisma();
    const result = await handler({
      req,
      prisma,
      params: context?.params,
    });

    const { data, error, status = 200 } = result;

    if (error) {
      return jsonError(error, status || 500);
    }

    return jsonResponse(data, status);
  });
}

/**
 * Verify pagination parameters
 * Returns { skip, take } for database queries
 */
export function getPaginationParams(
  req: Request,
  defaultLimit: number = 20
): { skip: number; take: number } {
  const url = new URL(req.url);
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1"));
  const limit = Math.min(
    100,
    Math.max(1, parseInt(url.searchParams.get("limit") || String(defaultLimit)))
  );

  return {
    skip: (page - 1) * limit,
    take: limit,
  };
}

/**
 * Format a response with pagination metadata
 */
export function formatPaginatedResponse<T>(
  items: T[],
  total: number,
  page: number,
  limit: number
) {
  return {
    items,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
}
