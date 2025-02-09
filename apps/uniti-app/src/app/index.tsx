import { View } from "react-native";
import { Stack } from "expo-router";
import { PrejoinPage } from "@/features/rooms/view/PrejoinPage";

export default function Home() {
  return (
    <View>
      <Stack.Screen
        options={{
          title: "Uniti Engine Test",
        }}
      />
      <PrejoinPage />
    </View>
  );
}
