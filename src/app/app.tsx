import { Providers } from "@/app/providers"
import { NavigationContainer } from "@react-navigation/native"
import { RootStack } from "@/app/stacks"

export default function App() {
  return (
    <Providers>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Providers>
  )
}
