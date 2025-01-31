/**
 * Request data for generating a token
 */
export interface TokenRequestDTO {
	roomName: string;
	participantName: string;
}

/**
 * Response data for generating a token
 */
export interface TokenResponseDTO {
	token: string;
}
