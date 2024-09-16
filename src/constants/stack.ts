import { LinkingList } from "@/types"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createStackNavigator } from "@react-navigation/stack"
import { Platform } from "react-native"

export const WEB_STACK = Platform.OS === "web" ? createStackNavigator<LinkingList>() : createNativeStackNavigator<LinkingList>()

export const NATIVE_STACK = createNativeStackNavigator<LinkingList>()

export const CROSS_PLATFORM_STACK = Platform.OS === "web" ? WEB_STACK : NATIVE_STACK
