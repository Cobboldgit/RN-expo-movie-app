import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { appImage, appColor, appSize } from "../constants";

export const TopImageSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const _carousel = useRef(null);
  const { _ref, setRef } = useState(null);
  const [entries, setEntries] = useState([
    {
      url: appImage.loginImage,
      header: "Header Here",
    },
    {
      url: appImage.loginImage,
      header: "Header Here",
    },
    {
      url: appImage.loginImage,
      header: "Header Here",
    },
    {
      url: appImage.loginImage,
      header: "Header Here",
    },
    {
      url: appImage.loginImage,
      header: "Header Here",
    },
    {
      url: appImage.loginImage,
      header: "Header Here",
    },
  ]);

  const _renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <Image
          source={item.url}
          style={{ height: 200, width: 200, borderRadius: appSize.radius * 2 }}
        />
        <View
          style={{
            alignItems: "center",
            height: 80,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: appSize.padding + 14,
              fontWeight: "bold",
              color: appColor.white,
            }}
          >
            {_carousel.current._activeItem === index && item.header}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Carousel
        ref={_carousel}
        layout={"default"}
        data={entries}
        renderItem={_renderItem}
        sliderWidth={appSize.width}
        itemWidth={220}
        loop={true}
        loopClonesPerSide={2}
        autoplay={true}
        autoplayDelay={5000}
        autoplayInterval={6000}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={activeIndex}
        dotColor={appColor.white}
        inactiveDotColor={appColor.white}
        inactiveDotScale={0.6}
        inactiveDotOpacity={0.4}
        carouselRef={_carousel}
        tappableDots={!!_carousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 10,
        }}
      />
    </View>
  );
};

// Recent watch slider
export const RecentWatched = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const _carousel = useRef(null);
  const { _ref, setRef } = useState(null);
  const [entries, setEntries] = useState([
    {
      url: appImage.loginImage,
      header: "Header Here",
    },
    {
      url: appImage.loginImage,
      header: "Header Here",
    },
    {
      url: appImage.loginImage,
      header: "Header Here",
    },
    {
      url: appImage.loginImage,
      header: "Header Here",
    },
    {
      url: appImage.loginImage,
      header: "Header Here",
    },
    {
      url: appImage.loginImage,
      header: "Header Here",
    },
  ]);

  useEffect(() => {
    //   _carousel.current
  }, []);

  const _renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <Image
          source={item.url}
          style={{ height: 200, width: 150, borderRadius: appSize.radius * 2 }}
        />
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Carousel
        ref={_carousel}
        layout={"default"}
        inactiveSlideScale={1}
        inactiveSlideOpacity={0.5}
        activeSlideAlignment={"start"}
        data={entries}
        renderItem={_renderItem}
        sliderWidth={appSize.width}
        itemWidth={180}
        loop={false}
        loopClonesPerSide={2}
        autoplay={false}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
    </View>
  );
};

// Favorite slider
export const FavoriteSlider = ({ favItem, onPress }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const _carousel = useRef(null);
  const { _ref, setRef } = useState(null);
  const [entries, setEntries] = useState(favItem);

  // console.log("fav==>jf",favItem);

  useEffect(() => {
    //   _carousel.current
  }, []);

  const _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => onPress(item)}
        style={{
          flex: 1,
        }}
      >
        <Image
          source={{ uri: item?.image_thumbnail_path }}
          style={{ height: 200, width: 150, borderRadius: appSize.radius * 2 }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Carousel
        ref={_carousel}
        layout={"default"}
        inactiveSlideScale={1}
        inactiveSlideOpacity={0.5}
        activeSlideAlignment={"start"}
        data={entries}
        renderItem={_renderItem}
        sliderWidth={appSize.width}
        itemWidth={180}
        loop={false}
        loopClonesPerSide={2}
        autoplay={false}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
    </View>
  );
};

// Tvshows slider
export const TvShowsSlider = ({ tvShowsData, onPress }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const _carousel = useRef(null);
  const { _ref, setRef } = useState(null);
  const [entries, setEntries] = useState(tvShowsData);

  // console.log("Tv shows data ====>", tvShowsData);

  useEffect(() => {
    //   _carousel.current
  }, []);

  const _renderItem = ({ item, index }) => {
    const imageUrl = item.image_thumbnail_path;
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <TouchableOpacity onPress={() => onPress(item)}>
          <Image
            source={{ uri: imageUrl }}
            style={{
              height: 200,
              width: 150,
              borderRadius: appSize.radius * 2,
            }}
          />
        </TouchableOpacity>
        <Text
          numberOfLines={1}
          style={{
            fontSize: appSize.padding + 4,
            fontWeight: "bold",
            color: appColor.white,
            width: 140,
            marginTop: appSize.padding,
          }}
        >
          {item?.name}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Carousel
        ref={_carousel}
        layout={"default"}
        inactiveSlideScale={1}
        inactiveSlideOpacity={0.5}
        activeSlideAlignment={"start"}
        data={entries}
        renderItem={_renderItem}
        sliderWidth={appSize.width}
        itemWidth={180}
        loop={true}
        loopClonesPerSide={2}
        autoplay={true}
        autoplayDelay={2000}
        autoplayInterval={3000}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
    </View>
  );
};

const Slider = {
  TopImageSlider,
  RecentWatched,
  FavoriteSlider,
  TvShowsSlider,
};

export default Slider;
