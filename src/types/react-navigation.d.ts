declare module "@react-navigation/native" {
  export * from "@react-navigation/native"
  export function useNavigation(): any
  export const NavigationContainer: React.ComponentType<any>
}

declare module "@react-navigation/native-stack" {
  import { ParamListBase, RouteProp } from "@react-navigation/native"

  export type NativeStackNavigationProp<ParamList extends ParamListBase> = {
    navigate<RouteNameParam extends keyof ParamList>(
      ...args: RouteNameParam extends unknown
        ? [RouteNameParam] | [RouteNameParam, ParamList[RouteNameParam]]
        : never
    ): void
  }

  export function createNativeStackNavigator(): any

  export type NativeStackScreenProps<
    ParamList extends ParamListBase,
    RouteName extends keyof ParamList = string
  > = {
    navigation: NativeStackNavigationProp<ParamList>
    route: RouteProp<ParamList, RouteName>
  }
}
