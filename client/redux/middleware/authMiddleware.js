import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginSuccess, errorAPI } from "../User"; // Adjust the import path
import { jwtDecode } from "jwt-decode"; // Use jwt-decode for decoding

export const authMiddleware = (store) => (next) => async (action) => {
  if (action.type === "CHECK_PROFILE") {
    try {
      // Retrieve profile from AsyncStorage
      const profile = await AsyncStorage.getItem("profile");

      if (profile) {
        const parsedProfile = JSON.parse(profile);
        console.log("profile: ", parsedProfile.token);

        // Decode the token to extract user information
        const decodedToken = jwtDecode(parsedProfile.token);

        if (decodedToken) {
          store.dispatch(loginSuccess(decodedToken)); // Dispatch success action
        } else {
          store.dispatch(errorAPI()); // Dispatch error action
        }
      } else {
        store.dispatch(errorAPI()); // No profile found, dispatch error
      }
    } catch (error) {
      console.error("Error retrieving profile:", error);
      store.dispatch(errorAPI()); // Handle errors
    }
  }

  return next(action); // Pass the action to the next middleware or reducer
};
