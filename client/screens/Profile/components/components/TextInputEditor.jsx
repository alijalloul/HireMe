import GaramondText from "@/components/GaramondText";
import { Colors } from "@/constants/Colors";
import { useEffect, useRef, useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";

import check from "@/assets/images/check.png";
import pen from "@/assets/images/pen.png";
import { cn } from "@/lib/utils";

const TextInputEditor = ({
  className,
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
    <View
      className={cn(
        "relative flex flex-row justify-between items-center",
        className
      )}
    >
      <GaramondText
        style={{
          display: isEditing ? "none" : "block",
          fontSize: textSize,
          color: textColor,
        }}
      >
        {value === "" ? placeholder : value}
      </GaramondText>

      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={(text) => {
          setValue(text);
        }}
        onBlur={() => {
          setIsEditing(false);
        }}
        style={{
          display: isEditing ? "block" : "none",
          fontSize: textSize,
          color: textColor,
        }}
      />

      <TouchableOpacity
        onPress={() => {
          toggleVisibility();
        }}
        className={`border p-2  absolute right-0 rounded-full bg-white ${
          !className && "translate-x-full"
        }`}
        style={{
          borderColor: Colors.primary,
        }}
      >
        <Image
          source={isEditing ? check : pen}
          className="w-5 h-5 aspect-square"
          tintColor={Colors.primary}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TextInputEditor;
