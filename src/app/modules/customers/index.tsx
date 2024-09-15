import { CustomersTable } from "@/app/modules/customers/components";
import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";

export function CustomersScreen() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Customers</Text>
      <CustomersTable />
      <Button
        title="Go back"
        onPress={() => navigation.goBack()}
      />
    </View>
  )
}
