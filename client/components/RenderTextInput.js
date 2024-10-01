import React, { memo } from "react";
import { Image, Text, TextInput, View } from "react-native";

const RenderTextInput = ({ isMultiline, isNumpad, title, icon, value, setValue, placeholder, isError, setIsError, errorMessage, isArabic }) => {
  return (
    <View>
      <Text className={`text-[20px] font-garamond mb-2 ${!title && "hidden"} ${isError && "text-red-500"}`}>{title}</Text>

      <View className={`w-full border-[1px] ${isError ? "border-red-500" : "border-gray-500"}  rounded-lg flex  flex-row items-center`}>
        {isArabic ? (
          <>
            <TextInput
              value={value}
              multiline={isMultiline}
              keyboardType={isNumpad ? "number-pad" : "default"}
              onChangeText={(text) => {
                isError && setIsError(false);
                setValue(text);
              }}
              placeholder={placeholder}
              textAlignVertical={isMultiline ? "top" : "center"}
              className="flex-1 p-2 min-h-[40px] font-garamond "
            />
            <Image source={icon} className={`w-5 h-5 mx-3 ${!icon && "hidden"}`} />
          </>
        ) : (
          <>
            <Image source={icon} className={`w-5 h-5 mx-3 ${!icon && "hidden"}`} />
            <TextInput
              value={value}
              multiline={isMultiline}
              keyboardType={isNumpad ? "number-pad" : "default"}
              onChangeText={(text) => {
                isError && setIsError(false);
                setValue(text);
              }}
              placeholder={placeholder}
              textAlignVertical={isMultiline ? "top" : "center"}
              className="flex-1 p-2 min-h-[40px] font-garamond "
            />
          </>
        )}
      </View>

      <Text className={` font-garamond text-sm text-red-500 ${!isError && "hidden"}`}>{errorMessage}</Text>
    </View>
  );
};

export default memo(RenderTextInput);
