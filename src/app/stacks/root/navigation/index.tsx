import { RootStack } from "@/app/stacks"
import { LinkingList } from "@/types"
import { LinkingOptions, NavigationContainer } from "@react-navigation/native"

export function RootNavigation() {
  const linking: LinkingOptions<LinkingList> = {
    prefixes: ["http://localhost:3000"],
    config: {
      screens: {
        Root: "",
        Example: "example"
      }
    }
  }

  return (
    <NavigationContainer linking={linking}>
      <RootStack />
    </NavigationContainer>
  )
}
