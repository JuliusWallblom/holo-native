import { LinkingList } from "@/types"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { Button } from "react-native"

export function HeaderRight() {
  const navigation = useNavigation<StackNavigationProp<LinkingList>>()

  return <Button onPress={() => navigation.navigate("Example")} title="Example" />
}
