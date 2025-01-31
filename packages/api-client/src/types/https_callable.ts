import type { FirebaseFunctionsTypes } from "@react-native-firebase/functions";
import type { HttpsCallable as WebHttpsCallable } from "firebase/functions";

export type HttpsCallableT =
	| WebHttpsCallable
	| FirebaseFunctionsTypes.HttpsCallable;
