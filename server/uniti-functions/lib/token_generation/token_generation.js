import { defineSecret } from "firebase-functions/params";
import { logger } from "firebase-functions/v2";
import { onRequest } from "firebase-functions/v2/https";
import { AccessToken, RoomServiceClient } from "livekit-server-sdk";
const livekitHostUrl = defineSecret("LIVEKIT_HOST_URL");
const livekitApiKey = defineSecret("LIVEKIT_API_KEY");
const livekitApiSecret = defineSecret("LIVEKIT_API_SECRET");
export const createToken = onRequest({
    secrets: [livekitHostUrl, livekitApiKey, livekitApiSecret],
    cors: true,
}, async (request, response) => {
    const livekitSecrets = {
        livekitHostUrl: livekitHostUrl.value(),
        livekitApiKey: livekitApiKey.value(),
        livekitApiSecret: livekitApiSecret.value(),
    };
    console.log("RUNNING HEREEEE");
    console.log("Request body:", request.body);
    const requestData = request.body;
    if (!requestData) {
        logger.error("Request data is null or undefined", {
            structuredData: true,
            data: { body: request.body },
        });
        response.status(400).send({
            isSuccess: false,
            message: "Request data is missing"
        });
        return;
    }
    const { roomName, participantName } = requestData;
    logger.info("Creating token for room", {
        structuredData: true,
        data: requestData,
    });
    const token = await generateToken(roomName, participantName, livekitSecrets);
    if (!token) {
        logger.error("Error generating token!", {
            structuredData: true,
            data: { token: token },
        });
        response.status(500).send("Error generating token");
        return;
    }
    const responseData = {
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
});
/**
 * Check if the user can publish tracks in the room.
 *
 * For testing purposes, we give the user publishing permission if:
 * 1. The room doesn't exist yet, so this user is a creator,
 */
const canThisUserPublishTracks = async (roomName, secrets) => {
    try {
        const roomService = new RoomServiceClient(secrets.livekitHostUrl, secrets.livekitApiKey, secrets.livekitApiSecret);
        const rooms = await roomService.listRooms([roomName]);
        if (rooms.length === 0) {
            return true;
        }
        // return false;
        return true;
    }
    catch (error) {
        logger.error(error);
        return false;
    }
};
const generateToken = async (roomName, participantName, secrets) => {
    try {
        const _canThisUserPublishTracks = await canThisUserPublishTracks(roomName, secrets);
        const accessToken = new AccessToken(secrets.livekitApiKey, secrets.livekitApiSecret, {
            identity: participantName,
        });
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
    }
    catch (error) {
        logger.error(error);
        return null;
    }
};
