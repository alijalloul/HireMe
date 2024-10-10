import moment from "moment";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Pagination from "@/components/Pagination";
import GaramondText from "@/components/GaramondText";

const EmployeeMyJobs = ({ navigation, jobsStatus }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.userInfo);

  const jobs = useSelector((state) => state.user.jobPosts)?.filter(
    (job) => job.status === jobsStatus
  );

  return (
    <View className="flex-1 flex justify-center items-center">
      <View className="flex-1 w-[90%] ">
        <View
          className={`flex-1 justify-center items-center ${
            jobs?.length > 0 && "hidden"
          }`}
        >
          <GaramondText className="mb-5 text-lg opacity-60">
            {jobsStatus === "pending" && "You Have Not Applied to Any Job Yet."}
          </GaramondText>
        </View>
        <View>
          {jobs?.length > 0 &&
            jobs?.map((job, index) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("employeeJobDetails", { jobId: job.id });
                }}
                key={index}
                className="flex justify-center w-full border-[1px] rounded-2xl p-5 mb-4"
              >
                <View className="flex flex-row justify-between items-center">
                  <GaramondText className=" text-3xl">
                    {job.jobTitle}
                  </GaramondText>
                </View>

                <GaramondText className=" text-[12px] opacity-50 mb-5">
                  {moment(job?.date).fromNow()}
                </GaramondText>

                <View className="mb-3 flex flex-row justify-between">
                  <GaramondText className=" text-[15px] ">
                    {job.country}
                  </GaramondText>
                  <GaramondText className=" text-[15px] ">
                    {job.location}
                  </GaramondText>
                </View>

                <View className="mb-3 flex flex-row justify-between">
                  <GaramondText className=" text-[15px] ">
                    {job.experienceRequired}
                  </GaramondText>
                  <GaramondText className=" text-[15px] ">
                    {job.jobType}
                  </GaramondText>
                </View>

                <GaramondText className=" text-[15px] opacity-50 leading-6">
                  {job.description.substring(0, 200)}
                </GaramondText>
              </TouchableOpacity>
            ))}
        </View>
      </View>
      <Pagination fetchType="postsByEmployeeId" />
    </View>
  );
};

export default EmployeeMyJobs;
