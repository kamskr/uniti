import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { PrejoinPage } from "@/features/rooms/view/PrejoinPage";
import { useAppInitializer } from "@/providers/app_initializer";
import { RepositoryProvider } from "@/providers/repository_provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button, TamaguiProvider } from "tamagui";

import { tamaguiConfig } from "../tamagui.config";

const queryClient = new QueryClient();

export default function App() {
  const { repositories, initializationError } = useAppInitializer();

  if (initializationError) {
    return <Text>Failed to initialize app.</Text>;
  }

  if (!repositories) {
    return null;
  }

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <QueryClientProvider client={queryClient}>
        <RepositoryProvider repositories={repositories}>
          <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>
            <StatusBar style="auto" />
            {/* <PrejoinPage /> */}
            <Button
              onPress={() => {
                console.log("Hello");
              }}
            >
              Test
            </Button>
          </View>
        </RepositoryProvider>
      </QueryClientProvider>
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
