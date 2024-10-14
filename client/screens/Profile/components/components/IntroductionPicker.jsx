import GaramondText from "@/components/GaramondText";
import { useEffect, useRef, useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";

import check from "@/assets/images/check.png";
import pen from "@/assets/images/pen.png";

const IntroductionPicker = ({ value, setValue, placeholder }) => {
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
          Introduction
        </GaramondText>

        <TouchableOpacity
          onPress={() => {
            toggleVisibility();
          }}
          className=" border border-gray-400 p-[6px] rounded-full bg-white"
        >
          <Image
            source={isEditing ? check : pen}
            className="w-5 h-5 aspect-square"
          />
        </TouchableOpacity>
      </View>

      <GaramondText
        className={`text-lg text-black mr-2 ${isEditing && "hidden"} ${
          value === "" && " opacity-50"
        }`}
      >
        {value === "" ? placeholder : value}
      </GaramondText>

      <TextInput
        ref={inputRef}
        multiline={true}
        value={value}
        onBlur={() => {
          setIsEditing(false);
        }}
        onChangeText={(text) => {
          setValue(text);
        }}
        className={`text-lg text-black mr-2 ${!isEditing && "h-1 w-1"}`}
      />
    </View>
  );
};

export default IntroductionPicker;
