import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginSuccess, errorAPI } from "../User"; // Adjust the import path
import { jwtDecode } from "jwt-decode"; // Use jwt-decode for decoding
import { CommonActions } from "@react-navigation/native"; // To reset navigation state
// any js module

import { navigate } from "@/lib/RootNavigation";

export const authMiddleware = (store) => (next) => async (action) => {
  console.log("Action type:", action.type);

  if (action.type === "CHECK_PROFILE") {
    try {
      const profile = await AsyncStorage.getItem("profile");

      if (profile) {
        const parsedProfile = JSON.parse(profile);
        const decodedToken = jwtDecode(parsedProfile.token);

        if (decodedToken) {
          const currentTime = Math.floor(Date.now() / 1000);

          if (decodedToken.exp > currentTime) {
            store.dispatch(loginSuccess(decodedToken));

            console.log("decodedToken: ", navigate);

            navigate("HomeTabs");
          } else {
            await AsyncStorage.removeItem("profile");

            navigate("onBoarding");
          }
        } else {
          store.dispatch(errorAPI());
        }
      } else {
        store.dispatch(errorAPI());
      }
    } catch (error) {
      console.error("Error retrieving profile:", error);
      store.dispatch(errorAPI());
    }
  }

  return next(action);
};
