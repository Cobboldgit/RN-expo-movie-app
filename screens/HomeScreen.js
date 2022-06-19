import { View, Text, ScrollView, Image, TouchableOpacity, StatusBar, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { appColor, appImage, appSize } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import {
  TopImageSlider,
  RecentWatched,
  FavoriteSlider,
  TvShowsSlider,
} from "../components/ImageSlider";
import MoviesList from "../components/MoviesList";
import Header from "../components/Header";
import { Env } from "../env";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserData } from "../redux/actions/userActions";

const HomeScreen = () => {
  const [movie, setMovie] = useState(null);
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userReducers);
  const isFocused = useIsFocused()

  const fetchMovies = () => {
    axios("https://www.episodate.com/api/most-popular?page=1")
      .then((res) => {
        setMovie(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchMovies();
    const getUserData = dispatch(getAllUserData());
    return () => getUserData;
  }, [isFocused]);


  const handleMoviePressed = (item) => {
    navigate("MovieDetails", item);
  };

  const handleFavSeeAll = (item) => {
    navigate("Favorite", item)
  }

  return (
    <View style={{ flex: 1, backgroundColor: appColor.main }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView stickyHeaderIndices={[0]}>
          {/* header  */}
          <View
            style={{
              height: 70,
              paddingVertical: appSize.padding,
              justifyContent: "center",
              backgroundColor: appColor.main,
              marginBottom: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: appColor.main,
                paddingHorizontal: appSize.padding,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                {/* Profile image  */}
                <View
                  style={{
                    height: 45,
                    width: 45,
                    backgroundColor: appColor.main,
                    borderRadius: 100,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    source={appImage.loginImage}
                    style={{ height: "100%", width: "100%" }}
                  />
                </View>

                {/* profile name  */}
                <View style={{ marginLeft: 10 }}>
                  <Text
                    style={{
                      color: appColor.white,
                      fontSize: appSize.padding,
                      letterSpacing: 1,
                    }}
                  >
                    Hello,
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      color: appColor.white,
                      fontWeight: "bold",
                    }}
                  >
                    {userData?.displayName?.split(" ")[0]}
                  </Text>
                </View>
              </View>

              {/* notification button  */}
              <View style={{}}>
                <View
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: appSize.padding - 10,
                    backgroundColor: appColor.lightGlass,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: appColor.red,
                      height: 5,
                      width: 5,
                      borderRadius: 10,
                      position: "absolute",
                      transform: [{ translateX: 7 }, { translateY: -10 }],
                      zIndex: 999,
                    }}
                  />
                  <MaterialIcons
                    name="notifications"
                    size={22}
                    color={appColor.white}
                  />
                </View>
              </View>
            </View>
          </View>
          {/* header end  */}

          {/* top Slider  */}
          <View style={{ height: 320 }}>
            <TopImageSlider />
          </View>

          {/* recent watched text   and see all button */}
          {/* <Header left={"Recent Watched"} right={"See all"} /> */}

          {/* bottom slider  */}
          {/* <View
            style={{
              height: 220,
              paddingVertical: 10,
              marginBottom: 10,
            }}
          >
            <RecentWatched />
          </View> */}
          {/*  favorite text   and see all button */}
          {userData?.favorites?.length >= 1 ? (
            <View>
              <Header left={"My Favorite"} right={"See all"} onPress={() => handleFavSeeAll()}/>
              {/* bottom slider  */}
              <View
                style={{
                  height: 220,
                  paddingVertical: 10,
                  marginBottom: 10,
                }}
              >
                <FavoriteSlider
                  favItem={userData?.favorites}
                  onPress={handleMoviePressed}
                />
              </View>
            </View>
          ) : null}

          {/* movies header */}
          <Header
            left={"Most Popular TV shows"}
            right={<MaterialIcons name="keyboard-arrow-right" size={35} />}
            onPress={() => navigate("TVShows", movie?.tv_shows)}
          />

          {/* movies  */}
          <View
            style={{
              paddingHorizontal: appSize.padding,
              marginTop: 10,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
              marginBottom: 150,
              // backgroundColor:"red",
              height: 250,
            }}
          >
            {movie?.tv_shows ? (
              <TvShowsSlider
                tvShowsData={movie?.tv_shows.slice(0, 6)}
                onPress={handleMoviePressed}
              />
            ) : (
              <Text style={{ color: "white" }}>No data</Text>
            )}
            {/* {movie?.tv_shows.map((item, index) => {
              // console.log("item ======> slice", item);
              return (
                <View key={index}>
                  <MoviesList item={item} onPress={handleMoviePressed} />
                </View>
              );
            })} */}
            {/* <MoviesList/>
            <MoviesList/>
            <MoviesList/> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
