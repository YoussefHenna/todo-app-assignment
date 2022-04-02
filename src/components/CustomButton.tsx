import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import FontText from "./FontText";

interface ButtonProps {
  text: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  enabled: boolean;
}

const CustomButton: React.FC<ButtonProps> = (props) => {
  return (
    <TouchableOpacity onPress={props.enabled ? props.onPress : undefined}>
      <View
        style={[
          styles.button,
          props.style,
          !props.enabled ? { backgroundColor: "#D3D3D3" } : {},
        ]}
      >
        <FontText style={styles.text} type="bold">
          {props.text}
        </FontText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ff874b",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    color: "white",
  },
});

export default CustomButton;
