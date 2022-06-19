import { View, Text } from "react-native";
import React from "react";
import { appColor, appSize } from "../constants";
import { LinearGradient } from "expo-linear-gradient";

const FadeBottom = ({ height, width }) => {
  return (
    <LinearGradient
      style={{
        height: (!height && appSize.height) || height,
        width: (!width && appSize.width) || width,
        position: "absolute",
        zIndex: 999,
      }}
      colors={[appColor.transparent, appColor.main]}
      end={{ x: 0.5, y: 1 }}
    />
  );
};

export default FadeBottom;
