/**
 * A default response of API.
 */
export interface ApiResponse<T> {
	isSuccess: boolean;
	message?: string;
	data?: T;
}

