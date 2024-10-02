import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";
import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";

import splash from "@/assets/splash.png";

const OnBoarding = ({ navigation }) => {
  return (
    <View className="flex-1 justify-center items-center">
      <View className="flex-col justify-between items-center w-full h-[75%]">
        <View className="w-[80%] aspect-square ">
          <Image
            className="w-full h-full"
            source={splash}
            resizeMode="contain"
          />
        </View>
        <View className="w-full flex justify-center items-center mb-10">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("login");
            }}
            style={{ backgroundColor: Colors.primary }}
            className="w-[90%]  py-5 rounded-3xl flex justify-center items-center mb-5"
          >
            <GaramondText className="text-white font-garamond-bold text-xl">
              Log In
            </GaramondText>
          </TouchableOpacity>

          <View className="flex flex-row justify-center items-center">
            <GaramondText className="mr-2">Don't have an account?</GaramondText>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("signUp");
              }}
            >
              <GaramondText>Sign Up</GaramondText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OnBoarding;
