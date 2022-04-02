import { useFonts } from "expo-font";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

interface TodoItemCompProps {
  item: TodoItem;
  onCheckChange: (isChecked: boolean) => void;
}

const TodoItemComp: React.FC<TodoItemCompProps> = ({ item, onCheckChange }) => {
  let [fontsLoaded] = useFonts({
    "Manrope-Regular": require("../../../../assets/fonts/Manrope-Regular.ttf"),
  });

  const [isChecked, setIsChecked] = useState(item.completed);

  return (
    <View style={styles.mainContainer}>
      <BouncyCheckbox
        isChecked={isChecked}
        size={25}
        fillColor="#1bcdaa"
        text={item.item}
        iconStyle={!isChecked ? { borderColor: "#D3D3D3" } : {}}
        textStyle={[
          styles.text,
          fontsLoaded ? { fontFamily: "Manrope-Regular" } : {},
        ]}
        onPress={(isChecked: boolean) => {
          onCheckChange(isChecked);
          setIsChecked(isChecked);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    color: "black",
  },
});

export default TodoItemComp;
