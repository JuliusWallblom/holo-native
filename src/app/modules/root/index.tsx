import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";

export function RootScreen() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>React Native + Vite</Text>
      <Button
        title="Open Customers"
        onPress={() => navigation.navigate("Customers")}
      />
    </View>
  )
}
