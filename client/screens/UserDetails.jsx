import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import blobTop from "@/assets/images/blobTop.png";
import { hireEmployee } from "@/redux/User";

const UserDetails = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const { userId } = route.params;
  const jobPostId = useSelector((state) => state.user?.jobPostId);
  const user = useSelector((state) => state.user?.employeesByJobId)?.filter(
    (item) => item._id === userId && item
  )[0];

  const handleHire = () => {
    hireEmployee(jobPostId, userId, navigation, dispatch);
  };

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image source={blobTop} className="absolute -top-72 opacity-90" />

      <View className="my-8 w-full">
        <GaramondText className="text-center text-5xl text-white">
          {user?.name}
        </GaramondText>
      </View>

      <View style={{ width: 250, height: 250 }}>
        <Image
          source={user?.image !== "" ? { uri: user?.image } : null}
          className="rounded-full w-full h-full"
        />
      </View>

      <GaramondText className="text-center text-xl ">
        {user?.profession}
      </GaramondText>

      <View className="w-[90%] my-8">
        <GaramondText className="text-center text-xl ">
          {user?.introduction}
        </GaramondText>
      </View>

      <View className="w-full my-5 flex-1">
        <View className="flex-1 w-[90%] self-center">
          <GaramondText
            style={{ fontSize: 32 }}
            className="font-garamond-semibold mb-5"
          >
            Work Experience
          </GaramondText>
          <View>
            {user?.workExperience?.length > 0 ? (
              user?.workExperience.map((work, index) => (
                <View
                  key={index}
                  className="relative w-full border-[1px] rounded-2xl p-5 pt-3 pr-3 mb-4"
                >
                  <View className="flex flex-row w-full justify-end items-center"></View>
                  <GaramondText className="text-3xl">{work.title}</GaramondText>
                  <GaramondText className="text-[15px]">
                    {work.company}
                  </GaramondText>
                  <GaramondText className="text-xl">
                    {work.startMonthWork +
                      " " +
                      work.startYear +
                      " - " +
                      work.endMonthWork +
                      " " +
                      work.endYear}
                  </GaramondText>
                  <GaramondText className="text-[15px] opacity-70 mb-3">
                    {work.country + ", " + work.location}
                  </GaramondText>
                  <GaramondText className="text-lg opacity-70">
                    {work.description}
                  </GaramondText>
                </View>
              ))
            ) : (
              <GaramondText className="text-center opacity-50 font-garamond">
                no work experience
              </GaramondText>
            )}
          </View>
        </View>
      </View>

      <View className="w-full my-5 flex-1">
        <View className="flex-1 w-[90%] self-center">
          <GaramondText
            style={{ fontSize: 32 }}
            className="font-garamond-semibold mb-5"
          >
            Education
          </GaramondText>

          <View>
            {user?.education?.length > 0 ? (
              user?.education?.map((educ, index) => (
                <View
                  key={index}
                  className="relative w-full border-[1px] rounded-2xl p-5 pt-3 pr-3 mb-4"
                >
                  <View className="flex flex-row w-full justify-end items-center"></View>
                  <GaramondText className="text-3xl">
                    {educ.degree + (educ.major ? " in" : " from")}
                  </GaramondText>
                  {educ.major && (
                    <GaramondText className="text-[15px]">
                      {educ.major + " from"}
                    </GaramondText>
                  )}
                  <GaramondText className="text-lg">{educ.school}</GaramondText>
                  <GaramondText className="text-[15px] opacity-70 mb-3">
                    {educ.startYear + " - " + educ.endYear}
                  </GaramondText>
                  <GaramondText className="text-lg opacity-70">
                    {educ.note}
                  </GaramondText>
                </View>
              ))
            ) : (
              <GaramondText className="text-center opacity-50 font-garamond">
                no education
              </GaramondText>
            )}
          </View>
        </View>
      </View>

      <View className="w-full my-5 flex-1">
        <View className="flex-1 w-[90%] self-center">
          <GaramondText
            style={{ fontSize: 32 }}
            className="font-garamond-semibold mb-5"
          >
            Languages
          </GaramondText>
          <View>
            {user?.language?.length > 0 ? (
              user?.language.map((langArr, index) => (
                <View
                  key={index}
                  className="relative w-full py-3 border-t-[1px] border-b-[1px] mb-4"
                >
                  <View className="flex flex-row justify-center items-center">
                    <View
                      onPress={() => {
                        setLanguageIndex(index);
                        setIsEditing(true);

                        setLanguage(langArr.language);
                        setProficiency(langArr.proficiency);

                        setBottomSheetVisible(true);
                      }}
                      className="border-[1px] rounded-2xl px-2 py-2 mr-2 w-[35%] flex flex-row justify-between items-center"
                    >
                      <GaramondText className="text-xl">
                        {langArr.language}
                      </GaramondText>
                    </View>
                    <View
                      onPress={() => {
                        setLanguageIndex(index);
                        setIsEditing(true);

                        setLanguage(langArr.language);
                        setProficiency(langArr.proficiency);

                        setBottomSheetVisible(true);
                      }}
                      className="border-[1px] rounded-2xl px-2 py-2 mr-3 w-[45%] flex flex-row justify-between items-center"
                    >
                      <GaramondText className="text-xl">
                        {langArr.proficiency}
                      </GaramondText>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <GaramondText className="text-center opacity-50 font-garamond">
                no languages
              </GaramondText>
            )}
          </View>
        </View>

        <View className="w-[90%] flex self-center">
          <GaramondText className="text-2xl mb-4">Cover Letter</GaramondText>

          <View className="border-[1px] rounded-xl p-5">
            <GaramondText className="font-garamond">
              {user?.coverLetter}
            </GaramondText>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          handleHire();
        }}
        className={`self-end w-32 h-12 flex justify-center items-center bottom-0 right-0 mr-3 mb-3 bg-[${Colors.primary}] rounded-xl`}
      >
        <GaramondText className="text-lg text-white">Hire</GaramondText>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default UserDetails;
