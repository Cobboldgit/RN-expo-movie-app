import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import {
  HomeScreen,
  LoginScreen,
  SignupScreen,
  FavoriteMovieScreen,
  MovieDetailsScreen,
  WatchMovieScreen,
  ProfileScreen,
  LoadingScreen,
  GetStartedScreen,
  TVShowsSeeAllScreen,
} from "../screens";
import MyTabs from "./tab";
import {useDispatch} from "react-redux"
import { getAllUserData } from "../redux/actions/userActions";

const Stack = createNativeStackNavigator(); // Stack contains Screen & Navigator properties

const Screens = () => {
  const [currentUser, setUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const Navigator = Stack.Navigator;
  const Screen = Stack.Screen;
  const dispatch = useDispatch()

  useEffect(() => {
    
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.uid) {
        setUser(true);
        setIsLoading(false);
        // dispatch(getAllUserData())
      } else {
        setIsLoading(false);
        setUser(false);
      }
    });

    return () => unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        {isLoading ? (
          <Screen name="Loading" component={LoadingScreen} />
        ) : !currentUser && !isLoading ? (
          <>
            <Screen name="Signup" component={SignupScreen} />
            <Screen name="GetStarted" component={GetStartedScreen} />
            <Screen name="Login" component={LoginScreen} />
          </>
        ) : (
          <>
            <Screen name="MyTabs" component={MyTabs} />
            <Screen name="MovieDetails" component={MovieDetailsScreen} />
            <Screen name="TVShows" component={TVShowsSeeAllScreen} />
          </>
        )}
      </Navigator>
    </NavigationContainer>
  );
};

export default Screens;
