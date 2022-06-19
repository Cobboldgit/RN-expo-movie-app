import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { appColor, appSize } from "../constants";
import { BlurView } from "expo-blur";

const SearchHistory = ({text, onPress, search}) => {
  return (
   <TouchableOpacity onPress={search}>
      <BlurView
    tint="dark"
    intensity={100}
      style={{
        height: 30,
        paddingLeft: appSize.padding,
        paddingRight: appSize.padding * 2 + 10,
        minWidth: 100,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: appColor.btnGray,
        borderRadius: 15,
        margin: 10
      }}
    >
      <View>
        <Text style={{color: "gray"}}>{text}</Text>
      </View>
      <View
        style={{
          position: "absolute",
          height: 20,
          width: 20,
          alignSelf: "flex-end",
          right: appSize.padding -6,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
        onPress={onPress}
        >
          <Ionicons name="close" size={20} color={"gray"} />
        </TouchableOpacity>
      </View>
    </BlurView>
   </TouchableOpacity>
  );
};

export default SearchHistory;
