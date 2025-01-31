import type { ApiResponse } from "@uniti/api-models";

/**
 * Thrown when an error occurs during a request in the resource.
 *
 * This exception should be thrown inside of the try block of resource methods.
 * It will be mapped to an ApiRequestFailure in handleApiError with an
 * appropriate error reason based on the response.
 */
export class ResourceException extends Error {
	constructor(
		public readonly error: string,
		public readonly response?: ApiResponse<unknown>,
	) {
		super(response?.message);
		this.name = "ResourceException";
	}
}
