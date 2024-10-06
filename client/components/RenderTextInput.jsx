import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";
import React, { memo } from "react";
import { Image, Text, TextInput, View } from "react-native";

const RenderTextInput = ({
  className,
  isMultiline,
  isNumpad,
  title,
  SVG,
  value,
  setValue,
  placeholder,
  isError,
  setIsError,
  errorMessage,
}) => {
  return (
    <View className={className}>
      <GaramondText
        className={`text-sm ${isError ? "text-red-500" : "text-gray-600"}`}
      >
        {placeholder}
      </GaramondText>

      <GaramondText
        className={`text-[20px] mb-2 ${!title && "hidden"} ${
          isError && "text-red-500"
        }`}
      >
        {title}
      </GaramondText>

      <View
        className={`bg-white w-full border-[1px] overflow-hidden ${
          isError ? "border-red-500" : "border-gray-500 "
        }  rounded-lg flex  flex-row items-center`}
      >
        <TextInput
          value={value}
          multiline={isMultiline}
          keyboardType={isNumpad ? "number-pad" : "default"}
          onChangeText={(text) => {
            isError && setIsError(false);
            setValue(text);
          }}
          textAlignVertical={isMultiline ? "top" : "center"}
          className="flex-1 p-2 min-h-[40px] "
        />
      </View>

      <GaramondText className={` text-sm text-red-500 ${!isError && "hidden"}`}>
        {errorMessage}
      </GaramondText>
    </View>
  );
};

export default memo(RenderTextInput);
