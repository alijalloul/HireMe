import { Colors } from '@/constants/Colors'
import GaramondText from "@/components/GaramondText";
import "./global.css";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useRef } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from "react-redux";

import "react-native-gesture-handler";
import "react-native-reanimated";

import Store from "@/redux/Store";

import Navbar from "@/components/Navbar";
import CV from "@/screens/CV";
import Choose from "@/screens/Choose";
import Education from "@/screens/Education";
import Home from "@/screens/Home";
import Introduction from "@/screens/Introduction";
import JobPostDetails from "@/screens/JobPostDetails";
import LogIn from "@/screens/LogIn";
import MyJobs from "@/screens/MyJobs";
import OnBoarding from "@/screens/OnBoarding";
import Profile from "@/screens/Profile";
import SignUp from "@/screens/SignUp";
import UserDetails from "@/screens/UserDetails";
import UserJobPostDetails from "@/screens/UserJobPostDetails";
import Verification from "@/screens/Verification";
import Work from "@/screens/Work";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import HeaderRight from "@/components/Header/HeaderRight";
import { editUser } from "@/redux/User";

import ContactInfo from "@/screens/ContactInfo";
import EmployeeJobDetails from "@/screens/EmployeeJobDetails";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });

    console.log("pushToken: ", token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
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
          height: 120,
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

  const [user, setUser] = useState(null);
  const [screenName, setScreenName] = useState(null);

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("profile");
        const value2 = await AsyncStorage.getItem("screenName");

        if (value) {
          setUser(JSON.parse(value).result);
          editUser(JSON.parse(value).result, null, null, dispatch);
          setScreenName(value2);
        }
      } catch (error) {
        console.log("error message from App: ", error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    editUser({ ...user, pushToken: expoPushToken.data }, null, null, dispatch);
  }, [expoPushToken]);

  const [loaded, error] = useFonts({
    "EB-Garamond": require("@/assets/fonts/EBGaramond-Medium.ttf"),
    "EB-Garamond-Bold": require("@/assets/fonts/EBGaramond-Bold.ttf"),
    "EB-Garamond-SemiBold": require("@/assets/fonts/EBGaramond-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }

    console.log("loaded", loaded);
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <NavigationContainer independent={true} className=" border-box p-0 m-0">
      <Stack.Navigator
        initialRouteName="onBoarding"
        screenOptions={{
          contentStyle: {
            backgroundColor: "#FBF2E3",
          },
        }}
      >
        <Stack.Screen
          name="onBoarding"
          component={OnBoarding}
          options={{
            headerTitle: "",
            headerStyle: {
              backgroundColor: "#FBF2E3",
            },
            headerShadowVisible: false,
          }}
        />

        <Stack.Screen
          name="signUp"
          component={SignUp}
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
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
          name="choose"
          component={Choose}
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="employeeJobDetails"
          component={EmployeeJobDetails}
          options={{
            headerTitle: "",
            headerShadowVisible: false,
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
          name="work"
          component={Work}
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
        <Stack.Screen
          name="introduction"
          component={Introduction}
          options={{
            headerTitle: "",
            headerShadowVisible: false,
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
          name="education"
          component={Education}
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
            headerStyle: {
              height: 100,
              marginHorizantal: 10,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
