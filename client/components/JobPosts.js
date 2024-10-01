import moment from "moment";
import { memo } from "react";
import { I18nManager, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

const translateText = (englishText, arabicText) => {
  return I18nManager.isRTL ? arabicText : englishText;
};

const JobPosts = ({ navigation }) => {
  const posts = useSelector((state) => state.jobPosts.postsInfo);

  return (
    <View className="flex-1 my-5 w-full">
      {posts?.length > 0 ? (
        posts?.map((job, index) => (
          <TouchableOpacity
            key={job?._id}
            onPress={() => {
              navigation.navigate("JobPostDetails", { jobId: job?._id, employerId: job?.employer_id });
            }}
            className={`flex justify-center w-full border-t-[1px] ${index + 1 === posts?.length && "border-b-[1px]"} border-[#00000055] p-5 `}
          >
            <View className="flex flex-row justify-between items-center">
              <Text className=" font-garamond text-3xl">{job?.jobTitle}</Text>
            </View>

            <Text className=" font-garamond text-[12px] opacity-50 mb-5">{moment(job?.date).fromNow()}</Text>

            <View className="mb-3 flex flex-row justify-between">
              <Text className=" font-garamond text-[15px] ">{translateText(job?.country, job?.country)}</Text>
              <Text className=" font-garamond text-[15px] ">{translateText(job?.location, job?.location)}</Text>
            </View>

            <View className="mb-3 flex flex-row justify-between">
              <Text className=" font-garamond text-[15px] ">{translateText(job?.experienceRequired, job?.experienceRequired)}</Text>
              <Text className=" font-garamond text-[15px] ">{translateText(job?.jobType, job?.jobType)}</Text>
            </View>

            <Text className=" font-garamond text-[15px] opacity-50 leading-6">{translateText(job?.description.substring(0, 200), job?.description.substring(0, 200))}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className=" font-garamond opacity-50 text-sm">{translateText("No Jobs Available", "لا تتوفر وظائف")}</Text>
        </View>
      )}
    </View>
  );
};

export default memo(JobPosts);
