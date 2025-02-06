import type { FirebaseFunctionsTypes } from "@react-native-firebase/functions";

import type {
  ApiResponse,
  LivekitTokenDTO,
  LivekitTokenRequest,
} from "@uniti/api-models";

import { handleApiError, ResourceException } from "../failures";

export class LivekitResource {
  constructor(private readonly functions: FirebaseFunctionsTypes.Module) {}

  async generateAccessToken(
    request: LivekitTokenRequest,
  ): Promise<LivekitTokenDTO> {
    try {
      const response = await this.functions
        .httpsCallable("createToken")
        .call({ data: request });

      const responseData: ApiResponse<LivekitTokenDTO> =
        response.data as ApiResponse<LivekitTokenDTO>;

      if (!responseData.isSuccess) {
        throw new ResourceException(
          "Unsuccessful response when generating token " +
            `${responseData.message} ` +
            `for request: ${JSON.stringify(request)}`,
          responseData,
        );
      }

      if (responseData.data == null) {
        throw new ResourceException(
          "Missing response data when generating token " +
            `${responseData.message} ` +
            `for request: ${JSON.stringify(request)}`,
          responseData,
        );
      }

      return responseData.data;
    } catch (error) {
      handleApiError(error);
    }
  }
}
