import { RootScreen } from "@/app/modules"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator()

export default function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={RootScreen} />
    </Stack.Navigator>
  )
}
