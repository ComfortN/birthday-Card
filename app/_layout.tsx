import { Stack } from "expo-router";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <View style={{ flex: 1}}>
    <Stack>
      <Stack.Screen name="index" 
      options={{
        headerTitle: "Birthday Card Creator",
        }} />
      
    </Stack>
    </View>
  );
}
