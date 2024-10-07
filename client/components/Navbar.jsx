import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";
import { useBackHandler } from "@react-native-community/hooks";
import {
  getFocusedRouteNameFromRoute,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Keyboard,
  TouchableOpacity,
  View,
  BackHandler,
  UIManager,
  findNodeHandle,
} from "react-native";
import { MotiView, useDynamicAnimation } from "moti";
import graphOrange from "@/assets/images/graphOrange.png";
import graphWhite from "@/assets/images/graphWhite.png";
import homeOrange from "@/assets/images/homeOrange.png";
import homeWhite from "@/assets/images/homeWhite.png";
import userOrange from "@/assets/images/userOrange.png";
import userWhite from "@/assets/images/userWhite.png";

const Navbar = () => {
  const route = useRoute();
  const focusedRouteName = getFocusedRouteNameFromRoute(route) || "home";
  const navigator = useNavigation();
  const isFocused = useIsFocused();

  const containerRef = useRef(null);
  const homeButtonRef = useRef(null);
  const jobsButtonRef = useRef(null);
  const profileButtonRef = useRef(null);

  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    console.log("translateX: ", translateX);

    selectorAnimation.animateTo({ translateX });
  }, [translateX]);

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
            onPress: () => navigator.navigate(screenName),
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
            onPress: () => BackHandler.exitApp(),
          },
        ]
      );
      return true; // Prevent the default back action
    }
    return false; // Allow default back action for other screens
  };

  // Add back handler hook
  useBackHandler(handleBackPress);

  const barHeight = 70;
  const windowWidth = Dimensions.get("window").width;
  const navBarSpacing = windowWidth / 3;

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // Initialize dynamic animations
  const containerAnimation = useDynamicAnimation(() => ({ height: barHeight }));
  const selectorAnimation = useDynamicAnimation(() => ({ translateX: 0 }));

  const animateContainerHeight = () => {
    containerAnimation.animateTo({
      height: isKeyboardVisible ? 0 : barHeight,
    });
  };

  const animateSelector = () => {
    if (focusedRouteName === "home" && homeButtonRef.current) {
      homeButtonRef.current.measureLayout(containerRef.current, (left) => {
        setTranslateX(Math.floor(left));
      });
    } else if (focusedRouteName === "myJobs" && jobsButtonRef.current) {
      jobsButtonRef.current.measureLayout(containerRef.current, (left) => {
        setTranslateX(Math.floor(left));
      });
    } else if (focusedRouteName === "profile" && profileButtonRef.current) {
      profileButtonRef.current.measureLayout(containerRef.current, (left) => {
        setTranslateX(Math.floor(left));
      });
    }
  };

  useEffect(() => {
    animateSelector();
  }, [focusedRouteName]);

  useEffect(() => {
    animateContainerHeight();
  }, [isKeyboardVisible]);

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
      ref={containerRef}
      state={containerAnimation}
      className="bg-white"
    >
      <MotiView
        state={selectorAnimation}
        transition={{ type: "spring", damping: 300 }}
        className="absolute z-10 "
      >
        <View
          className={`z-10 border-8 border-white rounded-full w-16 aspect-square`}
          style={{ backgroundColor: Colors.primary }}
        ></View>
      </MotiView>

      <View
        className="flex flex-row justify-around items-center w-full h-full rounded-t-[50px] bg-[#FFE2CD]"
        style={{ backgroundColor: Colors.primary }}
      >
        <NavButton
          focused={focusedRouteName === "home"}
          imageWhite={homeWhite}
          imageOrange={homeOrange}
          label="home"
          onPress={() => handleNavigation("home")}
          ref={homeButtonRef}
        />
        <NavButton
          focused={focusedRouteName === "myJobs"}
          imageWhite={graphWhite}
          imageOrange={graphOrange}
          label="myJobs"
          onPress={() => handleNavigation("myJobs")}
          ref={jobsButtonRef}
        />
        <NavButton
          focused={focusedRouteName === "profile"}
          imageWhite={userWhite}
          imageOrange={userOrange}
          label="profile"
          onPress={() => handleNavigation("profile")}
          ref={profileButtonRef}
        />
      </View>
    </MotiView>
  );
};

const NavButton = React.forwardRef(
  ({ focused, imageWhite, imageOrange, label, onPress }, ref) => {
    const homeAnimation = useDynamicAnimation(() => ({ bottom: 0 }));

    useEffect(() => {
      homeAnimation.animateTo({
        bottom: focused ? 20 : 0,
      });
    }, [focused]);

    return (
      <View className="z-20 relative flex justify-center items-center">
        <MotiView
          state={homeAnimation}
          transition={{ type: "spring", damping: 300 }}
          className="relative"
        >
          <TouchableOpacity
            ref={ref}
            onPress={onPress}
            className="rounded-full"
          >
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
  }
);

export default Navbar;
