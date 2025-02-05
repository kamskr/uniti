import { Button, Text, View } from "react-native";
import { useLivekitRepository } from "@/providers/repository_provider";
import { useQuery } from "@tanstack/react-query";

export const PrejoinPage = () => {
  const livekitRepository = useLivekitRepository();

  const { isPending, error, data } = useQuery({
    queryKey: ["livekit-room"],
    queryFn: () =>
      livekitRepository.joinRoom({
        roomName: "test",
        participantName: "test",
      }),
  });

  if (isPending) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {JSON.stringify(error)}</Text>;

  return (
    <View>
      <Text>{data?.localParticipant.name}</Text>
      <Text>{data?.name}</Text>
    </View>
  );
};
