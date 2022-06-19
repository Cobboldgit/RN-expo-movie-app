import {
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
  FlatList,
  Image,
  TouchableOpacity,
  Keyboard,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { appColor, appSize } from "../constants";
import { BlurView } from "expo-blur";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import MoviesList from "../components/MoviesList";
import { useNavigation } from "@react-navigation/native";
import SearchHistory from "../components/SearchHistory";
import { useDispatch, useSelector } from "react-redux";
import { deleteSearch, updateSearch } from "../redux/actions/userActions";

const SearchScreen = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState(null);
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userReducers);

  const fetchMovies = () => {
    axios(`https://www.episodate.com/api/search?q=${search.toLowerCase()}`)
      .then((res) => {
        setResult(res.data.tv_shows);
        console.log(res.data.tv_shows);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = () => {
    if (!search) return alert("Nothing to search");
    fetchMovies();
    dispatch(updateSearch(search));
  };

  const handleMoviePressed = (item) => {
    navigate("MovieDetails", item);
  };

  const handleHistory = (text) => {
    const filteredData = userData?.search.filter((item) => {
      return item != text;
    });

    dispatch(deleteSearch(filteredData));
  };

  const handleSearchHistory = (text) => {
    setSearch(text);
  };

  return (
    <View style={{ flex: 1, backgroundColor: appColor.main }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* input  */}
        <View
          style={{
            // backgroundColor: "red",
            height: 80,
            justifyContent: "center",
            paddingHorizontal: appSize.padding,
          }}
        >
          <BlurView
            intensity={100}
            tint="dark"
            style={{
              height: "70%",
              width: "100%",
              borderRadius: 100,
              overflow: "hidden",
              paddingHorizontal: appSize.padding,
              flexDirection: "row",
            }}
          >
            <TextInput
              value={search}
              onChangeText={(value) => setSearch(value)}
              placeholder="Search tv shows here"
              placeholderTextColor={"gray"}
              onSubmitEditing={() => {
                handleSearch();
              }}
              style={{
                height: "100%",
                flex: 8.5,
                backgroundColor: appColor.transparent,
                color: appColor.white,
                fontSize: appSize.padding,
              }}
            />
            <View
              style={{
                height: "100%",
                flex: 1.5,
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor: "red",
              }}
            >
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple("red", false, 20)}
                onPress={handleSearch}
              >
                <View
                  style={{
                    height: "100%",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="search" color={"gray"} size={24} />
                </View>
              </TouchableNativeFeedback>
            </View>
          </BlurView>
        </View>

        {/* listing  */}
        <View
          style={{
            // flexDirection: "row",
            // backgroundColor: "red",
            // paddingBottom: 200
            flex: 1,
          }}
        >
          <FlatList
            data={result}
            keyExtractor={(item, index) => `tv_shows-${item?.id}`}
            ListHeaderComponent={() => {
              return search ? (
                <View
                  style={{
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ color: "gray", fontSize: appSize.padding + 4 }}
                  >
                    {result && "Results for " + search}
                  </Text>
                </View>
              ) : (
                <FlatList
                  style={{
                    flex: 1,
                    alignItems: "center",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-evenly",
                  }}
                  data={userData?.search}
                  keyExtractor={(item, index) => `${item}-${index}`}
                  renderItem={({ item, index }) => {
                    return (
                      <View key={index}>
                        <SearchHistory
                          search={() => handleSearchHistory(item)}
                          text={item}
                          onPress={() => handleHistory(item)}
                        />
                      </View>
                    );
                  }}
                />
              );
            }}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "gray",
                      fontSize: appSize.padding + 4,
                    }}
                  >
                    {search && "No result found for " + search}
                  </Text>
                </View>
              );
            }}
            renderItem={({ item, index }) => {
              return (
                <ListMovies
                  item={item}
                  index={index}
                  result={result}
                  onPress={handleMoviePressed}
                />
              );
            }}
          />
          {/* <View
            style={{
              height: 200,
              width: appSize.width,
              backgroundColor: "red",
              marginBottom: 100,
            }}
          ></View> */}
        </View>
      </SafeAreaView>
    </View>
  );
};

const ListMovies = ({ item, onPress, index, result }) => {
  let imageUrl = item?.image_thumbnail_path;
  return (
    <View
      style={{
        marginBottom:
          index === result.length - 1 ? appSize.padding * 10 : appSize.padding,
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: appSize.width / 2 + 50,
          alignItems: "center",
          marginBottom: appSize.padding,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            color: appColor.white,
            fontSize: appSize.padding + 9,
            fontWeight: "bold",
          }}
        >
          {item?.name}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => onPress(item)}
        style={{
          height: 250,
          width: appSize.width - 10,
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
        <Text
          style={{
            color: appColor.white,
            fontSize: appSize.padding + 4,
            fontWeight: "bold",
          }}
        >
          ({item?.start_date?.split("-")[0] || "Undefined"})
        </Text>
      </View>
    </View>
  );
};

export default SearchScreen;
