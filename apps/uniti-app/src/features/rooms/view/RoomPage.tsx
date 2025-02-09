import type { RootStackParamList } from "@/App";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export type RoomPageProps = NativeStackScreenProps<RootStackParamList, "Room">;

export const RoomPage = ({ navigation, route }: RoomPageProps) => {
  const { roomName, participantName } = route.params;
  return (
    <View>
      <StatusBar style="auto" />
      <Text>Room Page: {roomName}</Text>
      <Text>Participant Name: {participantName}</Text>
      <Button
        title="Go to Prejoin Page"
        color="rgb(8 59 76)"
        onPress={() => navigation.pop()}
      />
    </View>
  );
  // const livekitRepository = useLivekitRepository();
  //
  // const { isPending, error, data, isFetching, refetch } = useQuery({
  //   queryKey: ["livekit-room"],
  //   queryFn: () =>
  //     livekitRepository.joinRoom({
  //       roomName: "test",
  //       participantName: "test",
  //     }),
  // });
  //
  // if (isFetching) return <Text>Loading...</Text>;
  // if (error)
  //   return (
  //     <View>
  //       <Text>Error: {JSON.stringify(error)}</Text>
  //       <Button title="Refetch" onPress={() => refetch()} />
  //     </View>
  //   );
  //
  // return (
  //   <View>
  //     <Text>{data?.localParticipant.name}</Text>
  //     <Text>{data?.localParticipant.name}</Text>
  //     <Text>{data?.name}</Text>
  //   </View>
  // );
};
