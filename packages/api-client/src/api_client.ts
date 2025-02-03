import type { HttpsCallableT } from "@/types";

import { LivekitResource } from "./resources";

export class ApiClient {
  livekitResource: LivekitResource;

  constructor(httpsCallable: HttpsCallableT) {
    this.livekitResource = new LivekitResource(httpsCallable);
  }
}
