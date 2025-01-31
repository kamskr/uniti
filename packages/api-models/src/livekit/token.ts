/**
 * Request data for generating a token
 */
export interface LivekitTokenRequest {
	roomName: string;
	participantName: string;
}

/**
 * Response data for generating a token
 */
export interface LivekitTokenDTO {
	token: string;
}
