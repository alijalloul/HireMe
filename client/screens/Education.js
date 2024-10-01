import React, {
  memo,
  useEffect,
  useState,
} from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  I18nManager,
} from "react-native";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import CustomeBackHeader from "@/components/Header/CustomBackHeader";
import EducationPicker from "@/components/Picker/EducationPicker";

import { editUser } from "@/redux/User";

const Education = ({ navigation }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector(
    (state) => state.user.userInfo
  );

  const translateText = (text, arabicText) => {
    return I18nManager.isRTL ? arabicText : text;
  };

  const [education, setEducation] = useState(
    userInfo?.education || [
      {
        degree: translateText(
          "Bachelor of Science",
          "بكالوريوس العلوم"
        ),
        major: translateText(
          "Computer Science",
          "علوم الحاسوب"
        ),
        school: translateText(
          "University of Example",
          "جامعة المثال"
        ),
        startYear: translateText("2015", "2015"),
        endYear: translateText("2019", "2019"),
        note: translateText(
          "Graduated with honors.",
          "تخرج بتفوق."
        ),
      },
      {
        degree: translateText(
          "Master of Science",
          "ماجستير العلوم"
        ),
        major: translateText(
          "Business Administration",
          "إدارة الأعمال"
        ),
        school: translateText(
          "Business School XYZ",
          "مدرسة الأعمال XYZ"
        ),
        startYear: translateText("2020", "2020"),
        endYear: translateText("2022", "2022"),
        note: translateText(
          "Focused on entrepreneurship and leadership.",
          "ركز على ريادة الأعمال والقيادة."
        ),
      },
      {
        degree: translateText(
          "Baccalauréat technologique",
          "البكالوريا التقنية"
        ),
        major: translateText(
          "English Literature",
          "أدب اللغة الإنجليزية"
        ),
        school: translateText(
          "Literature Institute",
          "معهد الأدب"
        ),
        startYear: translateText("2012", "2012"),
        endYear: translateText("2016", "2016"),
        note: translateText(
          "Studied classic and contemporary literature.",
          "درس الأدب الكلاسيكي والمعاصر."
        ),
      },
    ]
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CustomeBackHeader
          navigation={navigation}
          screenName="work"
        />
      ),
    });
  }, []);

  return (
    <ScrollView
      className=" bg-white"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View className="w-[90%] items-center flex-1">
        <EducationPicker
          headerSize={35}
          headerText={translateText(
            "Your education is very important to the client",
            "تعليمك مهم جدا للعميل"
          )}
          education={education}
          setEducation={setEducation}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          editUser(
            { ...userInfo, education: education },
            "language",
            navigation,
            dispatch
          );
        }}
        className="self-end w-32 h-12 flex justify-center items-center bottom-0 right-0 mr-3 mb-3 bg-[#FE6F07] rounded-xl"
      >
        <Text className="text-lg font-garamond text-white">
          {translateText("Next", "التالي")}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default memo(Education);
