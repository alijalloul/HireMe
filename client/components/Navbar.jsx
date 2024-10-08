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
  Image,
  Keyboard,
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

const Navbar = () => {
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

  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
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

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // Initialize dynamic animations
  const containerAnimation = useDynamicAnimation(() => ({ height: barHeight }));
  const selectorAnimation = useDynamicAnimation(() => ({ translateX: 0 }));

  const animateContainerHeight = () => {
    containerAnimation.animateTo({
      height: isKeyboardVisible ? 0 : barHeight,
    });
  };

  useEffect(() => {
    const animateSelector = () => {
      const buttonRefs = {
        home: homeButtonRef,
        myJobs: jobsButtonRef,
        profile: profileButtonRef,
      };

      const buttonRef = buttonRefs[focusedRouteName];

      if (buttonRef && buttonRef.current) {
        selectorRef.current.measure((x1, y1, selectorWidth) => {
          buttonRef.current.measureLayout(
            containerRef.current,
            (x2, y2, buttonWidth) => {
              // Subtract half of the selector width from the left value
              const adjustedLeft = x2 - (selectorWidth - buttonWidth) / 2;
              setTranslateX(Math.floor(adjustedLeft));
            }
          );
        });
      }
    };

    animateSelector();
  }, [focusedRouteName]);

  const [selectorBottom, setSelectorBottom] = useState(0);

  useEffect(() => {
    selectorRef.current.measure((x, y, width, height) => {
      setSelectorBottom(height);
    });
  }, [selectorRef.current]);

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
    <MotiView state={containerAnimation} className="bg-white">
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
          style={{ bottom: selectorBottom / 2 }}
        >
          <View
            className="border-8 border-white rounded-full w-20  aspect-square"
            style={{ backgroundColor: Colors.primary }}
          ></View>
        </MotiView>
        <NavButton
          focused={focusedRouteName === "home"}
          imageWhite={homeWhite}
          imageOrange={homeOrange}
          label="home"
          onPress={() => handleNavigation("home")}
          ref={homeButtonRef}
          selectedButtonBottom={selectedButtonBottom}
        />
        <NavButton
          focused={focusedRouteName === "myJobs"}
          imageWhite={graphWhite}
          imageOrange={graphOrange}
          label="myJobs"
          onPress={() => handleNavigation("myJobs")}
          ref={jobsButtonRef}
          selectedButtonBottom={selectedButtonBottom}
        />
        <NavButton
          focused={focusedRouteName === "profile"}
          imageWhite={userWhite}
          imageOrange={userOrange}
          label="profile"
          onPress={() => handleNavigation("profile")}
          ref={profileButtonRef}
          selectedButtonBottom={selectedButtonBottom}
        />
      </View>
    </MotiView>
  );
};

const NavButton = React.forwardRef(
  ({ focused, imageWhite, label, onPress, selectedButtonBottom }, ref) => {
    const homeAnimation = useDynamicAnimation(() => ({ bottom: 0 }));

    useEffect(() => {
      homeAnimation.animateTo({
        bottom: focused ? selectedButtonBottom : 0,
      });
    }, [focused]);

    return (
      <View
        ref={ref}
        className="z-20 relative flex justify-center items-center"
      >
        <MotiView
          state={homeAnimation}
          transition={{ type: "spring", damping: 300 }}
        >
          <TouchableOpacity onPress={onPress} className="rounded-full">
            <Image
              source={imageWhite}
              className="w-8 h-8 "
              tintColor={focused ? "white" : Colors.primary}
            />
          </TouchableOpacity>
        </MotiView>
        <GaramondText className="text-lg" style={{ color: Colors.primary }}>
          {label}
        </GaramondText>
      </View>
    );
  }
);

export default Navbar;
