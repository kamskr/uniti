import type { ApiClient } from "@uniti/api-client";

import { GenerateAccessTokenFailure } from "./failures";

/**
 * Package for managing LiveKit integration.
 */
export class LivekitRepository {
  private readonly _apiClient: ApiClient;

  /**
   * Creates a new LiveKit repository instance
   */
  constructor(apiClient: ApiClient) {
    this._apiClient = apiClient;
  }

  /**
   * Generates a LiveKit token for user to join the room.
   */
  async generateLivekitAccessToken(params: {
    roomName: string;
    participantName: string;
  }): Promise<string> {
    try {
      const result = await this._apiClient.livekitResource.generateAccessToken({
        roomName: params.roomName,
        participantName: params.participantName,
      });

      return result.token;
    } catch (error) {
      throw new GenerateAccessTokenFailure(
        error instanceof Error ? error : new Error("Unknown error occurred"),
      );
    }
  }
}
