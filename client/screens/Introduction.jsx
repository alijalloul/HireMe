import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";
import React, { useEffect, useState } from "react";

import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { editUser } from "@/redux/User";

import CustomeBackHeader from "@/components/Header/CustomBackHeader";
import RenderTextInput from "@/components/RenderTextInput";
import UploadImage from "@/components/UploadImage";

const Introduction = ({ navigation }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  const [image, setImage] = useState(userInfo?.image || "");
  const [professionalRole, setProffesionalRole] = useState(
    userInfo?.profession || ""
  );
  const [introduction, setIntroduction] = useState(
    userInfo?.introduction || ""
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CustomeBackHeader navigation={navigation} screenName="contactInfo" />
      ),
    });
  }, []);

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View className="w-[90%] h-full">
        <GaramondText className="text-5xl mb-5">
          You are one step closer towards finding your perfect job!
        </GaramondText>
        <GaramondText className="text-[20px] mb-5">
          We will need you to fill out some information to get to know you
          better.
        </GaramondText>

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
            title="Professional Role"
            value={professionalRole}
            setValue={setProffesionalRole}
            placeholder="Ex: Web Developer | Translator"
          />
        </View>
        <View className="mb-4">
          <RenderTextInput
            isMultiline={true}
            title="Introduction"
            value={introduction}
            setValue={setIntroduction}
            placeholder="Ex: Hello, I am a university student currently majoring in computer science at LIU. I like to travel, jog, and sleep."
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
            className={`w-32 bottom-0 right-0 mb-3 bg-[${Colors.primary}] rounded-xl px-10 py-2`}
          >
            <GaramondText className="text-lg text-white">Next</GaramondText>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Introduction;
