import { Button, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { PrejoinPage } from "@/features/rooms/view/PrejoinPage";
import { useAppInitializer } from "@/providers/app_initializer";
import { RepositoryProvider } from "@/providers/repository_provider";
import analytics from "@react-native-firebase/analytics";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
    <QueryClientProvider client={queryClient}>
      <RepositoryProvider repositories={repositories}>
        <View style={styles.container}>
          <Text>Open up App.tsx to start working on your app!</Text>
          <StatusBar style="auto" />
          <Button
            title="Press me"
            // Logs in the firebase analytics console as "select_content" event
            // only accepts the two object properties which accept strings.
            onPress={async () =>
              await analytics().logSelectContent({
                content_type: "clothing",
                item_id: "abcd",
              })
            }
          />
          <PrejoinPage />
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
