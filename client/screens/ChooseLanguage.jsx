import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

import { useEffect } from "react";
import { editAppLanguage } from "@/redux/User";

const ChooseLanguage = ({ navigation }) => {
  const dispatch = useDispatch();

  const [language, setLanguage] = useState("english");

  return (
    <View className="bg-white flex-1 justify-center items-center">
      <View className="flex-1 w-full justify-center items-center">
        <View className="w-full flex justify-center items-center mb-10">
          <GaramondText
            className={`text-3xl text-[${Colors.primary}] font-garamond-bold`}
          >
            Choose Your Language
          </GaramondText>
          <GaramondText
            className={`text-3xl text-[${Colors.primary}] font-garamond-bold`}
          >
            اختر لغتك
          </GaramondText>
        </View>
        <View className="w-full flex-row justify-center items-center mb-10  ">
          <View
            className={`w-[80%] border-2 border-[${Colors.primary}] rounded-2xl flex-row justify-center items-center`}
          >
            <TouchableOpacity
              onPress={() => {
                setLanguage("english");
              }}
              className={`${
                language === "english" ? `bg-[${Colors.primary}] ` : "bg-white"
              } rounded-xl  w-[50%] py-5  flex justify-center items-center `}
            >
              <GaramondText
                className={`${
                  language === "english"
                    ? " text-white "
                    : `text-[${Colors.primary}]`
                } font-garamond-bold text-xl`}
              >
                English
              </GaramondText>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="w-full flex justify-center items-center mb-10">
        <TouchableOpacity
          onPress={() => {
            editAppLanguage(language, navigation, dispatch);
          }}
          className={`w-[90%] bg-[${Colors.primary}] py-3 rounded-3xl flex justify-center items-center mb-5`}
        >
          <GaramondText className="text-white font-garamond-bold text-xl">
            Confirm
          </GaramondText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChooseLanguage;
