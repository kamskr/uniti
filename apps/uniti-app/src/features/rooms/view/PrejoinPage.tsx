import { Button, Text, View } from "react-native";
import { useLivekitRepository } from "@/providers/repository_provider";
import { useQuery } from "@tanstack/react-query";

export const PrejoinPage = () => {
  const livekitRepository = useLivekitRepository();

  const { isPending, error, data, isFetching, refetch } = useQuery({
    queryKey: ["livekit-room"],
    queryFn: () =>
      livekitRepository.joinRoom({
        roomName: "test",
        participantName: "test",
      }),
  });

  if (isFetching) return <Text>Loading...</Text>;
  if (error)
    return (
      <View>
        <Text>Error: {JSON.stringify(error)}</Text>
        <Button title="Refetch" onPress={() => refetch()} />
      </View>
    );

  return (
    <View>
      <Text>{data?.localParticipant.name}</Text>
      <Text>{data?.localParticipant.name}</Text>
      <Text>{data?.name}</Text>
    </View>
  );
};
