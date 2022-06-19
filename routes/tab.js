import { View, Text, StyleSheet } from "react-native";
import React from "react";
import {
  createBottomTabNavigator,
  BottomTabBar,
} from "@react-navigation/bottom-tabs";
import {
  FavoriteMovieScreen,
  HomeScreen,
  ProfileScreen,
  SearchScreen,
  WatchMovieScreen,
} from "../screens";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { appColor, appSize } from "../constants";
import { BlurView } from "expo-blur";

const Tab = createBottomTabNavigator();

const CustomTabBar = (props) => {
  return (
    <BlurView
      intensity={120}
      tint="dark"
      style={{
        position: "absolute",
        bottom: 10,
        left: 0,
        right: 0,
        borderRadius: appSize.radius * 7,
        width: appSize.width - 30,
        height: 70,
        justifyContent: "center",
        marginHorizontal: appSize.padding,
        borderColor: "#4e0000",
        borderWidth: StyleSheet.hairlineWidth
      }}
    >
      <BottomTabBar {...props} />
    </BlurView>
  );
};

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#d9d9d9",
        tabBarStyle: {
          // borderTopColor: "#666",
          borderTopWidth: 0,
          backgroundColor: appColor.transparent,
          elevation: 0,
        },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "ios-home" : "ios-home-outline"}
              size={24}
              color={focused ? appColor.red : appColor.white}
            />
          ),
        }}
      />
      {/* <Tab.Screen name="Watch" component={WatchMovieScreen} /> */}
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "ios-search" :"ios-search" }
              size={24}
              color={focused ? appColor.red : appColor.white}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteMovieScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "heart" : "ios-heart-outline"}
              size={24}
              color={focused ? appColor.red : appColor.white}
            />
          ),
          // tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "ios-person" : "ios-person-outline"}
              size={24}
              color={focused ? appColor.red : appColor.white}
            />
          ),
          // tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
