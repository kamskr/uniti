import type { RootStackParamList } from "@/App";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export type PrejoinPageProps = NativeStackScreenProps<
  RootStackParamList,
  "Prejoin"
>;

export const PrejoinPage = ({ navigation }: PrejoinPageProps) => {
  return (
    <View>
      <StatusBar style="auto" />
      <Text>Prejoin Page</Text>
      <Button
        title="Go to Jane's profile"
        color="rgb(8 59 76)"
        onPress={() =>
          navigation.navigate("Room", {
            roomName: "Jane",
            participantName: "Jane",
          })
        }
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
