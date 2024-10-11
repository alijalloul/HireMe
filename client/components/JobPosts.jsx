import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";
import moment from "moment";
import { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

const JobPosts = ({ navigation }) => {
  const posts = useSelector((state) => state.jobPosts.postsInfo);

  return (
    <View className="flex-1 my-5 w-full">
      {posts?.length > 0 ? (
        posts?.map((job, index) => (
          <TouchableOpacity
            key={job?.id}
            onPress={() => {
              navigation.navigate("JobPostDetails", {
                jobId: job?.id,
                employerId: job?.employerid,
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
                {job?.country}
              </GaramondText>
              <GaramondText className=" text-[15px] ">
                {job?.location}
              </GaramondText>
            </View>

            <View className="mb-3 flex flex-row justify-between">
              <GaramondText className=" text-[15px] ">
                {job?.experienceRequired}
              </GaramondText>
              <GaramondText className=" text-[15px] ">
                {job?.jobType}
              </GaramondText>
            </View>

            <GaramondText className=" text-[15px] opacity-50 leading-6">
              {job?.description.substring(0, 200)}
            </GaramondText>
          </TouchableOpacity>
        ))
      ) : (
        <View className="flex-1 justify-center items-center">
          <GaramondText className=" opacity-50 text-sm">
            No Jobs Available
          </GaramondText>
        </View>
      )}
    </View>
  );
};

export default JobPosts;
