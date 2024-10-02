import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";
import React, { memo, useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { editUser } from "@/redux/User";

import CustomeBackHeader from "@/components/Header/CustomBackHeader";
import WorkExperiencePicker from "@/components/Picker/WorkExperiencePicker";

const Work = ({ navigation }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  const [workExperience, setWorkExperience] = useState(
    userInfo?.workExperience || [
      {
        title: "Software Engineer",
        company: "TechCo Inc.",
        location: "San Francisco",
        country: "United States",
        startMonth: "January",
        startYear: "2018",
        endMonth: "December",
        endYear: "2022",
        description: "Developed web applications using React and Node.",
      },
      {
        title: "Product Manager",
        company: "Globex Corporation",
        location: "New York",
        country: "United States",
        startMonth: "March",
        startYear: "2015",
        endMonth: "January",
        endYear: "2018",
        description: "Led product development and strategy.",
      },
      {
        title: "UX Designer",
        company: "DesignTech Solutions",
        location: "London",
        country: "United Kingdom",
        startMonth: "July",
        startYear: "2013",
        endMonth: "December",
        endYear: "2014",
        description:
          "Designed user interfaces for mobile and web applications.",
      },
    ]
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CustomeBackHeader navigation={navigation} screenName="introduction" />
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
          headerText="If you have relevant work experience, add it here."
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
        className={`self-end w-32 h-12 flex justify-center items-center mr-3 mb-3 bg-[${Colors.primary}] rounded-xl`}
      >
        <GaramondText className="text-lg text-white">Next</GaramondText>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default memo(Work);
