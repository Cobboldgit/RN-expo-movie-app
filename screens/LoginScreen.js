import {
  View,
  Text,
  Image,
  TextInput,
  Animated,
  ScrollView,
  Dimensions,
  TouchableNativeFeedback,
} from "react-native";
import React, { useState, useRef } from "react";
import { appColor, appImage, appSize } from "../constants";
import { BlurView } from "expo-blur";
import { AnimatedInput, FadeBottom } from "../components";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/actions/authActions";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {navigate} = useNavigation()
  const dispatch = useDispatch()

  const handleLogin = () => {
    if (email && password) {
      dispatch(loginUser(email, password))
    } else {
      alert("All fields are required")
    }
  };

  const handleNoAccount = () => {
    navigate('Signup')
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appColor.main,
        paddingHorizontal: appSize.padding,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FadeBottom />
      <Image
        source={appImage.loginImage}
        style={{ height: 400, width: "100%" }}
        blurRadius={5}
      />
      <View
        style={{
          position: "absolute",
          height: appSize.height,
          width: appSize.width,
          zIndex: 999,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BlurView
          intensity={100}
          tint="dark"
          style={{
            width: 300,
            height: 400,
            borderRadius: appSize.radius * 2,
            paddingHorizontal: appSize.padding + 4,
            paddingVertical: appSize.padding + 4,
            // transform: [{translateY: appSize.height - 500}]
          }}
        >
          <ScrollView>
            <View style={{ paddingVertical: appSize.padding + 5 }}>
              <Text
                style={{
                  fontSize: appSize.input * 2,
                  color: appColor.white,
                  fontWeight: "bold",
                }}
              >
                Login
              </Text>
            </View>
            <View>
              <AnimatedInput
                placeholder={"Enter your email"}
                value={email}
                onChange={(value) => setEmail(value)}
                marginBottom={appSize.padding + 5}
              />
              <AnimatedInput
                placeholder={"Enter your password"}
                value={password}
                onChange={(value) => setPassword(value)}
                marginBottom={appSize.padding + 5}
              />
              <View style={{ alignItems: "center" }}>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple("gray", false, 90)}
                  onPress={handleLogin}
                >
                  <View
                    style={{
                      backgroundColor: appColor.red,
                      height: 50,
                      width: "80%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: appSize.radius * 2,
                    }}
                  >
                    <Text
                      style={{ fontSize: appSize.input, color: appColor.white }}
                    >
                      Login
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: appSize.padding,
                }}
              >
                <Text style={{ color: appColor.white }}>
                  Don't have an account?
                </Text>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple("gray", false, 10)}
                  onPress={handleNoAccount}
                >
                  <View style={{}}>
                    <Text style={{ color: appColor.red, fontWeight: "bold" }}>
                      Sign up
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
          </ScrollView>
        </BlurView>
      </View>
    </View>
  );
};

export default LoginScreen;
