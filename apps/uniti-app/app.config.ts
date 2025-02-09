import type { ConfigContext, ExpoConfig } from "expo/config";

const APP_VARIANT = process.env.APP_VARIANT;

const IS_DEV = APP_VARIANT === 'development';
const IS_STG = APP_VARIANT === 'staging';

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return 'world.gtmedia.uniti.dev';
  }

  if (IS_STG) {
    return 'world.gtmedia.uniti.stg';
  }

  return 'world.gtmedia.uniti';
};

const getAppName = () => {
  if (IS_DEV) {
    return 'Uniti (DEV)';
  }

  if (IS_STG) {
    return 'Uniti (STG)';
  }

  return 'Uniti';
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: getAppName(),
  slug: "uniti",
  scheme: "uniti",
  version: "2.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  newArchEnabled: true,
  splash: {
    image: "./assets/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: getUniqueIdentifier(),
    googleServicesFile: `./firebase/${APP_VARIANT}/ios/GoogleService-Info.plist"`,

  },
  android: {
    package: getUniqueIdentifier(),
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    googleServicesFile: `./firebase/${APP_VARIANT}/android/google-services.json"`,
  },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  plugins: [
    "expo-router",
    "@react-native-firebase/app",
    "@livekit/react-native-expo-plugin",
    "@config-plugins/react-native-webrtc",
  ],

})
