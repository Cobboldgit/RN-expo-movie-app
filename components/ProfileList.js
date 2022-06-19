import { View, Text, TouchableNativeFeedback } from "react-native";
import React from "react";
import { appSize, appColor } from "../constants";

const ProfileList = ({ titile, icon, onPress }) => {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple(
        "red",
        false,
        appSize.width / 2
      )}
      onPress={onPress}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          // backgroundColor: "red",
          height: 50,
          paddingHorizontal: appSize.padding,
        }}
      >
        <View style={{ flex: 1 }}>{icon}</View>
        <View style={{ flex: 9 }}>
          <Text style={{ color: appColor.white, fontSize: appSize.padding }}>
            {titile}
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default ProfileList;
