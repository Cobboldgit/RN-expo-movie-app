import { View, Text, ScrollView, Animated } from "react-native";
import React, { useEffect, useState } from "react";
import { appColor, appSize, appIcon } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import MoviesList from "../components/MoviesList";
import axios from "axios";

const TVShowsSeeAllScreen = () => {
  const item = useRoute().params;
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);
  const { navigate, goBack } = useNavigation();

  //   console.log(item.slice(0, 4));

  const fetchMovies = () => {
    axios(`https://www.episodate.com/api/most-popular?page=${page}`)
      .then((res) => {

        setMovies(res.data.tv_shows);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);


  const handleMoviePressed = (item) => {
    navigate("MovieDetails", item);
  };

  const handleLoad = (item) => {
    setPage(page + 1)
  }

  return (
    <View style={{ flex: 1, backgroundColor: appColor.main }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Animated.ScrollView
            scrollEventThrottle={16}
         >
          <View style={{ height: 50 }}>
            <Header left={"TV Shows"} right={"see more"} onPress={handleLoad}/>
          </View>
          <View
            style={{
              paddingHorizontal: appSize.padding,
              marginTop: 10,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {movies?.map((item, index) => {
              return (
                <View key={index}>
                  <MoviesList item={item} onPress={handleMoviePressed} />
                </View>
              );
            })}
          </View>
        </Animated.ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default TVShowsSeeAllScreen;
