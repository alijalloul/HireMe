import { Colors } from "@/constants/Colors";
import React from "react";
import { TouchableOpacity } from "react-native";
import { View, ScrollView } from "react-native";
import GaramondText from "./GaramondText";
import { editUser, updateUser } from "@/redux/User";
import { useDispatch } from "react-redux";

const Container = ({ isOver, userInfo, screenName, navigation, children }) => {
  const dispatch = useDispatch();

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
      className="bg-white "
    >
      <View className="flex-1 w-[90%] mb-5  ">
        <View className="flex-1 ">{children}</View>

        <TouchableOpacity
          onPress={() => {
            isOver
              ? updateUser(userInfo, navigation, dispatch)
              : editUser(dispatch, userInfo, screenName, navigation);
          }}
          className="self-end w-32 h-12 flex justify-center items-center rounded-xl"
          style={{ backgroundColor: Colors.primary }}
        >
          <GaramondText className="text-lg text-white">Next</GaramondText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Container;
