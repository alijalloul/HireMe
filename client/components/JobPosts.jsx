import { Colors } from '@/constants/Colors'
import GaramondText from "@/components/GaramondText";
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
              navigation.navigate("JobPostDetails", {
                jobId: job?._id,
                employerId: job?.employer_id,
              });
            }}
            className={`flex justify-center w-full border-t-[1px] ${
              index + 1 === posts?.length && "border-b-[1px]"
            } border-[#00000055] p-5 `}
          >
            <View className="flex flex-row justify-between items-center">
              <GaramondText className=" text-3xl">{job?.jobTitle}</GaramondText>
            </View>

            <GaramondText className=" text-[12px] opacity-50 mb-5">
              {moment(job?.date).fromNow()}
            </GaramondText>

            <View className="mb-3 flex flex-row justify-between">
              <GaramondText className=" text-[15px] ">
                {translateText(job?.country, job?.country)}
              </GaramondText>
              <GaramondText className=" text-[15px] ">
                {translateText(job?.location, job?.location)}
              </GaramondText>
            </View>

            <View className="mb-3 flex flex-row justify-between">
              <GaramondText className=" text-[15px] ">
                {translateText(
                  job?.experienceRequired,
                  job?.experienceRequired
                )}
              </GaramondText>
              <GaramondText className=" text-[15px] ">
                {translateText(job?.jobType, job?.jobType)}
              </GaramondText>
            </View>

            <GaramondText className=" text-[15px] opacity-50 leading-6">
              {translateText(
                job?.description.substring(0, 200),
                job?.description.substring(0, 200)
              )}
            </GaramondText>
          </TouchableOpacity>
        ))
      ) : (
        <View className="flex-1 justify-center items-center">
          <GaramondText className=" opacity-50 text-sm">
            {translateText("No Jobs Available", "لا تتوفر وظائف")}
          </GaramondText>
        </View>
      )}
    </View>
  );
};

export default memo(JobPosts);
