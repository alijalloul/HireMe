import { Colors } from '@/constants/Colors'
import GaramondText from "@/components/GaramondText";
import { useBackHandler } from "@react-native-community/hooks";
import {
  getFocusedRouteNameFromRoute,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Keyboard,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
} from "react-native";

import { MotiView, useDynamicAnimation } from "moti";
import graphOrange from "@/assets/images/graphOrange.png";
import graphWhite from "@/assets/images/graphWhite.png";
import homeOrange from "@/assets/images/homeOrange.png";
import homeWhite from "@/assets/images/homeWhite.png";
import userOrange from "@/assets/images/userOrange.png";
import userWhite from "@/assets/images/userWhite.png";

const Navbar = ({ navigation }) => {
  const route = useRoute();
  const focusedRouteName = getFocusedRouteNameFromRoute(route) || "home";

  const navigator = useNavigation();
  const isFocused = useIsFocused();

  const handleNavigation = (screenName) => {
    if (focusedRouteName === "profile" && isFocused) {
      Alert.alert(
        "Confirm Navigation",
        "Do you want to leave this screen without saving?",
        [
          {
            text: "NO",
            style: "cancel",
          },
          {
            text: "YES",
            onPress: () => {
              navigator.navigate(screenName);
            },
          },
        ]
      );
    } else {
      navigator.navigate(screenName);
    }
  };

  const handleBackPress = () => {
    if (focusedRouteName === "profile" && isFocused) {
      Alert.alert(
        "Confirm Exit",
        "Do you want to exit the app without saving?",
        [
          {
            text: "No",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              if (Platform.OS === "android") {
                BackHandler.exitApp();
              } else {
                BackHandler.exitApp();
              }
            },
          },
        ]
      );
      return true; // Prevent the default back action
    }
    return false; // Allow the default back action for other screens
  };

  useBackHandler(handleBackPress);

  const barHeight = 70;
  const buttonsMargin = 20;
  const borderMargin = 70;
  const windowWidth = Dimensions.get("window").width;
  const navBarWidth = windowWidth;
  const navBarSpacing = navBarWidth / 3;

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const containerAnimation = useDynamicAnimation(() => {
    return {
      height: barHeight,
    };
  });

  const selectorAnimation = useDynamicAnimation(() => {
    return {
      translateX: 0,
    };
  });

  const homeAnimation = useDynamicAnimation(() => {
    return {
      bottom: 0,
    };
  });

  const graphAnimation = useDynamicAnimation(() => {
    return {
      bottom: 0,
    };
  });

  const userAnimation = useDynamicAnimation(() => {
    return {
      bottom: 0,
    };
  });

  const animateContainerHeight = () => {
    if (isKeyboardVisible) {
      containerAnimation.animateTo(() => ({
        height: 0,
      }));
    } else {
      containerAnimation.animateTo(() => ({
        height: barHeight,
      }));
    }
  };

  const animateSelector = () => {
    if (focusedRouteName === "home") {
      selectorAnimation.animateTo(() => ({
        translateX: navBarSpacing * 0 - 3,
      }));
    } else if (focusedRouteName === "myJobs") {
      selectorAnimation.animateTo(() => ({
        translateX: navBarSpacing * 1 - 3,
      }));
    } else if (focusedRouteName === "profile") {
      selectorAnimation.animateTo(() => ({
        translateX: navBarSpacing * 2,
      }));
    }
  };

  const animateButtons = () => {
    if (focusedRouteName === "home") {
      homeAnimation.animateTo(() => ({
        bottom: buttonsMargin,
      }));
    } else {
      homeAnimation.animateTo(() => ({
        bottom: 0,
      }));
    }

    if (focusedRouteName === "myJobs") {
      graphAnimation.animateTo(() => ({
        bottom: buttonsMargin,
      }));
    } else {
      graphAnimation.animateTo(() => ({
        bottom: 0,
      }));
    }

    if (focusedRouteName === "profile") {
      userAnimation.animateTo(() => ({
        bottom: buttonsMargin,
      }));
    } else {
      userAnimation.animateTo(() => ({
        bottom: 0,
      }));
    }
  };

  useEffect(() => {
    animateSelector();
    animateButtons();
  }, [focusedRouteName]);

  useEffect(() => {
    animateContainerHeight();
  }, [isKeyboardVisible]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <MotiView
      state={containerAnimation}
      transition={{
        type: "spring",
        damping: 300,
        duration: 100,
      }}
      className={`bg-white ${isKeyboardVisible && "hidden opacity-0"}`}
    >
      <View
        style={{ width: navBarWidth }}
        className={`flex flex-row justify-around self-center items-center w-full h-full rounded-t-[50px] bg-[#FFE2CD]`}
      >
        <MotiView
          state={selectorAnimation}
          transition={{
            type: "spring",
            damping: 300,
          }}
          style={{
            width: navBarSpacing,
            bottom: borderMargin,
          }}
          className="z-10 absolute top-0 left-0 right-0 flex justify-center items-center"
        >
          <View
            className={`z-10 bg-[${Colors.primary}] border-8 border-white rounded-full w-16 aspect-square `}
          ></View>
        </MotiView>

        <View className="z-20 relative flex justify-center items-center">
          <MotiView
            state={homeAnimation}
            transition={{
              type: "spring",
              damping: 300,
            }}
            className="relative"
          >
            <TouchableOpacity
              onPress={() => {
                handleNavigation("home");
              }}
              className="  rounded-full"
            >
              <Image
                source={focusedRouteName === "home" ? homeWhite : homeOrange}
                className="w-8 h-8"
              />
            </TouchableOpacity>
          </MotiView>

          <GaramondText className={`text-[${Colors.primary}] text-lg`}>home</GaramondText>
        </View>
        <View className="z-20 relative flex justify-center items-center">
          <MotiView
            state={graphAnimation}
            transition={{
              type: "spring",
              damping: 300,
            }}
            className="relative"
          >
            <TouchableOpacity
              onPress={() => {
                handleNavigation("myJobs");
              }}
              className=" p-0 rounded-full"
            >
              <Image
                source={
                  focusedRouteName === "myJobs" ? graphWhite : graphOrange
                }
                className="w-8 h-8"
              />
            </TouchableOpacity>
          </MotiView>
          <GaramondText className={`text-[${Colors.primary}] text-lg`}>myJobs</GaramondText>
        </View>
        <View className="z-20 flex justify-center items-center">
          <MotiView
            state={userAnimation}
            transition={{
              type: "spring",
              damping: 300,
            }}
            className="relative"
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("profile");
              }}
              className="p-0 rounded-full"
            >
              <Image
                source={focusedRouteName === "profile" ? userWhite : userOrange}
                className="w-8 h-8"
              />
            </TouchableOpacity>
          </MotiView>
          <GaramondText className={`text-[${Colors.primary}] text-lg`}>
            profile
          </GaramondText>
        </View>
      </View>
    </MotiView>
  );
};

export default Navbar;
