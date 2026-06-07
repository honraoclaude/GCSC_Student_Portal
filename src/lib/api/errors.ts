/**
 * Standardized API error classes
 * All errors follow a consistent format for proper error handling across routes
 */

export class ApiError extends Error {
  constructor(
    public message: string,
    public status: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      error: this.message,
      code: this.code,
    };
  }
}

/**
 * 400 Bad Request - Validation or malformed request
 */
export class ValidationError extends ApiError {
  constructor(message: string, code?: string) {
    super(message, 400, code || "VALIDATION_ERROR");
  }
}

/**
 * 401 Unauthorized - Missing or invalid authentication
 */
export class UnauthorizedError extends ApiError {
  constructor(message: string = "Unauthorized", code?: string) {
    super(message, 401, code || "UNAUTHORIZED");
  }
}

/**
 * 403 Forbidden - Authenticated but not authorized for this resource
 */
export class ForbiddenError extends ApiError {
  constructor(message: string = "Forbidden", code?: string) {
    super(message, 403, code || "FORBIDDEN");
  }
}

/**
 * 404 Not Found - Resource does not exist
 */
export class NotFoundError extends ApiError {
  constructor(message: string = "Not found", code?: string) {
    super(message, 404, code || "NOT_FOUND");
  }
}

/**
 * 500 Internal Server Error - Unexpected server error
 */
export class InternalError extends ApiError {
  constructor(message: string = "Internal server error", code?: string) {
    super(message, 500, code || "INTERNAL_ERROR");
  }
}

/**
 * Helper to check if an error is an ApiError
 */
export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

/**
 * Helper to get error response from any error
 */
export function getErrorResponse(error: unknown): [{ error: string }, number] {
  if (isApiError(error)) {
    return [{ error: error.message }, error.status];
  }

  if (error instanceof Error) {
    console.error("Unhandled error:", error.message);
    return [{ error: error.message }, 500];
  }

  console.error("Unknown error:", error);
  return [{ error: "Internal server error" }, 500];
}
