import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

export const PrejoinPage = () => {
  const [roomName, setRoomName] = useState<string>("");
  const [participantName, setParticipantName] = useState<string>("");
  const router = useRouter();

  const onSubmit = () => {
    router.push({
      pathname: "/room",
      params: {
        roomName: roomName,
        participantName: participantName,
      },
    });
  };

  return (
    <View>
      <StatusBar style="light" />
      <View className="flex-column m-4 gap-4">
        <View className="flex-column gap-2">
          <Text className="text-xl">Room Name</Text>
          <TextInput
            placeholder="uniti"
            value={roomName}
            onChangeText={setRoomName}
          />
        </View>
        <View className="flex-column gap-2">
          <Text className="text-xl">Participant Name</Text>
          <TextInput
            placeholder="Jane"
            value={participantName}
            onChangeText={setParticipantName}
          />
        </View>
        <Button
          title="Join Room"
          color="rgb(8 59 76)"
          onPress={onSubmit}
          disabled={!roomName || !participantName}
        />
      </View>
    </View>
  );
};
