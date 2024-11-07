import { Text, View, StyleSheet } from "react-native";
import BirthdayCard from '../components/BirthdayCard';
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style ={styles.container}>
      <BirthdayCard />
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
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: "#fff",
  }
})
