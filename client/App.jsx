import "./global.css";

import { navigationRef } from "./lib/RootNavigation";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Provider } from "react-redux";

import "react-native-gesture-handler";
import "react-native-reanimated";

import Store from "@/redux/Store";

import Navbar from "@/components/Navbar/Navbar";
import CV from "@/screens/CV";
import Education from "@/screens/Education";
import Home from "@/screens/Home/Home";
import Introduction from "@/screens/Introduction";
import JobPostDetails from "@/screens/JobPostDetails/JobPostDetails";
import LogIn from "@/screens/LogIn";
import MyJobs from "@/screens/MyJobs/MyJobs";
import OnBoarding from "@/screens/OnBoarding";
import Profile from "@/screens/Profile/Profile";
import SignUp from "@/screens/SignUp";
import UserDetails from "@/screens/UserDetails";
import UserJobPostDetails from "@/screens/UserJobPostDetails";
import Work from "@/screens/Work";

import HeaderRight from "@/components/Header/HeaderRight";
import ContactInfo from "@/screens/ContactInfo";
import Constants from "expo-constants";
import * as Device from "expo-device";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Language from "./screens/Language";

import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function handleRegistrationError(errorMessage) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Permission not granted to get push token for push notification!"
      );
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError("Project ID not found");
    }
    try {
      const pushTokenString = (await Notifications.getDevicePushTokenAsync())
        .data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError("Must use physical device for push notifications");
  }
}

const App = () => {
  return (
    <Provider store={Store}>
      <AppContent />
    </Provider>
  );
};

export default App;

const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="home"
      tabBar={(props) => <Navbar {...props} />}
      screenOptions={{
        headerTitle: "",
        headerShadowVisible: false,
        headerStyle: {
          height: 80,
        },

        headerRight: () => <HeaderRight />,
      }}
    >
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="myJobs" component={MyJobs} />
      <Tab.Screen name="profile" component={Profile} />
    </Tab.Navigator>
  );
};

const AppContent = () => {
  const dispatch = useDispatch();

  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? ""))
      .catch((error) => setExpoPushToken(`${error}`));
  }, []);

  const [loaded, error] = useFonts({
    "EB-Garamond": require("@/assets/fonts/EBGaramond-Medium.ttf"),
    "EB-Garamond-Bold": require("@/assets/fonts/EBGaramond-Bold.ttf"),
    "EB-Garamond-SemiBold": require("@/assets/fonts/EBGaramond-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }

    if (loaded && dispatch) {
      dispatch({ type: "CHECK_PROFILE" });
    }
  }, [loaded, error, dispatch]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <NavigationContainer ref={navigationRef} independent={true}>
      <Stack.Navigator initialRouteName="onBoarding">
        <Stack.Screen
          name="onBoarding"
          component={OnBoarding}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="signUp"
          component={SignUp}
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
          initialParams={{ expoPushToken: expoPushToken }}
        />

        <Stack.Screen
          name="login"
          component={LogIn}
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />

        <Stack.Screen
          name="CV"
          component={CV}
          options={{
            headerTitle: "",
            headerShadowVisible: false,
            headerBackVisible: false,
          }}
        />

        <Stack.Screen
          name="contactInfo"
          component={ContactInfo}
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />

        <Stack.Screen
          name="introduction"
          component={Introduction}
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />

        <Stack.Screen
          name="work"
          component={Work}
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />

        <Stack.Screen
          name="education"
          component={Education}
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />

        <Stack.Screen
          name="language"
          component={Language}
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />

        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="JobPostDetails"
          component={JobPostDetails}
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="userDetails"
          component={UserDetails}
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />

        <Stack.Screen
          name="UserJobPostDetails"
          component={UserJobPostDetails}
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
