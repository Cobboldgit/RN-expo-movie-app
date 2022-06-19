import { View, TextInput, Animated } from "react-native";
import React, { useState, useRef } from "react";
import { appColor, appSize } from "../constants";

const AnimatedInput = ({
  value,
  onChange,
  placeholder,
  multiline,
  marginBottom,
}) => {
  const [inputHeight, setHeight] = useState(null);
  const [placeholderWidth, setWidth] = useState(null);
  const animation = useRef(new Animated.Value(0)).current;
  const [color, setColor] = useState(appColor.main)

  // Translate on y axis
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -inputHeight / 3],
  });

  // Translate on X aixs
  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -placeholderWidth / 4],
  });

  // Scale
  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.6],
  });

  // On focus
  const onFocus = () => {
    animate(1)
    setColor(appColor.red)
  };

  // On blur
  const onBlur = () =>{
     !value && animate(0)
     setColor(appColor.main)
    };

  // Animate
  const animate = (val) => {
    Animated.spring(animation, {
      toValue: val,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  };
  return (
    <View
      style={{
        // borderWidth: 1,
        // borderRadius: 5,
        // borderColor: "#999",
        // marginBottom: 25,
        backgroundColor: appColor.white,
        height: 50,
        borderRadius: appSize.radius,
        paddingVertical: 10,
        marginBottom: marginBottom ? marginBottom : 0,
      }}
      onLayout={(e) => !inputHeight && setHeight(e.nativeEvent.layout.height)}
    >
      <View
        style={{
          height: inputHeight,
          position: "absolute",
          backgroundColor: "red",
          justifyContent: "center",
        }}
      >
        <Animated.Text
          style={{
            transform: [{ translateY }, { translateX }, { scale }],
            fontSize: appSize.input,
            position: "absolute",
            paddingHorizontal: 5,
            backgroundColor: "#fff",
            color: color,
            marginLeft: 16,
            // borderTopRightRadius: 20,
            // borderTopLeftRadius: 20,
          }}
          onTextLayout={(e) =>
            !placeholderWidth && setWidth(e.nativeEvent.lines[0]?.width || 0)
          }
        >
          {placeholder}
        </Animated.Text>
      </View>
      <TextInput
        style={[
          {
            paddingHorizontal: 16,
            fontSize: appSize.input,
            backgroundColor: appColor.transparent,
          },
          multiline && { height: 100, textAlignVertical: "top" },
        ]}
        onFocus={onFocus}
        onBlur={onBlur}
        onChangeText={onChange}
        multiline={multiline}
      />
    </View>
  );
};

export default AnimatedInput;
