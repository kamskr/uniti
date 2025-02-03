import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAppInitializer } from "@/store/app_initializer";
import { RepositoryProvider } from "@/store/repository_provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  // const { repositories, initializationError } = useAppInitializer();

  // if (initializationError) {
  //   return <Text>Failed to initialize app.</Text>;
  // }

  // if (!repositories) {
  //   return null;
  // }

  return (
    <QueryClientProvider client={queryClient}>
      {/* <RepositoryProvider repositories={repositories}> */}
      <View style={styles.container}>
        <Text>Open up App.tsxx to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
      {/* </RepositoryProvider> */}
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
