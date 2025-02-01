// import type { HttpsCallableT } from "@/types";
// import { handleApiError, ResourceException } from "@/failures";

import type {
	// ApiResponse,
	LivekitTokenDTO,
	LivekitTokenRequest,
} from "@uniti/api-models";

export class LivekitResource {
	// constructor(private readonly httpsCallable: HttpsCallableT) { }
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	constructor() { }

	async generateAccessToken(
		request: LivekitTokenRequest,
	): Promise<LivekitTokenDTO> {
		// try {
		// 	const response = await this.httpsCallable.call("createToken", request);
		//
		// 	const responseData: ApiResponse<LivekitTokenDTO> =
		// 		response.data as ApiResponse<LivekitTokenDTO>;
		//
		// 	if (!responseData.isSuccess) {
		// 		throw new ResourceException(
		// 			"Unsuccessful response when generating token " +
		// 			`${responseData.message} ` +
		// 			`for request: ${JSON.stringify(request)}`,
		// 			responseData,
		// 		);
		// 	}
		//
		// 	if (responseData.data == null) {
		// 		throw new ResourceException(
		// 			"Missing response data when generating token " +
		// 			`${responseData.message} ` +
		// 			`for request: ${JSON.stringify(request)}`,
		// 			responseData,
		// 		);
		// 	}
		//
		// 	return responseData.data;
		// } catch (error) {
		// 	handleApiError(error);
		// }
		//
		console.log(request);
		await new Promise((resolve) => setTimeout(resolve, 2000));
		return {
			token: "token",
		};
	}
}
