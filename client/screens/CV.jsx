import GaramondText from "@/components/GaramondText";
import { Colors } from "@/constants/Colors";
import { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";

import CustomeBackHeader from "@/components/Header/CustomBackHeader";

const CV = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CustomeBackHeader navigation={navigation} screenName="onBoarding" />
      ),
    });
  }, []);

  return (
    <View className="bg-white flex-1 items-center">
      <View className="w-[90%] ">
        <GaramondText className=" text-4xl font-garamond-semibold mb-5">
          How would you like to introduce yourself?
        </GaramondText>
        <GaramondText className=" text-xl mb-5">
          It is important to express your education, previous work experience
          and skills to your potential employer as clearly as possible, as this
          will set you on the top of your competition.
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
            navigation.navigate("HomeTabs");
          }}
          className="bg-white border w-full py-3 rounded-3xl flex justify-center items-center mb-2"
        >
          <GaramondText className=" font-garamond-bold text-xl">
            Skip
          </GaramondText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CV;
