import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginSuccess, errorAPI } from "../User"; // Adjust the import path
import { jwtDecode } from "jwt-decode"; // Use jwt-decode for decoding
import { CommonActions } from "@react-navigation/native"; // To reset navigation state
import BASE_URL from "../BASE_URL";

import { navigate } from "@/lib/RootNavigation";

async function fetchUser(id, token) {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(token)}`,
    },
  });

  const data = await res.json();

  return data;
}

export const authMiddleware = (store) => (next) => async (action) => {
  console.log("Action type:", action.type);

  if (action.type === "CHECK_PROFILE") {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        const decodedToken = jwtDecode(token);

        if (decodedToken) {
          const currentTime = Math.floor(Date.now() / 1000);

          if (decodedToken.exp > currentTime) {
            try {
              const res = await fetchUser(decodedToken.id, token);

              store.dispatch(loginSuccess(res));
              navigate("HomeTabs");
            } catch (error) {
              console.log("error fetching the user: ", error);
            }
          } else {
            await AsyncStorage.removeItem("token");

            navigate("onBoarding");
          }
        } else {
          store.dispatch(errorAPI());
        }
      } else {
        store.dispatch(errorAPI());
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
      store.dispatch(errorAPI());
    }
  }

  return next(action);
};
