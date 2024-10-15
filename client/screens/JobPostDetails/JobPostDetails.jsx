import GaramondText from "@/components/GaramondText";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

import RenderTextInput from "@/components/RenderTextInput";
import SpinnerScrollbar from "@/components/SpinnerScrollbar";
import { handleApply } from "@/redux/User";
import ApplicantsDisplayer from "./components/ApplicantsDisplayer";

const JobPostDetails = ({ route, navigation }) => {
  const { jobId, employerId } = route.params;

  const user = useSelector((state) => state.user);
  const accountType = user.user.accountType;
  const employeeId = user.user?.id;
  const applicants = user.user?.applicants;

  const hasApplied = user.jobPosts.some((item) => item.id === jobId);

  const post = useSelector((state) => state.jobPosts.postsInfo)?.filter(
    (item) => item.id === jobId && item
  )[0];

  const [coverLetter, setCoverLetter] = useState("");
  const [coverLetterError, setCoverLetterError] = useState(false);

  const handleApplyButton = () => {
    coverLetter.trim() !== "" &&
      handleApply(
        dispatch,
        jobId,
        employeeId,
        employerId,
        coverLetter,
        navigation
      );
  };

  return (
    <SpinnerScrollbar>
      <View className="flex-1 w-full items-center">
        <View className="w-[90%] mb-8 ">
          <View className="mb-8">
            <GaramondText className="font-garamond-semibold text-4xl ">
              {post?.title}
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

        <View className="w-full flex justify-between items-center py-6 border-t">
          <View className="w-[90%] flex flex-row justify-between items-center">
            <GaramondText className="text-lg">Job Type</GaramondText>
            <GaramondText className="text-lg">{post?.type}</GaramondText>
          </View>
        </View>

        <View className="w-full flex justify-between items-center py-6 border-t">
          <View className="w-[90%] flex flex-row justify-between items-center">
            <GaramondText className="text-lg">Category</GaramondText>
            <GaramondText className="text-lg">{post?.category}</GaramondText>
          </View>
        </View>

        <View className="w-full flex justify-center items-center py-6 border-y">
          <View className="w-[90%]">
            <GaramondText className="text-lg">Skills</GaramondText>
            <View className="flex flex-row flex-wrap">
              {post?.skills?.length > 0 &&
                post?.skills?.map((skill, index) => (
                  <View
                    className="inline-block px-2 py-2 rounded-2xl mr-2 mb-2 "
                    style={{ backgroundColor: Colors.primary }}
                    key={index.toString()}
                  >
                    <GaramondText className="text-white">{skill}</GaramondText>
                  </View>
                ))}
            </View>
          </View>
        </View>

        {accountType !== "employer" && !hasApplied && (
          <View className="flex justify-center items-center w-[90%] mt-5">
            <RenderTextInput
              title="Cover Letter"
              placeholder="Ex: I have over 5 years of experience in accounting. Moreover, I have a cisco certification in both Excel and Word"
              isMultiline={true}
              value={coverLetter}
              setValue={setCoverLetter}
            />
          </View>
        )}
      </View>

      {accountType === "employee" && (
        <View className="flex justify-center items-center w-[90%] my-5">
          {hasApplied ? (
            <View className="flex-1 justify-center items-center w-full ">
              <GaramondText className="text-sm opacity-50 ">
                You have already applied for this job.
              </GaramondText>
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleApplyButton}
              className="w-32 h-12 self-end flex justify-center items-center  rounded"
              style={{ backgroundColor: Colors.primary }}
            >
              <GaramondText className="text-lg text-white">Apply</GaramondText>
            </TouchableOpacity>
          )}
        </View>
      )}

      {accountType === "employer" && (
        <ApplicantsDisplayer jobId={jobId} navigation={navigation} />
      )}
    </SpinnerScrollbar>
  );
};

export default JobPostDetails;
