import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

const HeaderRight = () => {
  const navigation = useNavigation();

  const profileImage = useSelector((state) => state.user.user)?.image;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("profile")}
      className="bg-gray-300 rounded-full w-14 h-14 m-5 overflow-hidden"
    >
      {profileImage && (
        <Image source={{ uri: profileImage }} className="w-full h-full " />
      )}
    </TouchableOpacity>
  );
};

export default HeaderRight;
