import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { appColor, appSize } from "../constants";

const Header = ({ onPress, right, left }) => {
  return (
    <View
      style={{
        paddingHorizontal: appSize.padding,
        justifyContent: "space-between",
        flexDirection: "row",
        height: 30,
        alignItems: "center",
        marginTop: appSize.padding + 4,
      }}
    >
      <Text style={{ color: appColor.white, fontSize: 18 }}>{left}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={{ color: appColor.white, fontSize: 16, opacity: 0.7 }}>
          {right}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
