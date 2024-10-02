import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";
import React, { memo, useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import CustomeBackHeader from "@/components/Header/CustomBackHeader";
import EducationPicker from "@/components/Picker/EducationPicker";

import { editUser } from "@/redux/User";

const Education = ({ navigation }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  const [education, setEducation] = useState(
    userInfo?.education || [
      {
        degree: "Bachelor of Science",
        major: "Computer Science",
        school: "University of Example",
        startYear: "2015",
        endYear: "2019",
        note: "Graduated with honors.",
      },
      {
        degree: "Master of Science",
        major: "Business Administration",
        school: "Business School XYZ",
        startYear: "2020",
        endYear: "2022",
        note: "Focused on entrepreneurship and leadership.",
      },
      {
        degree: "Baccalauréat technologique",
        major: "English Literature",
        school: "Literature Institute",
        startYear: "2012",
        endYear: "2016",
        note: "Studied classic and contemporary literature.",
      },
    ]
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CustomeBackHeader navigation={navigation} screenName="work" />
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
          headerText="Your education is very important to the client"
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
        className={`self-end w-32 h-12 flex justify-center items-center bottom-0 right-0 mr-3 mb-3 bg-[${Colors.primary}] rounded-xl`}
      >
        <GaramondText className="text-lg text-white">Next</GaramondText>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default memo(Education);
