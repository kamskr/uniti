import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
// import { PrejoinPage } from "@/features/rooms/view/PrejoinPage";
import { useAppInitializer } from "@/providers/app_initializer";
import { RepositoryProvider } from "@/providers/repository_provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { verifyInstallation } from "nativewind";

import "../global.css";

const queryClient = new QueryClient();

export default function App() {
  const { repositories, initializationError } = useAppInitializer();
  verifyInstallation();

  if (initializationError) {
    return <Text>Failed to initialize app.</Text>;
  }

  if (!repositories) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RepositoryProvider repositories={repositories}>
        <View style={styles.container}>
          <Text>Open up App.tsx to start working on your app!</Text>
          <Text className="text-4xl font-bold uppercase text-primary">
            Delete
          </Text>
          <StatusBar style="auto" />
          {/* <PrejoinPage /> */}
        </View>
      </RepositoryProvider>
    </QueryClientProvider>
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
