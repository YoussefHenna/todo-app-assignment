import React from "react";
import { useFonts } from "expo-font";
import { Text, TextProps, TextStyle } from "react-native";

interface FontTextProps extends TextProps {
  type?: "bold" | "extra_bold" | "extra_light" | "light" | "medium" | "regular";
}

const FontText: React.FC<FontTextProps> = ({ type = "regular", ...props }) => {
  let [fontsLoaded] = useFonts({
    "Manrope-Bold": require("../../assets/fonts/Manrope-Bold.ttf"),
    "Manrope-ExtraBold": require("../../assets/fonts/Manrope-ExtraBold.ttf"),
    "Manrope-ExtraLight": require("../../assets/fonts/Manrope-ExtraLight.ttf"),
    "Manrope-Light": require("../../assets/fonts/Manrope-Light.ttf"),
    "Manrope-Medium": require("../../assets/fonts/Manrope-Medium.ttf"),
    "Manrope-Regular": require("../../assets/fonts/Manrope-Regular.ttf"),
  });

  let selectedFont = "Manrope-Regular";
  switch (type) {
    case "bold":
      selectedFont = "Manrope-Bold";
      break;
    case "extra_bold":
      selectedFont = "Manrope-ExtraBold";
      break;
    case "extra_light":
      selectedFont = "Manrope-ExtraLight";
      break;
    case "light":
      selectedFont = "Manrope-Light";
      break;
    case "medium":
      selectedFont = "Manrope-Medium";
      break;
    case "regular":
      selectedFont = "Manrope-Regular";
      break;
  }

  const textStyle: TextStyle = fontsLoaded ? { fontFamily: selectedFont } : {};

  return <Text {...props} style={[props.style, textStyle]} />;
};

export default FontText;
