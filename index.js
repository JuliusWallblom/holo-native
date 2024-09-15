import "react-native-web-refresh-control"
import "react-native-web-webview"

import { AppRegistry } from "react-native"
import App from "@/app/app"
import { name as appName } from "./app.json"

AppRegistry.registerComponent(appName, () => App)
