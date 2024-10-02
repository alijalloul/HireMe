import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";
import React, { memo, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

import downVector from "@/assets/images/downVector.png";
import trash from "@/assets/images/trash.png";
import SingleSelectorModal from "../SingleSelectorModal";

const LanguagePicker = ({
  headerSize,
  headerText,
  languageArr,
  setLanguageArr,
}) => {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [language, setLanguage] = useState("");
  const [proficiency, setProficiency] = useState("");

  const [languageError, setLanguageError] = useState(false);
  const [proficiencyError, setProficiencyError] = useState(false);

  const [languageIndex, setLanguageIndex] = useState(null);

  const proficiencies = ["Basic", "Intermediate", "Fluent", "Native"];

  const languages = [
    "Español",
    "Français",
    "中文",
    "العربية",
    "Português",
    "Русский",
    "日本語",
    "Deutsch",
    "한국어",
    "Italiano",
    "Türkçe",
    "हिन्दी",
    "Bahasa Indonesia",
    "Polski",
    "ภาษาไทย",
    "Tiếng Việt",
    "Nederlands",
    "Svenska",
    "Ελληνικά",
    "Čeština",
    "Magyar",
    "Română",
    "עברית",
    "Dansk",
    "Norsk",
    "Suomi",
    "Українська",
    "한국어",
    "ภาษาไทย",
    "Tiếng Việt",
    "日本語",
    "Русский",
    "Español",
    "Français",
    "中文",
    "العربية",
    "Português",
    "Deutsch",
    "Italiano",
    "Türkçe",
    "हिन्दी",
    "Bahasa Indonesia",
    "Polski",
  ];

  const handleSave = () => {
    let error = false;

    if (language.trim() === "") {
      setLanguageError(true);
      error = true;
    }
    if (proficiency.trim() === "") {
      setProficiencyError(true);
      error = true;
    }

    if (!error) {
      isEditing
        ? setLanguageArr(
            languageArr.map((languageArr, index) =>
              index === languageIndex
                ? {
                    language: language,
                    proficiency: proficiency,
                  }
                : languageArr
            )
          )
        : setLanguageArr([
            ...languageArr,
            {
              language: language,
              proficiency: proficiency,
            },
          ]);

      setLanguage("");
      setProficiency("");

      setBottomSheetVisible(false);
      setIsEditing(false);
    }
  };
  return (
    <View className="flex-1 w-full">
      <View className="flex-1 w-full self-center">
        <GaramondText
          style={{ fontSize: headerSize }}
          className=" font-garamond-semibold mb-5"
        >
          {headerText}
        </GaramondText>
        <View>
          {languageArr?.length > 0 &&
            languageArr.map((langArr, index) => (
              <View
                key={index}
                className="relative w-full py-3 border-t-[1px] border-b-[1px] mb-4"
              >
                <View className="flex flex-row justify-center items-center">
                  <TouchableOpacity
                    onPress={() => {
                      setLanguageIndex(index);
                      setIsEditing(true);

                      setLanguage(langArr.language);
                      setProficiency(langArr.proficiency);

                      setBottomSheetVisible(true);
                    }}
                    className="border-[1px] rounded-2xl  px-2 py-2 mr-2 w-[35%] flex flex-row justify-between items-center"
                  >
                    <GaramondText className=" text-xl">
                      {langArr.language}
                    </GaramondText>
                    <Image source={downVector} className=" w-5 aspect-[2/1]" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setLanguageIndex(index);
                      setIsEditing(true);

                      setLanguage(langArr.language);
                      setProficiency(langArr.proficiency);

                      setBottomSheetVisible(true);
                    }}
                    className="border-[1px] rounded-2xl  px-2 py-2 mr-3 w-[45%] flex flex-row justify-between items-center"
                  >
                    <GaramondText className=" text-xl">
                      {langArr.proficiency}
                    </GaramondText>
                    <Image source={downVector} className=" w-5 aspect-[2/1]" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setLanguageArr(
                        languageArr?.filter((item, index2) => index2 !== index)
                      );
                    }}
                    className="flex justify-center items-center border-[1px] border-gray-400 rounded-full w-10 aspect-square"
                  >
                    <Image source={trash} className="w-5 h-5 aspect-square" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </View>

        <TouchableOpacity
          onPress={() => {
            setBottomSheetVisible(true);
          }}
          className={`bg-white border-[1px] border-[${Colors.primary}] w-full py-3 rounded-3xl flex justify-center items-center mb-5`}
        >
          <GaramondText
            className={`text-[${Colors.primary}] font-garamond-bold text-xl`}
          >
            + Add language
          </GaramondText>
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={isBottomSheetVisible}
        animationInTiming={700}
        className=" m-0 mt-10"
      >
        <View className="flex-1 justify-center bg-white rounded-t-xl">
          <View
            className={`w-full flex flex-row px-5 justify-between items-center ${
              isBottomSheetVisible && "border-b-[1px]"
            }`}
          >
            <GaramondText className=" text-3xl font-garamond">
              {isEditing ? Edit : "Add Language"}
            </GaramondText>

            <TouchableOpacity
              onPress={() => {
                setBottomSheetVisible(false);
                setIsEditing(false);

                isEditing && setLanguage("");
                setProficiency("");
              }}
            >
              <GaramondText className=" text-5xl font-garamond-bold">
                ×
              </GaramondText>
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={{
              flexGrow: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
            className="mt-10"
          >
            <View className="w-[90%]">
              <View className="mb-5">
                <SingleSelectorModal
                  title="Language *"
                  data={languages}
                  value={language}
                  setValue={setLanguage}
                  isError={languageError}
                  setIsError={setLanguageError}
                  errorMessage="This field can not be empty"
                />
              </View>

              <View className="mb-5">
                <SingleSelectorModal
                  title="Proficiency *"
                  data={proficiencies}
                  value={proficiency}
                  setValue={setProficiency}
                  isError={proficiencyError}
                  setIsError={setProficiencyError}
                  errorMessage="This field can not be empty"
                />
              </View>

              <View className="w-full flex justify-center items-end mb-4">
                <TouchableOpacity
                  onPress={() => {
                    handleSave();
                  }}
                  className={`w-32 bottom-0 right-0 bg-[${Colors.primary}] rounded-xl px-10 py-2`}
                >
                  <GaramondText className="text-lg text-white">
                    {isEditing ? Edit : "Add"}
                  </GaramondText>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default memo(LanguagePicker);
