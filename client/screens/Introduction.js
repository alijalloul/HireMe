import React, {
  useEffect,
  useState,
} from "react";
import { I18nManager } from "react-native";

import {
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
import RenderTextInput from "@/components/RenderTextInput";
import UploadImage from "@/components/UploadImage";

const Introduction = ({ navigation }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector(
    (state) => state.user.userInfo
  );

  const [image, setImage] = useState(
    userInfo?.image || ""
  );
  const [professionalRole, setProffesionalRole] =
    useState(userInfo?.profession || "");
  const [introduction, setIntroduction] =
    useState(userInfo?.introduction || "");

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CustomeBackHeader
          navigation={navigation}
          screenName="contactInfo"
        />
      ),
    });
  }, []);

  const translateText = (
    englishText,
    arabicText
  ) => {
    return I18nManager.isRTL
      ? arabicText
      : englishText;
  };

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View className="w-[90%] h-full">
        <Text className="text-4xl font-garamond mb-5">
          {translateText(
            "You are one step closer towards finding your perfect job!",
            "أنت قريب جدًا من العثور على وظيفتك المثالية!"
          )}
        </Text>
        <Text className="text-[20px] font-garamond mb-5">
          {translateText(
            "We will need you to fill out some information to get to know you better.",
            "سنحتاج منك ملء بعض المعلومات لنتعرف عليك بشكل أفضل."
          )}
        </Text>

        <View className="w-full flex justify-center items-center mb-2">
          <UploadImage
            width={150}
            isButton={true}
            image={image}
            setImage={setImage}
          />
        </View>

        <View className="mb-4">
          <RenderTextInput
            isNumpad={false}
            isMultiline={false}
            title={translateText(
              "Professional Role",
              "الدور المهني"
            )}
            value={professionalRole}
            setValue={setProffesionalRole}
            placeholder={translateText(
              "Ex: Web Developer | Translator",
              "على سبيل المثال: مطور ويب | مترجم"
            )}
          />
        </View>
        <View className="mb-4">
          <RenderTextInput
            isMultiline={true}
            title={translateText(
              "Introduction",
              "مقدمة"
            )}
            value={introduction}
            setValue={setIntroduction}
            placeholder={translateText(
              "Ex: Hello, I am a university student currently majoring in computer science at LIU. I like to travel, jog, and sleep.",
              "مثال: مرحبًا، أنا طالب جامعي حاليًا أدرس علوم الكمبيوتر في ال LIU. أحب السفر والركض والنوم."
            )}
          />
        </View>

        <View className="w-full flex justify-center items-end">
          <TouchableOpacity
            onPress={() => {
              editUser(
                {
                  ...userInfo,
                  image: image,
                  profession: professionalRole,
                  introduction: introduction,
                },
                "work",
                navigation,
                dispatch
              );
            }}
            className="w-32 bottom-0 right-0 mb-3 bg-[#FE6F07] rounded-xl px-10 py-2"
          >
            <Text className="text-lg font-garamond text-white">
              {translateText("Next", "التالي")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Introduction;
