import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginSuccess, errorAPI } from "../User"; // Adjust the import path
import { jwtDecode } from "jwt-decode"; // Use jwt-decode for decoding
import { CommonActions } from "@react-navigation/native"; // To reset navigation state

export const authMiddleware = (store) => (next) => async (action) => {
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

            console.log("decodedToken: ", decodedToken);
          } else {
            await AsyncStorage.removeItem("profile");

            store.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "onBoarding" }],
              })
            );
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
