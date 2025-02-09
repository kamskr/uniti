import type { RootStackParamList } from "@/App";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export type PrejoinPageProps = NativeStackScreenProps<
  RootStackParamList,
  "Prejoin"
>;

export const PrejoinPage = ({ navigation }: PrejoinPageProps) => {
  const [roomName, setRoomName] = useState<string>("");
  const [participantName, setParticipantName] = useState<string>("");

  const onSubmit = () => {
    navigation.navigate("Room", {
      roomName,
      participantName,
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
