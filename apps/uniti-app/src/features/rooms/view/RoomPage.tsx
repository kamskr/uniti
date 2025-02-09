import type { RootStackParamList } from "@/App";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Button, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useLivekitRepository } from "@/providers/repository_provider";
import {
  AudioSession,
  LiveKitRoom,
  useLocalParticipant,
  useRemoteParticipants,
} from "@livekit/react-native";
import { useQuery } from "@tanstack/react-query";

export type RoomPageProps = NativeStackScreenProps<RootStackParamList, "Room">;

export const RoomPage = ({ route }: RoomPageProps) => {
  const { roomName, participantName } = route.params;

  return (
    <View className="flex-1 items-center justify-center">
      <StatusBar style="light" />
      <Text>Room Page: {roomName}</Text>
      <Text>Participant Name: {participantName}</Text>
      <RoomView roomName={roomName} participantName={participantName} />
    </View>
  );
};

const RoomView = ({
  roomName,
  participantName,
}: {
  roomName: string;
  participantName: string;
}) => {
  const livekitRepository = useLivekitRepository();

  const { isFetching, error, data, refetch } = useQuery({
    queryKey: ["livekit-room"],
    queryFn: () =>
      livekitRepository.generateLivekitAccessToken({
        roomName: roomName,
        participantName: participantName,
      }),
  });

  useEffect(() => {
    const start = async () => {
      await AudioSession.startAudioSession();
    };

    void start();
    return () => {
      void AudioSession.stopAudioSession();
    };
  }, []);

  if (isFetching) return <Text>Loading...</Text>;
  if (error)
    return (
      <View>
        <Text>Error: {JSON.stringify(error)}</Text>
        <Button title="Refetch" onPress={() => refetch()} />
      </View>
    );

  if (!data) return <Text>Token not found</Text>;

  return (
    <LiveKitRoom
      serverUrl={"ws://localhost:7880"}
      token={data}
      connect={true}
      audio={true}
      video={false}
    >
      <RoomConnectedView />
    </LiveKitRoom>
  );
};

const RoomConnectedView = () => {
  const remoteParticipants = useRemoteParticipants();
  const { localParticipant, isMicrophoneEnabled } = useLocalParticipant();

  console.log("localParticipant", localParticipant);

  return (
    <View>
      <Text>remoteParticipants: {remoteParticipants.length}</Text>
      <Text>localParticipant: {localParticipant.identity}</Text>
      <Text>isMicrophoneEnabled: {isMicrophoneEnabled ? "true" : "false"}</Text>
      <Button
        title="Toggle Microphone"
        onPress={() => {
          void localParticipant.setMicrophoneEnabled(!isMicrophoneEnabled);
        }}
        color="rgb(8 59 76)"
      />
    </View>
  );
};
