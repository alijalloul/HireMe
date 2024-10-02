import { Colors } from '@/constants/Colors'
import GaramondText from "@/components/GaramondText";
import React, { useEffect, useRef, useState } from "react";
import {
  I18nManager,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import check from "@/assets/images/check.png";
import pen from "@/assets/images/pen.png";

const translateText = (englishText, arabicText) => {
  return I18nManager.isRTL ? arabicText : englishText;
};

const IntroductionPicker = ({ introduction, setIntroduction, placeholder }) => {
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const toggleVisibility = () => {
    setIsEditing(!isEditing);
  };

  return (
    <View className="flex">
      <View className="relative flex flex-row justify-start items-center w-full">
        <GaramondText className=" text-2xl text-black font-garamond-semibold mr-2 text-center">
          {translateText("Introduction", "مقدمة")}
        </GaramondText>

        <TouchableOpacity
          onPress={() => {
            toggleVisibility();
          }}
          className=" border-[1px] border-gray-400 p-[6px] rounded-full bg-white"
        >
          <Image
            source={isEditing ? check : pen}
            className="w-5 h-5 aspect-square"
          />
        </TouchableOpacity>
      </View>

      <GaramondText
        className={`text-lg text-black mr-2 ${isEditing && "hidden"} ${
          introduction === "" && " opacity-50"
        }`}
      >
        {introduction === ""
          ? translateText(placeholder, "النص البديل")
          : introduction}
      </GaramondText>

      <TextInput
        ref={inputRef}
        multiline={true}
        value={introduction}
        onBlur={() => {
          setIsEditing(false);
        }}
        onChangeText={(text) => {
          setIntroduction(text);
        }}
        className={`text-lg text-black mr-2 ${!isEditing && "h-1 w-1"}`}
      />
    </View>
  );
};

export default IntroductionPicker;
