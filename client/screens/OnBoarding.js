import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const OnBoarding = ({ navigation }) => {
  return (
    <View className="bg-white flex-1 ">
      <View className="w-full flex-1">
        <View className="w-full flex justify-center items-center mb-10">
          <Text className="text-5xl text-[#FE6F07] font-garamond-bold">
            HireMe
          </Text>
        </View>

        <View className="w-[80%] self-center aspect-square mb-24"></View>
      </View>

      <View className="w-full flex justify-center items-center mb-10">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("login");
          }}
          className="w-[90%] bg-[#FE6F07] py-3 rounded-3xl flex justify-center items-center mb-5"
        >
          <Text className="text-white font-garamond-bold text-xl">Log In</Text>
        </TouchableOpacity>

        <View className={`flex flex-row justify-center items-center`}>
          <Text className="font-garamond mr-2">Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("signUp");
            }}
          >
            <Text className="font-garamond">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OnBoarding;
