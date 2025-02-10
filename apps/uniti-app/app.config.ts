import type { ConfigContext, ExpoConfig } from "@expo/config";

type Variant = "development" | "staging" | "production";
const NODE_ENV = process.env.NODE_ENV;

const getVariantConfig = (variant: Variant) => {
  const configs = {
    development: {
      name: "Uniti (DEV)",
      identifier: "world.gtmedia.uniti.dev",
      googleServicesPath: "./firebase/development",
    },
    staging: {
      name: "Uniti (STG)",
      identifier: "world.gtmedia.uniti.stg",
      googleServicesPath: "./firebase/staging",
    },
    production: {
      name: "Uniti",
      identifier: "world.gtmedia.uniti",
      googleServicesPath: "./firebase/production",
    },
  };

  if (!(variant in configs)) {
    throw new Error(`Invalid environment variant: ${variant}`);
  }
  return configs[variant];
};

export default ({ config }: ConfigContext): ExpoConfig => {
  const variantConfig = getVariantConfig(NODE_ENV as Variant);

  return {
    ...config,
    name: variantConfig.name,
    slug: "uniti",
    scheme: "uniti",
    version: "2.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      backgroundColor: "#083B4C",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: variantConfig.identifier,
      googleServicesFile: `${variantConfig.googleServicesPath}/ios/GoogleService-Info.plist`,
    },
    android: {
      package: variantConfig.identifier,
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#0AD6A1",
      },
      googleServicesFile: `${variantConfig.googleServicesPath}/android/google-services.json`,
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
      [
        "expo-build-properties",
        {
          ios: {
            useFrameworks: "static",
          },
        },
      ],
    ],
    extra: {
      LIVEKIT_WEBSOCKET_URL: process.env.LIVEKIT_WEBSOCKET_URL,
      SENTRY_DSN: process.env.SENTRY_DSN,
    },
  };
};
