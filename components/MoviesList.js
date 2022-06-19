import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { appColor, appIcon, appImage, appSize } from "../constants";

const MoviesList = ({ item, onPress, fontSize }) => {
  let imageUrl = item?.image_thumbnail_path;
  return (
    <View
      style={{
        marginBottom: appSize.padding,
        alignItems: "center"
      }}
    >
      <View style={{
        width: 150,
        alignItems: "center",
        marginBottom: appSize.padding
      }}>
        <Text numberOfLines={1} style={{ color: appColor.white, fontSize: fontSize || appSize.padding + 9, fontWeight: "bold" }}>
          {item?.name}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => onPress(item)}
        style={{
          height: 200,
          width: appSize.width / 2 - 25,
          backgroundColor: appColor.main,
          borderRadius: appSize.radius * 2,
          overflow: "hidden",
        }}
      >
        <Image
          source={{ uri: imageUrl }}
          style={{ height: "100%", width: "100%" }}
        />
      </TouchableOpacity>
      <View>
        <Text style={{ color: appColor.white, fontSize: fontSize || appSize.padding + 4, fontWeight: "bold" }}>
          ({item?.start_date?.split('-')[0]})
        </Text>
      </View>
    </View>
  );
};

export default MoviesList;
