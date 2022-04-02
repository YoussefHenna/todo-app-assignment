import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View } from "react-native";
import HomePage from "./src/pages/home/HomePage";

export default function App() {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <HomePage />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
});
