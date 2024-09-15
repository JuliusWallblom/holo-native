import { appStyles as styles } from "@/styles"
import { Text, View } from "react-native"
import { Providers } from "@/app/providers"

export default function App() {
  return (
    <Providers>
      <View style={styles.container}>
        <Text style={styles.text}>React Native + Vite</Text>
      </View>
    </Providers>
  )
}
