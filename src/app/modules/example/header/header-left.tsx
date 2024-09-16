import { LinkingList } from "@/types"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { Button } from "react-native"

export function HeaderLeft() {
  const navigation = useNavigation<StackNavigationProp<LinkingList>>()

  function handlePress() {
    if (navigation.canGoBack()) {
      navigation.goBack()
    } else {
      navigation.navigate("Root")
    }
  }

  return <Button title="Back" onPress={handlePress} />
}
