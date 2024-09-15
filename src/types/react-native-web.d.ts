declare module "react-native" {
  import * as RNW from "react-native-web"
  export * from "react-native-web"

  // Explicitly declare StyleSheet as a value
  export const StyleSheet: typeof RNW.StyleSheet

  // Explicitly declare Platform as a value
  export const Platform: typeof RNW.Platform
}

declare module "react-native-screens" {
  export * from "react-native"
}
