import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import FontText from "../../components/FontText";
import AddItemDialog from "./components/AddItemDialog";
import TodoItemGroup from "./components/TodoItemGroup";

const HomePage: React.FC = () => {
  const [addItemVisible, setAddItemVisible] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <FontText type="extra_bold" style={styles.title}>
        Todo
      </FontText>

      <Shadow
        startColor="rgba(0,0,0,0.05)"
        containerViewStyle={styles.addButtonShadow}
      >
        <TouchableOpacity
          onPress={() => setAddItemVisible(true)}
          style={styles.addButton}
        >
          <FontText style={styles.addPlus} type="extra_bold">
            +
          </FontText>
        </TouchableOpacity>
      </Shadow>

      <AddItemDialog
        visible={addItemVisible}
        onRequestClose={() => {
          setAddItemVisible(false);
        }}
        onItemAdded={(item) => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 27,
    color: "black",
    marginStart: 14,
  },
  addButtonShadow: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 30,
    backgroundColor: "#ff874b",
    alignItems: "center",
    justifyContent: "center",
  },
  addPlus: {
    fontSize: 40,
    color: "white",
  },
});

export default HomePage;
