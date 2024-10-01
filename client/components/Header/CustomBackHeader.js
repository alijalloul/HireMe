import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Alert, I18nManager, TouchableOpacity } from "react-native";

const translateText = (englishText, arabicText) => {
  return I18nManager.isRTL ? arabicText : englishText;
};

const CustomBackHeader = ({ navigation, screenName }) => {
  const handleBackPress = async () => {
    if (screenName === "onBoarding") {
      // Display a confirmation popup
      Alert.alert(
        translateText("Logout Confirmation", "تأكيد الخروج"),
        translateText("Are you sure you want to go back? You will be logged out.", "هل أنت متأكد أنك تريد العودة؟ سيتم تسجيل خروجك."),
        [
          {
            text: translateText("Cancle", "إلغاء"),
            style: "cancel",
          },
          {
            text: translateText("Logout", "اخرج"),

            onPress: async () => {
              navigation.navigate(screenName);
              await AsyncStorage.clear();
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      navigation.navigate(screenName);
    }
  };

  return (
    <TouchableOpacity onPress={handleBackPress} style={{ flexDirection: "row", alignItems: "center" }}>
      <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default CustomBackHeader;
