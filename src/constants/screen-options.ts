import { StackNavigationOptions } from "@react-navigation/stack"
import { Platform } from "react-native"

export const WEB_SCREEN_OPTIONS: Readonly<StackNavigationOptions> = {
  headerMode: "screen",
  animationEnabled: false
}

export const NATIVE_SCREEN_OPTIONS: Readonly<StackNavigationOptions> = {}

export const CROSS_PLATFORM_SCREEN_OPTIONS = Platform.OS === "web" ? WEB_SCREEN_OPTIONS : NATIVE_SCREEN_OPTIONS
