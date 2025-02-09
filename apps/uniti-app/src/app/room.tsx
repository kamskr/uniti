import { View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { RoomPage } from "@/features/rooms/view/RoomPage";

export default function Room() {
  const { roomName, participantName } = useLocalSearchParams<{
    roomName: string;
    participantName: string;
  }>();

  return (
    <View>
      <Stack.Screen
        options={{
          title: `Room ${roomName}`,
        }}
      />
      <RoomPage roomName={roomName} participantName={participantName} />
    </View>
  );
}
