import { ResourceException } from ".";

/**
 * Thrown when the API response is invalid.
 */
export class ApiInvalidResponseFailure extends Error {
	constructor(
		public readonly statusCode?: number,
		public readonly body?: object,
		public readonly data?: string,
		public readonly error?: unknown,
	) {
		super("Invalid API Response");
		this.name = "ApiInvalidResponseFailure";
	}
}

/**
 * Thrown when a timeout occurs during a request.
 */
export class ApiRequestTimeoutFailure extends Error {
	constructor(public readonly error: unknown) {
		super("API Request Timeout");
		this.name = "ApiRequestTimeoutFailure";
	}
}

/**
 * Thrown when a network error occurs during a request.
 */
export class ApiRequestNetworkFailure extends Error {
	constructor(public readonly error: unknown) {
		super("API Network Error");
		this.name = "ApiRequestNetworkFailure";
	}
}

/**
 * Thrown when an error occurs during a request.
 */
export class ApiRequestFailure extends Error {
	constructor(public readonly error: unknown) {
		super("API Request Failed");
		this.name = "ApiRequestFailure";
	}

	get errorReason(): string {
		if (this.error instanceof ResourceException) {
			return this.error.response?.message ?? this.error.error;
		}
		return String(this.error);
	}
}

/**
 * Handles API errors by throwing:
 * - ApiInvalidResponseFailure if the response is invalid.
 * - ApiRequestTimeoutFailure if the request timed out.
 * - ApiRequestNetworkFailure if the request failed due to a network error.
 * - ApiRequestFailure if the request failed for any other reason.
 */
export function handleApiError(error: unknown): never {
	// Handle unknown errors
	throw new ApiRequestFailure(error);
}
