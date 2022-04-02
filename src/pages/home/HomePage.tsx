import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import AddItemDialog from "./components/AddItemDialog";

const HomePage: React.FC = () => {
  const [addItemVisible, setAddItemVisible] = useState(true);

  return (
    <View style={styles.mainContainer}>
      <AddItemDialog
        visible={addItemVisible}
        onRequestClose={() => {
          setAddItemVisible(false);
        }}
        onItemAdded={(item) => {
          console.log(item);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    color: "black",
  },
});

export default HomePage;
