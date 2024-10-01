import React, { useState } from "react";
import {
  I18nManager,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";

import { useEffect } from "react";
import { editAppLanguage } from "@/redux/User";

const ChooseLanguage = ({ navigation }) => {
  const dispatch = useDispatch();

  const [language, setLanguage] =
    useState("english");

  const translateText = (
    englishText,
    arabicText
  ) => {
    return language === "arabic"
      ? arabicText
      : englishText;
  };

  useEffect(() => {
    if (language === "arabic") {
      I18nManager.forceRTL(true);
    } else {
      I18nManager.forceRTL(false);
    }
  }, [language]);

  return (
    <View className="bg-white flex-1 justify-center items-center">
      <View className="flex-1 w-full justify-center items-center">
        <View className="w-full flex justify-center items-center mb-10">
          <Text className="text-3xl text-[#FE6F07] font-garamond-bold">
            Choose Your Language
          </Text>
          <Text className="text-3xl text-[#FE6F07] font-garamond-bold">
            اختر لغتك
          </Text>
        </View>
        <View className="w-full flex-row justify-center items-center mb-10  ">
          <View className="w-[80%] border-2 border-[#FE6F07] rounded-2xl flex-row justify-center items-center">
            <TouchableOpacity
              onPress={() => {
                setLanguage("english");
              }}
              className={`${
                language === "english"
                  ? "bg-[#FE6F07] "
                  : "bg-white"
              } rounded-xl  w-[50%] py-5  flex justify-center items-center `}
            >
              <Text
                className={`${
                  language === "english"
                    ? " text-white "
                    : "text-[#FE6F07]"
                } font-garamond-bold text-xl`}
              >
                English
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setLanguage("arabic");
              }}
              className={`${
                language === "arabic"
                  ? "bg-[#FE6F07] "
                  : "bg-white"
              } rounded-xl  w-[50%] py-5  flex justify-center items-center`}
            >
              <Text
                className={`${
                  language === "arabic"
                    ? " text-white "
                    : "text-[#FE6F07]"
                } font-garamond-bold text-xl`}
              >
                عربي
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="w-full flex justify-center items-center mb-10">
        <TouchableOpacity
          onPress={() => {
            editAppLanguage(
              language,
              navigation,
              dispatch
            );
          }}
          className="w-[90%] bg-[#FE6F07] py-3 rounded-3xl flex justify-center items-center mb-5"
        >
          <Text className="text-white font-garamond-bold text-xl">
            {translateText("Confirm", "وافق")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChooseLanguage;
