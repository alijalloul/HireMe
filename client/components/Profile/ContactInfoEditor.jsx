import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";
import React, { useEffect, useRef, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

import check from "@/assets/images/check.png";
import pen from "@/assets/images/pen.png";

const ContactInfoEditor = ({
  textSize,
  textColor,
  value,
  setValue,
  placeholder,
}) => {
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
    <View className="relative flex flex-row justify-between items-center flex-1 ">
      <GaramondText
        style={{
          fontSize: textSize,
          color: textColor,
        }}
        className={`text-center ${isEditing && "h-0 w-0"} ${
          value === "" && " opacity-50"
        }`}
      >
        {value === "" ? placeholder : value}
      </GaramondText>

      <TextInput
        ref={inputRef}
        value={value}
        onBlur={() => {
          setIsEditing(false);
        }}
        onChangeText={(text) => {
          setValue(text);
        }}
        style={{
          fontSize: textSize,
          color: textColor,
        }}
        className={`flex-1 ${!isEditing && "h-[1px] w-[1px]"}`}
      />

      <View className=" h-0 w-0 right-5 relative flex justify-center items-center">
        <TouchableOpacity
          onPress={() => {
            toggleVisibility();
          }}
          className="absolute border-[1px] border-gray-400 p-[6px] rounded-full bg-white"
        >
          <Image
            source={isEditing ? check : pen}
            className="w-5 h-5 aspect-square"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactInfoEditor;
