// import { Room, RoomOptions } from 'livekit-client';
// import { CreateRoomFailure, GenerateAccessTokenFailure } from "@/failures";
// import { Room } from "livekit-client";

import type { ApiClient } from "@uniti/api-client";

/**
 * Package for managing LiveKit integration.
 */
export class LivekitRepository {
  private readonly _liveKitUrl: string;
  private readonly _apiClient: ApiClient;

  /**
   * Creates a new LiveKit repository instance
   */
  constructor(liveKitUrl: string, apiClient: ApiClient) {
    this._liveKitUrl = liveKitUrl;
    this._apiClient = apiClient;
  }

  async test(): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(this._liveKitUrl);
    console.log(this._apiClient);
    return "test";
  }

  // /**
  //  * Joins user to the room. If room does not exist, it will be created.
  //  */
  // async joinRoom(params: {
  //   roomName: string;
  //   participantName: string;
  // }): Promise<Room> {
  //   try {
  //     // const options: RoomOptions = {
  //     // };
  //
  //     const room = new Room();
  //
  //     const token = await this._generateAccessToken({
  //       roomName: params.roomName,
  //       participantName: params.participantName,
  //     });
  //
  //     await room.prepareConnection(this._liveKitUrl, token);
  //     await room.connect(this._liveKitUrl, token);
  //
  //     if (room.localParticipant?.permissions?.canPublish ?? false) {
  //       await room.localParticipant.setMicrophoneEnabled(true);
  //     }
  //
  //     return room;
  //   } catch (error) {
  //     throw new CreateRoomFailure(error);
  //   }
  // }
  //
  // /**
  //  * Generates a LiveKit token for user to join the room.
  //  */
  // private async _generateAccessToken(params: {
  //   roomName: string;
  //   participantName: string;
  // }): Promise<string> {
  //   try {
  //     const result = await this._apiClient.livekitResource.generateAccessToken({
  //       roomName: params.roomName,
  //       participantName: params.participantName,
  //     });
  //
  //     return result.token;
  //   } catch (error) {
  //     throw new GenerateAccessTokenFailure(
  //       error instanceof Error ? error : new Error("Unknown error occurred"),
  //     );
  //   }
  // }
}
