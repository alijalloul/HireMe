import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";
import React, { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

import CustomeBackHeader from "@/components/Header/CustomBackHeader";
import Spinner from "@/components/Spinner";

const CV = ({ navigation }) => {
  const pending = useSelector((state) => state.user.pending);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CustomeBackHeader navigation={navigation} screenName="onBoarding" />
      ),
    });
  }, []);

  return (
    <View className="flex-1 justify-center bg-white">
      <View
        className={`${
          pending
            ? "absolute z-30 w-full h-full justify-center items-center"
            : "hidden"
        }`}
      >
        <Spinner />
      </View>
      <View
        className={`${
          pending
            ? " bg-white z-20 absolute h-full w-full opacity-50 "
            : "hidden"
        }`}
      ></View>
      <View className="bg-white flex-1 items-center">
        <View className="w-[90%] h-full">
          <GaramondText className=" text-4xl font-garamond-semibold mb-5">
            How would you like to introduce yourself?
          </GaramondText>
          <GaramondText className=" text-xl mb-5">
            It is important to express your education, previous work experience
            and skills to your potential employer as clearly as possible, as
            this will set you on the top of your competition.
          </GaramondText>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("contactInfo");
            }}
            className="bg-white border w-full py-3 rounded-3xl flex justify-center items-center opacity-1 mb-5"
            style={{ borderColor: Colors.primary }}
          >
            <GaramondText
              className=" font-garamond-bold text-xl"
              style={{ color: Colors.primary }}
            >
              Fill it out manually
            </GaramondText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              pickDocument();
            }}
            className={`bg-white border border-[${Colors.primary}] w-full py-3 rounded-3xl flex justify-center items-center mb-2`}
          >
            <GaramondText
              className={`text-[${Colors.primary}] font-garamond-bold text-xl`}
            >
              Skip
            </GaramondText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CV;
