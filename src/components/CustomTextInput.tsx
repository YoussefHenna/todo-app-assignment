import { useFonts } from "expo-font";
import React from "react";
import { StyleProp, StyleSheet, TextPropTypes, ViewStyle } from "react-native";
import { Hoshi } from "react-native-textinput-effects";

interface CustomTextInputProps {
  value: string;
  onValueChanged: (value: string) => void;
  label: string;
  style?: StyleProp<ViewStyle>;
}

const CustomTextInput: React.FC<CustomTextInputProps> = (props) => {
  let [fontsLoaded] = useFonts({
    "Manrope-Regular": require("../../assets/fonts/Manrope-Regular.ttf"),
    "Manrope-SemiBold": require("../../assets/fonts/Manrope-SemiBold.ttf"),
  });

  return (
    <Hoshi
      style={props.style}
      label={props.label}
      value={props.value}
      onChangeText={props.onValueChanged}
      borderColor="#1bcdaa"
      inputPadding={16}
      inputStyle={
        fontsLoaded
          ? { fontFamily: "Manrope-Regular", fontWeight: "100", color: "black" }
          : {}
      }
      labelStyle={fontsLoaded ? { fontFamily: "Manrope-SemiBold" } : {}}
      animationDuration={350}
    />
  );
};

export default CustomTextInput;
