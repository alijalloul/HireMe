import { Colors } from '@/constants/Colors'
import GaramondText from "@/components/GaramondText";
import React, { memo, useEffect, useState } from "react";
import {
  I18nManager,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import CustomeBackHeader from "@/components/Header/CustomBackHeader";
import LanguagePicker from "@/components/Picker/LanguagePicker";
import Spinner from "@/components/Spinner";
import { updateUser } from "@/redux/User";

const translateText = (englishText, arabicText) => {
  return I18nManager.isRTL ? arabicText : englishText;
};

const Language = ({ navigation }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const pending = useSelector((state) => state.user.pending);

  const [languageArr, setLanguageArr] = useState(
    userInfo?.language || [
      {
        language: translateText("Deutsch", "الألمانية"),
        proficiency: translateText("Fluent", "طلاقة"),
      },
      {
        language: translateText("العربية", "العربية"),
        proficiency: translateText("Basic", "أساسي"),
      },
      {
        language: translateText("English", "الإنجليزية"),
        proficiency: translateText("Intermediate", "متوسط"),
      },
    ]
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CustomeBackHeader
          navigation={navigation}
          screenName={translateText("education", "التعليم")}
        />
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
      <ScrollView
        className=" bg-white"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View className="w-[90%] items-center flex-1">
          <LanguagePicker
            headerSize={35}
            headerText={translateText(
              "One last thing. Tell us what languages do you speak.",
              "آخر شيء. قل لنا ما هي اللغات التي تتحدثها."
            )}
            languageArr={languageArr}
            setLanguageArr={setLanguageArr}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            updateUser(
              {
                ...userInfo,
                language: languageArr,
              },
              navigation,
              dispatch
            );
          }}
          className="self-end w-32 h-12 flex justify-center items-center bottom-0 right-0 mr-3 mb-3 bg-[#FE6F07] rounded-xl"
        >
          <GaramondText className="text-lg text-white">
            {translateText("Next", "التالي")}
          </GaramondText>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default memo(Language);
