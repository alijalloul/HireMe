import React, {
  memo,
  useEffect,
  useState,
} from "react";
import {
  I18nManager,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import { editUser } from "@/redux/User";

import CustomeBackHeader from "@/components/Header/CustomBackHeader";
import WorkExperiencePicker from "@/components/Picker/WorkExperiencePicker";

const Work = ({ navigation }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector(
    (state) => state.user.userInfo
  );

  const translateText = (
    englishText,
    arabicText
  ) => {
    return I18nManager.isRTL
      ? arabicText
      : englishText;
  };

  const [workExperience, setWorkExperience] =
    useState(
      userInfo?.workExperience || [
        {
          title: translateText(
            "Software Engineer",
            "مهندس برمجيات"
          ),
          company: translateText(
            "TechCo Inc.",
            "شركة تك كو"
          ),
          location: translateText(
            "San Francisco",
            "سان فرانسيسكو"
          ),
          country: translateText(
            "United States",
            "الولايات المتحدة"
          ),
          startMonth: translateText(
            "January",
            "يناير"
          ),
          startYear: "2018",
          endMonth: translateText(
            "December",
            "ديسمبر"
          ),
          endYear: "2022",
          description: translateText(
            "Developed web applications using React and Node.js.",
            "قمت بتطوير تطبيقات الويب باستخدام React و Node.js."
          ),
        },
        {
          title: translateText(
            "Product Manager",
            "مدير المنتج"
          ),
          company: translateText(
            "Globex Corporation",
            "شركة جلوبكس"
          ),
          location: translateText(
            "New York",
            "نيويورك"
          ),
          country: translateText(
            "United States",
            "الولايات المتحدة"
          ),
          startMonth: translateText(
            "March",
            "مارس"
          ),
          startYear: "2015",
          endMonth: translateText(
            "January",
            "يناير"
          ),
          endYear: "2018",
          description: translateText(
            "Led product development and strategy.",
            "قاد تطوير المنتج واستراتيجيته."
          ),
        },
        {
          title: translateText(
            "UX Designer",
            "مصمم تجربة المستخدم"
          ),
          company: translateText(
            "DesignTech Solutions",
            "حلول تصميم التكنولوجيا"
          ),
          location: translateText(
            "London",
            "لندن"
          ),
          country: translateText(
            "United Kingdom",
            "المملكة المتحدة"
          ),
          startMonth: translateText(
            "July",
            "يوليو"
          ),
          startYear: "2013",
          endMonth: translateText(
            "December",
            "ديسمبر"
          ),
          endYear: "2014",
          description: translateText(
            "Designed user interfaces for mobile and web applications.",
            "قمت بتصميم واجهات المستخدم لتطبيقات الجوال والويب."
          ),
        },
      ]
    );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CustomeBackHeader
          navigation={navigation}
          screenName="introduction"
        />
      ),
    });
  }, []);

  return (
    <ScrollView
      className="bg-white"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View className="w-[90%] items-center flex-1">
        <WorkExperiencePicker
          headerSize={35}
          headerText={translateText(
            "If you have relevant work experience, add it here.",
            "إذا كان لديك خبرة عمل ذات صلة، قم بإضافتها هنا."
          )}
          workExperience={workExperience}
          setWorkExperience={setWorkExperience}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          editUser(
            {
              ...userInfo,
              workExperience: workExperience,
            },
            "education",
            navigation,
            dispatch
          );
        }}
        className="self-end w-32 h-12 flex justify-center items-center mr-3 mb-3 bg-[#FE6F07] rounded-xl"
      >
        <Text className="text-lg font-garamond text-white">
          {translateText("Next", "التالي")}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default memo(Work);
