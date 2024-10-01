import moment from "moment";
import React from "react";
import { I18nManager, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

const translateText = (englishText, arabicText) => {
  return I18nManager.isRTL ? arabicText : englishText;
};

const EmployeeJobs = ({ navigation, jobsStatus }) => {
  const jobs = useSelector((state) => state.user.jobPosts)?.filter((job) => job.status === jobsStatus);

  return (
    <View className="flex-1 w-[90%] ">
      <View className={`flex-1 justify-center items-center ${jobs?.length > 0 && "hidden"}`}>
        <Text className="font-garamond mb-5 text-lg opacity-60">
          {jobsStatus === "pending"
            ? translateText("You Have Not Applied to Any Job Yet.", "لم تقم بالتقديم على أي وظيفة بعد.")
            : translateText("You Have Not Been Hired to Any Job Yet.", "لم تعمل في أي وظيفة بعد.")}
        </Text>
      </View>
      <View>
        {jobs?.length > 0 &&
          jobs?.map((job, index) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("employeeJobDetails", { jobId: job._id });
              }}
              key={index}
              className="flex justify-center w-full border-[1px] rounded-2xl p-5 mb-4"
            >
              <View className="flex flex-row justify-between items-center">
                <Text className=" font-garamond text-3xl">{job.jobTitle}</Text>
              </View>

              <Text className=" font-garamond text-[12px] opacity-50 mb-5">{moment(job?.date).fromNow()}</Text>

              <View className="mb-3 flex flex-row justify-between">
                <Text className=" font-garamond text-[15px] ">{job.country}</Text>
                <Text className=" font-garamond text-[15px] ">{job.location}</Text>
              </View>

              <View className="mb-3 flex flex-row justify-between">
                <Text className=" font-garamond text-[15px] ">{job.experienceRequired}</Text>
                <Text className=" font-garamond text-[15px] ">{job.jobType}</Text>
              </View>

              <Text className=" font-garamond text-[15px] opacity-50 leading-6">{job.description.substring(0, 200)}</Text>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
};

export default EmployeeJobs;
