import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  TouchableNativeFeedback,
  Animated,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { appColor, appSize } from "../constants";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import axios from "axios";
import { Env } from "../env";
import { LinearGradient } from "expo-linear-gradient";
import { FadeBottom } from "../components";
import Header from "../components/Header";
import { BlurView } from "expo-blur";
import WebView from "react-native-webview";
import { EvilIcons, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToFav, removeFromFav } from "../redux/actions/userActions";

const AnimatedFavIcon = Animated.createAnimatedComponent(MaterialIcons);

const MovieDetailsScreen = () => {
  const item = useRoute().params;
  // let imageUrl = item?.image_thumbnail_path;
  const [movieDetails, setDetails] = useState(null);
  const { navigate, goBack } = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemLink, setLink] = useState("*");
  const [isLoading, setIsLoading] = useState(true);
  const [addFav, setAddFav] = useState(false);
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userReducers);
  const isFocused = useIsFocused();

  const fetchMoviesDetails = () => {
    axios(`https://www.episodate.com/api/show-details?q=${item?.id}`)
      .then((res) => {
        setDetails(res.data.tvShow);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const dataFetched = fetchMoviesDetails();
    return () => dataFetched;
  }, []);

  useEffect(() => {
    let data = userData?.favorites?.find((fav) => fav.id === item.id);
    if (data) {
      setAddFav(true);
    } else {
      setAddFav(false);
    }
  }, [isFocused]);

  // handle favorites
  const handleFavorites = () => {
    setAddFav(!addFav);
    if (!addFav) {
      dispatch(addToFav(item));
      // console.log(item);
    } else {
      // const filteredData = userData[0]?.favorites?.filter((fav) => {
      //   return fav.id != item?.id
      // });
      dispatch(removeFromFav(item));
      // console.log(filteredData);
    }
  };

  const imageUrl = movieDetails?.image_path;

  const handleReadMore = (link) => {
    setLink(link);
    setModalVisible(!modalVisible);
  };

  const handleLoading = () => {
    setIsLoading(false);
    console.log("loading");
  };

  const renderModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {}}
      >
        <BlurView tint="light" intensity={140} style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <EvilIcons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <WebView
            style={{ flex: 1 }}
            onLoad={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
            originWhitelist={["*"]}
            source={{
              uri: selectedItemLink,
            }}
          />
          {isLoading && (
            <BlurView
              tint="dark"
              intensity={110}
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                zIndex: 999,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator
                color={appColor.red}
                size="large"
                hidesWhenStopped={true}
              />
            </BlurView>
          )}
        </BlurView>
      </Modal>
    );
  };

  return (
    <ImageBackground
      blurRadius={30}
      source={{ uri: imageUrl }}
      style={{ flex: 1, backgroundColor: appColor.main }}
    >
      {renderModal()}
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            // paddingTop: appSize.padding,
          }}
        >
          <ScrollView>
            {/* cover image  */}
            {/* <View
              style={{
                height: 650,
                width: appSize.width,
                overflow: "hidden",
                position: "absolute",
                zIndex: -1,
              }}
            >
              <Image
                source={{ uri: imageUrl }}
                style={{
                  height: "100%",
                  width: "100%",
                  // borderRadius: appSize.radius * 2,
                }}
              />
            </View> */}
            <View
              style={{
                height: 80,
                flexDirection: "row",
                paddingHorizontal: appSize.padding,
              }}
            >
              <View
                style={{
                  flex: 8,
                  justifyContent: "center",
                }}
              >
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple("red", false, 20)}
                  onPress={() => goBack()}
                >
                  <View
                    style={{
                      width: 50,
                      height: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <MaterialIcons
                      name="keyboard-arrow-left"
                      color={appColor.white}
                      size={35}
                    />
                  </View>
                </TouchableNativeFeedback>
              </View>
              <View
                style={{
                  flex: 2,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    handleFavorites();
                  }}
                >
                  <AnimatedFavIcon
                    name={(!addFav && "favorite-outline") || "favorite"}
                    color={(!addFav && appColor.white) || appColor.red}
                    size={24}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                  <MaterialIcons
                    name="share"
                    color={appColor.white}
                    size={24}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                height: 400,
                width: appSize.width,
                overflow: "hidden",
              }}
            >
              <Image
                resizeMode="contain"
                source={{ uri: imageUrl }}
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: appSize.radius * 2,
                }}
              />
            </View>

            {/* heading  */}
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: appSize.padding,
                height: 70,
                // justifyContent: "center",
                alignItems: "center",
                // width: appSize.width - 50
                flex: 1,
                width: appSize.width - 50,
                alignSelf: "center",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  numberOfLines={1}
                  style={{
                    color: appColor.white,
                    fontSize: appSize.padding + 9,
                    fontWeight: "bold",
                  }}
                >
                  {item?.name} ({item?.start_date?.split("-")[0]}).
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text
                  numberOfLines={1}
                  style={{
                    color: appColor.white,
                    fontSize: appSize.padding,
                    marginLeft: 5,
                    opacity: 0.7,
                  }}
                >
                  {item?.status}
                </Text>
              </View>
            </View>

            {/* episodes  */}
            <LinearGradient
              colors={[appColor.main, appColor.transparent]}
              end={{
                x: 0.8,
                y: 0.4,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: 150,
                  padding: appSize.padding - 6,
                }}
              >
                <Text
                  style={{
                    color: appColor.white,
                    fontSize: appSize.padding,
                    fontWeight: "bold",
                  }}
                >
                  Network
                </Text>
                <Text
                  style={{ color: appColor.white, fontSize: appSize.padding }}
                >
                  {movieDetails?.network || "undefined"}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: 150,
                  padding: appSize.padding - 6,
                }}
              >
                <Text
                  style={{
                    color: appColor.white,
                    fontSize: appSize.padding,
                    fontWeight: "bold",
                  }}
                >
                  Episodes
                </Text>
                <Text
                  style={{ color: appColor.white, fontSize: appSize.padding }}
                >
                  {movieDetails?.episodes?.length}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: 150,
                  padding: appSize.padding - 6,
                }}
              >
                <Text
                  style={{
                    color: appColor.white,
                    fontSize: appSize.padding,
                    fontWeight: "bold",
                  }}
                >
                  seasons
                </Text>
                <Text
                  style={{ color: appColor.white, fontSize: appSize.padding }}
                >
                  {movieDetails?.episodes &&
                    movieDetails?.episodes[movieDetails?.episodes.length - 1]
                      ?.season}
                </Text>
              </View>
            </LinearGradient>

            {/* description  */}
            <View
              style={{
                paddingHorizontal: appSize.padding,
                paddingTop: appSize.padding,
                marginBottom: appSize.padding,
              }}
            >
              <Text
                style={{
                  fontSize: appSize.padding + 2,
                  color: appColor.white,
                  lineHeight: appSize.padding * 2 - 6,
                }}
              >
                {movieDetails?.description}{" "}
              </Text>
              {movieDetails?.description_source && (
                <TouchableOpacity
                  style={{ justifyCoalntent: "center" }}
                  onPress={() =>
                    handleReadMore(movieDetails?.description_source)
                  }
                >
                  <Text
                    style={{
                      color: appColor.white,
                      fontWeight: "bold",
                      fontSize: appSize.padding + 2,
                    }}
                  >
                    Read more
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            {movieDetails?.pictures ? (
              <View>
                <Header left={"Images"} />
                {movieDetails?.pictures.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        height: appSize.width - 50,
                        backgroundColor: appColor.main,
                        marginBottom: appSize.padding + 4,
                      }}
                    >
                      <Image
                        resizeMode="contain"
                        source={{ uri: item }}
                        style={{ height: "100%", width: "100%" }}
                      />
                    </View>
                  );
                })}
              </View>
            ) : null}
          </ScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default MovieDetailsScreen;
