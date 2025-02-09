import type { ParamListBase } from "@react-navigation/native";
import { Text } from "react-native";
import { useAppInitializer } from "@/providers/app_initializer";
import { RepositoryProvider } from "@/providers/repository_provider";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { verifyInstallation } from "nativewind";

import "../global.css";

import { PrejoinPage } from "@/features/rooms/view/PrejoinPage";
import { RoomPage } from "@/features/rooms/view/RoomPage";

export interface RootStackParamList extends ParamListBase {
  Prejoin: undefined;
  Room: {
    roomName: string;
    participantName: string;
  };
}

const Stack = createNativeStackNavigator<RootStackParamList>();
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
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Prejoin"
              component={PrejoinPage}
              options={{
                title: "Uniti Engine Test",
                headerStyle: {
                  backgroundColor: "rgb(10 214 161)",
                },
                headerTintColor: "#fff",
              }}
            />
            <Stack.Screen
              name="Room"
              component={RoomPage}
              options={({ route }) => ({
                title: "Room " + route.params.roomName,
                headerStyle: {
                  backgroundColor: "rgb(10 214 161)",
                },
                headerTintColor: "#fff",
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </RepositoryProvider>
    </QueryClientProvider>
  );
}
