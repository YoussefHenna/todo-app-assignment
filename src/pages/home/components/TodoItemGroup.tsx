import React from "react";
import { StyleSheet, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import FontText from "../../../components/FontText";
import TodoItemComp from "./TodoItemComp";

interface TodoItemGroupProps {
  items: TodoItem[];
  onItemCheckChange: (item: TodoItem, isChecked: boolean) => void;
  index: number;
}

const TodoItemGroup: React.FC<TodoItemGroupProps> = (props) => {
  const colors = ["#ff5db2", "#579d9c", "#f9c35e"];
  const currentColor = colors[props.index % 3];

  return (
    <Shadow
      containerViewStyle={styles.shadowContainer}
      offset={[0, 5]}
      startColor="rgba(0,0,0,0.05)"
      viewStyle={styles.mainContainer}
    >
      <View style={styles.mainContainer}>
        <FontText
          type="bold"
          style={[styles.titleText, { backgroundColor: currentColor }]}
        >
          {props.items[0].group?.toUpperCase()}
        </FontText>
        <View style={styles.itemsContainer}>
          {props.items.map((item, index) => {
            return (
              <TodoItemComp
                key={index.toString() + item}
                item={item}
                onCheckChange={(isChecked) =>
                  props.onItemCheckChange(item, isChecked)
                }
              />
            );
          })}
        </View>
      </View>
    </Shadow>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
  },
  mainContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    width: "100%",
  },
  titleText: {
    textAlign: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: "absolute",
    top: -10,
    left: 15,
    color: "white",
    borderRadius: 5,
  },
  itemsContainer: {
    paddingTop: 35,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

export default TodoItemGroup;
