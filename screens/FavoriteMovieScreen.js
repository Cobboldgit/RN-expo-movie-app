import { View, Text, ScrollView, FlatList, StatusBar } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { appColor, appSize } from "../constants";
import { useSelector } from "react-redux";
import MoviesList from "../components/MoviesList";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";

const FavoriteMovieScreen = () => {
  const { navigate } = useNavigation();

  const { userData } = useSelector((state) => state.userReducers);

  const handleMoviePressed = (item) => {
    navigate("MovieDetails", item);
  };

  console.log(0 % 2);

  let numColumns = 2;

  return (
    <View style={{ flex: 1, backgroundColor: appColor.main }}>
      <SafeAreaView style={{ flex: 1, paddingHorizontal: appSize.padding, paddingTop: appSize.padding + 4 }}>
        <FlatList
        // ListHeaderComponent={() => {
        //   return <Header left={"Favorites"}/>
        // }}
        ListFooterComponent={() => <View style={{height: 100}}/>}
          numColumns={numColumns}
          data={userData?.favorites}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item, index }) => {
            return (
              <View
                key={index}
                style={{ marginRight: index % 2 === 0 ? appSize.padding+4 : 0 }}
              >
                <MoviesList item={item} onPress={handleMoviePressed} fontSize={appSize.padding + 4} />
              </View>
            );
          }}
        />
      </SafeAreaView>
    </View>
  );
};

export default FavoriteMovieScreen;
