import { View, Text, StyleSheet } from "react-native";
import React from "react";
import WebView from "react-native-webview";

const WatchMovieScreen = () => {
  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      <WebView
        style={{ flex: 1 }}
        originWhitelist={["*"]}
        source={{
          html: '<iframe class="streamable-embed" src="https://streamable.com/o/hn8hq" frameborder="0" scrolling="no" width="1280" height="720" allowfullscreen></iframe>',
        }}
      />
    </View>
  );
};

export default WatchMovieScreen;
