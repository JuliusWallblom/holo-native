import { RootScreen, CustomersScreen } from "@/app/modules"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator()

export default function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={RootScreen} />
      <Stack.Screen name="Customers" component={CustomersScreen} />
    </Stack.Navigator>
  )
}
