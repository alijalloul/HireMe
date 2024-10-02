import { Colors } from '@/constants/Colors'
import GaramondText from "@/components/GaramondText";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import Filter from "@/assets/images/filter.png";

const HeaderLeft = ({ setBottomSheetVisible, numberOfFilters }) => {
  return (
    <TouchableOpacity
      onPress={() => setBottomSheetVisible(true)}
      className="rounded-full w-8 h-8 m-5"
    >
      <Image source={Filter} className="w-full h-full" />

      <View
        className={`${
          numberOfFilters > 0
            ? "relative left-4 bottom-3 self-end flex justify-center items-center rounded-full bg-[#FE6F07] aspect-square w-6"
            : "hidden"
        }`}
      >
        <GaramondText className=" text-white font-bold text-sm">
          {numberOfFilters}
        </GaramondText>
      </View>
    </TouchableOpacity>
  );
};

export default HeaderLeft;
