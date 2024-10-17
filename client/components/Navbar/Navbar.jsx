import graph from "@/assets/images/graph.png";
import home from "@/assets/images/home.png";
import user from "@/assets/images/user.png";
import { Colors } from "@/constants/Colors";
import { useBackHandler } from "@react-native-community/hooks";
import {
  getFocusedRouteNameFromRoute,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { MotiView, useDynamicAnimation } from "moti";
import { useEffect, useRef, useState } from "react";
import { Alert, BackHandler, Keyboard, View } from "react-native";

import NavButton from "./components/NavButton";

const Navbar = () => {
  const [hideNav, setHideNav] = useState(false);
  const [selectorBottom, setSelectorBottom] = useState(0);

  const paddingHorizontal = 40;
  const selectedButtonBottom = 20;

  const route = useRoute();
  const focusedRouteName = getFocusedRouteNameFromRoute(route) || "home";
  const navigator = useNavigation();
  const isFocused = useIsFocused();

  const containerRef = useRef(null);
  const selectorRef = useRef(null);
  const homeButtonRef = useRef(null);
  const jobsButtonRef = useRef(null);
  const profileButtonRef = useRef(null);

  const barHeight = 70;

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

  // Initialize dynamic animations
  const containerAnimation = useDynamicAnimation(() => ({ height: barHeight }));
  const selectorAnimation = useDynamicAnimation(() => ({
    translateX: 0,
  }));

  function animateSelector() {
    const buttonRefs = {
      home: homeButtonRef,
      myJobs: jobsButtonRef,
      profile: profileButtonRef,
    };

    const buttonRef = buttonRefs[focusedRouteName];

    if (selectorRef.current && buttonRef.current && containerRef.current) {
      selectorRef.current?.measure((x1, y1, selectorWidth, selectorHeight) => {
        buttonRef.current?.measureLayout(
          containerRef.current,
          (x2, y2, buttonWidth) => {
            const adjustedLeft =
              Math.floor(x2 - (selectorWidth - buttonWidth) / 2) || 0;

            selectorAnimation.animateTo({ translateX: adjustedLeft });
          }
        );

        if (!selectorBottom) {
          setSelectorBottom(selectorHeight);
        }
      });
    }
  }

  useEffect(() => {
    animateSelector();
  }, [focusedRouteName]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setHideNav(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setHideNav(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View
      className="bg-white"
      style={{ display: hideNav ? "none" : "block", height: barHeight }}
    >
      <View
        ref={containerRef}
        className="relative z-0 flex flex-row justify-between items-center w-full h-full rounded-t-[50px] "
        style={{
          backgroundColor: Colors.lightPrimary,
          paddingHorizontal: paddingHorizontal,
        }}
      >
        <MotiView
          ref={selectorRef}
          state={selectorAnimation}
          transition={{ type: "spring", damping: 300 }}
          className="absolute z-10 "
          style={{ bottom: selectorBottom ? selectorBottom / 2 : 0 }}
          onLayout={() => {
            if (selectorRef.current) {
              animateSelector();
            }
          }}
        >
          <View
            className="border-8 border-white rounded-full w-20  aspect-square"
            style={{ backgroundColor: Colors.primary }}
          ></View>
        </MotiView>
        <NavButton
          focused={focusedRouteName === "home"}
          image={home}
          label="home"
          onPress={() => handleNavigation("home")}
          ref={homeButtonRef}
          selectedButtonBottom={selectedButtonBottom}
        />
        <NavButton
          focused={focusedRouteName === "myJobs"}
          image={graph}
          label="myJobs"
          onPress={() => handleNavigation("myJobs")}
          ref={jobsButtonRef}
          selectedButtonBottom={selectedButtonBottom}
        />
        <NavButton
          focused={focusedRouteName === "profile"}
          image={user}
          label="profile"
          onPress={() => handleNavigation("profile")}
          ref={profileButtonRef}
          selectedButtonBottom={selectedButtonBottom}
        />
      </View>
    </View>
  );
};

export default Navbar;
