import React, { useState } from "react";
import {
  I18nManager,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";

import RenderTextInput from "@/components/RenderTextInput";
import { handleApply } from "@/redux/User";

const translateText = (
  englishText,
  arabicText
) => {
  return I18nManager.isRTL
    ? arabicText
    : englishText;
};

const JobPostDetails = ({
  route,
  navigation,
}) => {
  const { jobId, employerId } = route.params;

  const accountType = useSelector(
    (state) => state.user.userInfo
  ).type;
  const post = useSelector(
    (state) => state.jobPosts.postsInfo
  )?.filter(
    (item) => item._id === jobId && item
  )[0];
  const job_id = jobId;
  const employee_id = useSelector(
    (state) => state.user.userInfo
  )?._id;
  const employer_id = employerId;
  const status = "pending";
  const category = post?.category || "";
  const applied = useSelector(
    (state) => state.user.jobPosts
  ).some((item) => item._id === jobId);

  const [coverLetter, setCoverLetter] =
    useState("");
  const [coverLetterError, setCoverLetterError] =
    useState(false);

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
            <Text className="font-garamond-semibold text-4xl">
              {translateText(
                post?.jobTitle,
                "عنوان الوظيفة"
              )}
            </Text>
            <Text className="font-garamond text-[15px] opacity-50">
              {translateText(
                "posted 2 hours ago",
                "نشر منذ 2 ساعة"
              )}
            </Text>
          </View>

          <View className="flex flex-row justify-between items-center mb-8">
            <Text className="font-garamond text-lg">
              {translateText(
                post?.location +
                  "-" +
                  post?.country,
                post?.location +
                  "-" +
                  post?.country
              )}
            </Text>
            <Text className="font-garamond text-lg">
              {translateText(
                post?.experienceRequired,
                post?.experienceRequired
              )}
            </Text>
          </View>

          <Text className="font-garamond text-lg">
            {translateText(
              post?.description,
              "وصف الوظيفة"
            )}
          </Text>
        </View>

        <View className="w-full flex justify-between items-center py-6 border-t-[1px]">
          <View className="w-[90%] flex flex-row justify-between items-center">
            <Text className="font-garamond text-lg">
              {translateText(
                "Job Type",
                "نوع الوظيفة"
              )}
            </Text>
            <Text className="font-garamond text-lg">
              {translateText(
                post?.type,
                post?.type
              )}
            </Text>
          </View>
        </View>

        <View className="w-full flex justify-between items-center py-6 border-t-[1px]">
          <View className="w-[90%] flex flex-row justify-between items-center">
            <Text className="font-garamond text-lg">
              {translateText("Category", "الفئة")}
            </Text>
            <Text className="font-garamond text-lg">
              {translateText(
                post?.category,
                post?.category
              )}
            </Text>
          </View>
        </View>

        <View className="w-full flex justify-center items-center py-6 border-y-[1px]">
          <View className="w-[90%]">
            <Text className="font-garamond text-lg">
              {translateText("Skills", "مهارات")}
            </Text>
            <View className="flex flex-row flex-wrap">
              {post?.skills?.length > 0 &&
                post?.skills?.map(
                  (skill, index) => (
                    <View
                      className="inline-block px-2 py-2 rounded-2xl mr-2 mb-2 bg-[#ff8d3c]"
                      key={index.toString()}
                    >
                      <Text className="text-white">
                        {translateText(
                          skill,
                          skill
                        )}
                      </Text>
                    </View>
                  )
                )}
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
            title={translateText(
              "Cover Letter",
              "رسالة تغطية"
            )}
            placeholder={translateText(
              "Ex: I have over 5 years of experience in accounting. Moreover, I have a cisco certification in both Excel and Word",
              "مثال: لدي أكثر من 5 سنوات خبرة في المحاسبة. علاوة على ذلك، لدي شهادة سيسكو في Excel و Word"
            )}
            isMultiline={true}
            value={coverLetter}
            setValue={setCoverLetter}
            isError={coverLetterError}
            setIsError={setCoverLetterError}
            errorMessage={translateText(
              "This field cannot be empty",
              "لا يمكن أن يكون هذا الحقل فارغًا"
            )}
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
            : "self-end justify-self-end w-32 h-12 flex justify-center items-center mr-3 my-3 bg-[#FE6F07] rounded-xl"
        }`}
      >
        <Text className="text-lg font-garamond text-white">
          {translateText("Apply", "قدّم")}
        </Text>
      </TouchableOpacity>

      <View
        className={`${
          applied
            ? "flex-1 justify-center items-center w-full "
            : "hidden"
        }`}
      >
        <Text className="font-garamond text-sm opacity-50 ">
          {translateText(
            "You have already applied for this job.",
            "لقد قدمت بالفعل لهذه الوظيفة."
          )}
        </Text>
      </View>
    </ScrollView>
  );
};

export default JobPostDetails;
