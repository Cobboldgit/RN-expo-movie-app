import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableNativeFeedback,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { appColor, appSize } from "../constants";
import Svg, { Defs, Path } from "react-native-svg";
import { useDispatch } from "react-redux";
import { signOut } from "../redux/actions/authActions";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import ProfileList from "../components/ProfileList";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut())
  }

  // const renderAboutUs = () => {
  //   return (

  //   )
  // }

  return (
    <View style={{ flex: 1, backgroundColor: appColor.main }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 4,
            backgroundColor: "#141414",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "red",
              height: 100,
              width: 100,
              borderRadius: 50,
            }}
          ></View>
          <Text
            style={{
              color: appColor.white,
              fontSize: appSize.padding + 4,
              marginTop: appSize.padding,
            }}
          >
            Augustine Cobbold
          </Text>
        </View>
        <View style={{ flex: 6, paddingTop: appSize.padding }}>
         <ProfileList icon={<MaterialIcons name="edit" size={24} color={appColor.white} />} titile={"Edit profile"}/>
         <ProfileList icon={<MaterialIcons name="person-add" size={24} color={appColor.white} />} titile={"Invite friends"}/>
         <ProfileList icon={<MaterialIcons name="question-answer" size={24} color={appColor.white} />} titile={"About us"}/>
         <ProfileList icon={<MaterialIcons name="outbox" size={24} color={appColor.white} />} titile={"Sign out"} onPress={handleSignOut}/>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ProfileScreen;
