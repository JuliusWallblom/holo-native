import { ExampleScreen, RootScreen } from "@/app/modules"
import { HeaderLeft as ExampleHeaderLeft } from "@/app/modules/example/header"
import { HeaderRight as RootHeaderRight } from "@/app/modules/root/header"
import { CROSS_PLATFORM_SCREEN_OPTIONS as screenOptions, CROSS_PLATFORM_STACK as Stack } from "@/constants"

export default function RootStack() {
  return (
    <Stack.Navigator screenOptions={() => screenOptions}>
      <Stack.Screen
        name="Root"
        component={RootScreen}
        options={{
          headerLeft: () => null,
          headerRight: RootHeaderRight
        }}
      />
      <Stack.Screen
        name="Example"
        component={ExampleScreen}
        options={{
          headerLeft: ExampleHeaderLeft
        }}
      />
    </Stack.Navigator>
  )
}
