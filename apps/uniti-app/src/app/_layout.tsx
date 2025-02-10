import { Text } from "react-native";
import { Stack } from "expo-router";
import { useAppInitializer } from "@/providers/app_initializer";
import { RepositoryProvider } from "@/providers/repository_provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "../global.css";

const queryClient = new QueryClient();

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  const { repositories, initializationError } = useAppInitializer();

  if (initializationError) {
    return <Text>Failed to initialize app.</Text>;
  }

  if (!repositories) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RepositoryProvider repositories={repositories}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "rgb(10 214 161)",
            },
            headerTintColor: "#fff",
          }}
        />
      </RepositoryProvider>
    </QueryClientProvider>
  );
}
