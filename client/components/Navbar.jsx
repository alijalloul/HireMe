import { Colors } from "@/constants/Colors";
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
  Platform,
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

  // Handle navigation with confirmation alert
  const handleNavigation = (screenName) => {
    if (focusedRouteName === "profile" && isFocused) {
      Alert.alert(
        "Confirm Navigation",
        "Do you want to leave this screen without saving?",
        [
          { text: "NO", style: "cancel" },
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

  // Handle back press with confirmation
  const handleBackPress = () => {
    if (focusedRouteName === "profile" && isFocused) {
      Alert.alert(
        "Confirm Exit",
        "Do you want to exit the app without saving?",
        [
          { text: "No", style: "cancel" },
          {
            text: "Yes",
            onPress: () => {
              BackHandler.exitApp();
            },
          },
        ]
      );
      return true; // Prevent the default back action
    }
    return false; // Allow default back action for other screens
  };

  // Add back handler hook
  useBackHandler(handleBackPress);

  // Navbar dimensions and layout
  const barHeight = 70;
  const buttonsMargin = 20;
  const borderMargin = 70;
  const windowWidth = Dimensions.get("window").width;
  const navBarSpacing = windowWidth / 3;

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // Initialize dynamic animations
  const containerAnimation = useDynamicAnimation(() => ({ height: barHeight }));
  const selectorAnimation = useDynamicAnimation(() => ({ translateX: 0 }));
  const homeAnimation = useDynamicAnimation(() => ({ bottom: 0 }));
  const graphAnimation = useDynamicAnimation(() => ({ bottom: 0 }));
  const userAnimation = useDynamicAnimation(() => ({ bottom: 0 }));

  // Animate container height based on keyboard visibility
  const animateContainerHeight = () => {
    if (containerAnimation && containerAnimation.animateTo) {
      if (isKeyboardVisible) {
        containerAnimation.animateTo({ height: 0 });
      } else {
        containerAnimation.animateTo({ height: barHeight });
      }
    }
  };

  // Animate the selector based on the focused route
  const animateSelector = () => {
    if (selectorAnimation && selectorAnimation.animateTo) {
      if (focusedRouteName === "home") {
        selectorAnimation.animateTo({ translateX: navBarSpacing * 0 - 3 });
      } else if (focusedRouteName === "myJobs") {
        selectorAnimation.animateTo({ translateX: navBarSpacing * 1 - 3 });
      } else if (focusedRouteName === "profile") {
        selectorAnimation.animateTo({ translateX: navBarSpacing * 2 });
      }
    }
  };

  // Animate the buttons based on the focused route
  const animateButtons = () => {
    if (homeAnimation && homeAnimation.animateTo) {
      homeAnimation.animateTo({
        bottom: focusedRouteName === "home" ? buttonsMargin : 0,
      });
    }

    if (graphAnimation && graphAnimation.animateTo) {
      graphAnimation.animateTo({
        bottom: focusedRouteName === "myJobs" ? buttonsMargin : 0,
      });
    }

    if (userAnimation && userAnimation.animateTo) {
      userAnimation.animateTo({
        bottom: focusedRouteName === "profile" ? buttonsMargin : 0,
      });
    }
  };

  // Watch for route name changes and trigger animations
  useEffect(() => {
    animateSelector();
    animateButtons();
  }, [focusedRouteName]);

  // Watch for keyboard visibility changes and adjust navbar height
  useEffect(() => {
    animateContainerHeight();
  }, [isKeyboardVisible]);

  // Listen to keyboard show/hide events
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <MotiView
      state={containerAnimation}
      transition={{ type: "spring", damping: 300, duration: 100 }}
      className={`bg-white ${isKeyboardVisible ? "hidden opacity-0" : ""}`}
    >
      <View
        style={{ width: windowWidth }}
        className="flex flex-row justify-around self-center items-center w-full h-full rounded-t-[50px] bg-[#FFE2CD]"
      >
        <MotiView
          state={selectorAnimation}
          transition={{ type: "spring", damping: 300 }}
          style={{ width: navBarSpacing, bottom: borderMargin }}
          className="z-10 absolute top-0 left-0 right-0 flex justify-center items-center"
        >
          <View
            className={`z-10 bg-[${Colors.primary}] border-8 border-white rounded-full w-16 aspect-square`}
          ></View>
        </MotiView>

        <NavButton
          focused={focusedRouteName === "home"}
          imageWhite={homeWhite}
          imageOrange={homeOrange}
          label="home"
          onPress={() => handleNavigation("home")}
        />

        <NavButton
          focused={focusedRouteName === "myJobs"}
          imageWhite={graphWhite}
          imageOrange={graphOrange}
          label="myJobs"
          onPress={() => handleNavigation("myJobs")}
        />

        <NavButton
          focused={focusedRouteName === "profile"}
          imageWhite={userWhite}
          imageOrange={userOrange}
          label="profile"
          onPress={() => handleNavigation("profile")}
        />
      </View>
    </MotiView>
  );
};

// Reusable NavButton component
const NavButton = ({ focused, imageWhite, imageOrange, label, onPress }) => (
  <View className="z-20 relative flex justify-center items-center">
    <MotiView
      transition={{ type: "spring", damping: 300 }}
      className="relative"
    >
      <TouchableOpacity onPress={onPress} className="rounded-full">
        <Image
          source={focused ? imageWhite : imageOrange}
          className="w-8 h-8"
        />
      </TouchableOpacity>
    </MotiView>
    <GaramondText className={`text-[${Colors.primary}] text-lg`}>
      {label}
    </GaramondText>
  </View>
);

export default Navbar;
