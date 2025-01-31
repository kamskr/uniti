import { defineSecret } from "firebase-functions/params";
import { logger } from "firebase-functions/v2";
import { onRequest } from "firebase-functions/v2/https";
import { AccessToken, RoomServiceClient } from "livekit-server-sdk";

import type {
	ApiResponse,
	TokenRequestDTO,
	TokenResponseDTO,
} from "@uniti/api-models";

const livekitHostUrl = defineSecret("LIVEKIT_HOST_URL");
const livekitApiKey = defineSecret("LIVEKIT_API_KEY");
const livekitApiSecret = defineSecret("LIVEKIT_API_SECRET");

interface LivekitSecrets {
	livekitHostUrl: string;
	livekitApiKey: string;
	livekitApiSecret: string;
}

export const createToken = onRequest(
	{
		secrets: [livekitHostUrl, livekitApiKey, livekitApiSecret],
		cors: true,
	},
	async (request, response) => {
		const livekitSecrets: LivekitSecrets = {
			livekitHostUrl: livekitHostUrl.value(),
			livekitApiKey: livekitApiKey.value(),
			livekitApiSecret: livekitApiSecret.value(),
		};

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		const requestData: TokenRequestDTO = request.body.data;
		const { roomName, participantName } = requestData;

		logger.info("Creating token for room", {
			structuredData: true,
			data: requestData,
		});

		const token = await generateToken(
			roomName,
			participantName,
			livekitSecrets,
		);

		if (!token) {
			logger.error("Error generating token!", {
				structuredData: true,
				data: { token: token },
			});
			response.status(500).send("Error generating token");
			return;
		}

		const responseData: ApiResponse<TokenResponseDTO> = {
			isSuccess: true,
			data: {
				token: token,
			},
		};

		logger.info("Token generated successfully! ", {
			structuredData: true,
			data: responseData,
		});

		response.send({ data: responseData });
	},
);

/**
 * Check if the user can publish tracks in the room.
 *
 * For testing purposes, we give the user publishing permission if:
 * 1. The room doesn't exist yet, so this user is a creator,
 */
const canThisUserPublishTracks = async (
	roomName: string,
	secrets: LivekitSecrets,
): Promise<boolean> => {
	try {
		const roomService = new RoomServiceClient(
			secrets.livekitHostUrl,
			secrets.livekitApiKey,
			secrets.livekitApiSecret,
		);

		const rooms = await roomService.listRooms([roomName]);

		if (rooms.length === 0) {
			return true;
		}

		// return false;
		return true;
	} catch (error) {
		logger.error(error);
		return false;
	}
};

const generateToken = async (
	roomName: string,
	participantName: string,
	secrets: LivekitSecrets,
): Promise<string | null> => {
	try {
		const _canThisUserPublishTracks = await canThisUserPublishTracks(
			roomName,
			secrets,
		);

		const accessToken = new AccessToken(
			secrets.livekitApiKey,
			secrets.livekitApiSecret,
			{
				identity: participantName,
			},
		);

		const grants = {
			roomJoin: true,
			room: roomName,
			canPublish: _canThisUserPublishTracks,
			canSubscribe: true,
		};

		accessToken.addGrant(grants);

		logger.info("Generated token", {
			structuredData: true,
			data: { grants: grants },
		});

		return await accessToken.toJwt();
	} catch (error) {
		logger.error(error);
		return null;
	}
};
