// import type { HttpsCallableT } from "@/types";
import { LivekitResource } from "./resources";

export class ApiClient {
	livekitResource: LivekitResource;

	constructor() {
		// this.livekitResource = new LivekitResource(httpsCallable);
		this.livekitResource = new LivekitResource();
	}
}
