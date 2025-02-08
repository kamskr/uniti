import type { Config } from "tailwindcss";
// @ts-expect-error - no types
import nativewind from "nativewind/preset";

import baseConfig from "@uniti/tailwind-config/native";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [baseConfig, nativewind],
} satisfies Config;
