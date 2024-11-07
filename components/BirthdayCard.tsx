import { Text, View, StyleSheet } from "react-native";

export default function BirthdayCard() {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.text}>Birthday Card</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292e",
  },
  text: {
    color: 'white'
  }
})
