import type { FirebaseFunctionsTypes } from "@react-native-firebase/functions";

import { LivekitResource } from "./resources";

export class ApiClient {
  livekitResource: LivekitResource;

  constructor(functions: FirebaseFunctionsTypes.Module) {
    this.livekitResource = new LivekitResource(functions);
  }
}
