import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

import RenderTextInput from "@/components/RenderTextInput";
import { handleApply } from "@/redux/User";

const JobPostDetails = ({ route, navigation }) => {
  const { jobId, employerId } = route.params;

  const accountType = useSelector((state) => state.user.userInfo).type;
  const post = useSelector((state) => state.jobPosts.postsInfo)?.filter(
    (item) => item._id === jobId && item
  )[0];
  const job_id = jobId;
  const employee_id = useSelector((state) => state.user.userInfo)?._id;
  const employer_id = employerId;
  const status = "pending";
  const category = post?.category || "";
  const applied = useSelector((state) => state.user.jobPosts).some(
    (item) => item._id === jobId
  );

  const [coverLetter, setCoverLetter] = useState("");
  const [coverLetterError, setCoverLetterError] = useState(false);

  const handleApplyButton = () => {
    handleApply(
      job_id,
      employee_id,
      employer_id,
      status,
      category,
      coverLetter,
      navigation
    );
  };

  return (
    <ScrollView
      className="bg-white"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View className="flex-1 w-full items-center">
        <View className="w-[90%] mb-8 ">
          <View className="mb-8">
            <GaramondText className="font-garamond-semibold text-5xl">
              {post?.jobTitle}
            </GaramondText>
            <GaramondText className="text-[15px] opacity-50">
              posted 2 hours ago
            </GaramondText>
          </View>

          <View className="flex flex-row justify-between items-center mb-8">
            <GaramondText className="text-lg">
              {post?.location + "-" + post?.country}
            </GaramondText>
            <GaramondText className="text-lg">
              {post?.experienceRequired}
            </GaramondText>
          </View>

          <GaramondText className="text-lg">{post?.description}</GaramondText>
        </View>

        <View className="w-full flex justify-between items-center py-6 border-t-[1px]">
          <View className="w-[90%] flex flex-row justify-between items-center">
            <GaramondText className="text-lg">Job Type</GaramondText>
            <GaramondText className="text-lg">{post?.type}</GaramondText>
          </View>
        </View>

        <View className="w-full flex justify-between items-center py-6 border-t-[1px]">
          <View className="w-[90%] flex flex-row justify-between items-center">
            <GaramondText className="text-lg">Category</GaramondText>
            <GaramondText className="text-lg">{post?.category}</GaramondText>
          </View>
        </View>

        <View className="w-full flex justify-center items-center py-6 border-y-[1px]">
          <View className="w-[90%]">
            <GaramondText className="text-lg">Skills</GaramondText>
            <View className="flex flex-row flex-wrap">
              {post?.skills?.length > 0 &&
                post?.skills?.map((skill, index) => (
                  <View
                    className="inline-block px-2 py-2 rounded-2xl mr-2 mb-2 bg-[#ff8d3c]"
                    key={index.toString()}
                  >
                    <GaramondText className="text-white">{skill}</GaramondText>
                  </View>
                ))}
            </View>
          </View>
        </View>

        <View
          className={` ${
            accountType === "employer" || applied
              ? "hidden"
              : "flex justify-center items-center w-[90%] mt-5"
          }`}
        >
          <RenderTextInput
            title="Cover Letter"
            placeholder="Ex: I have over 5 years of experience in accounting. Moreover, I have a cisco certification in both Excel and Word"
            isMultiline={true}
            value={coverLetter}
            setValue={setCoverLetter}
            isError={coverLetterError}
            setIsError={setCoverLetterError}
            errorMessage="This field cannot be empty"
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          coverLetter.trim() === ""
            ? setCoverLetterError(true)
            : handleApplyButton();
        }}
        className={` ${
          accountType === "employer" || applied
            ? "hidden"
            : `self-end justify-self-end w-32 h-12 flex justify-center items-center mr-3 my-3 bg-[${Colors.primary}] rounded-xl`
        }`}
      >
        <GaramondText className="text-lg text-white">Apply</GaramondText>
      </TouchableOpacity>

      <View
        className={`${
          applied ? "flex-1 justify-center items-center w-full " : "hidden"
        }`}
      >
        <GaramondText className="text-sm opacity-50 ">
          You have already applied for this job.
        </GaramondText>
      </View>
    </ScrollView>
  );
};

export default JobPostDetails;
