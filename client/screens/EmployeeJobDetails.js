import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";

const EmployeeJobDetails = ({ route, navigation }) => {
  const { jobId } = route.params;

  const job = useSelector((state) => state.user.jobPosts)?.filter((item) => item._id === jobId && item)[0];

  return (
    <ScrollView className=" bg-white" contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
      <View className="flex-1 w-full items-center">
        <View className=" w-[90%] mb-8 ">
          <View className="mb-8">
            <Text className=" font-garamond-semibold text-4xl">{job?.jobTitle}</Text>
            <Text className=" font-garamond text-[15px] opacity-50">{job?.date}</Text>
          </View>

          <View className="flex flex-row justify-between items-center mb-8">
            <Text className=" font-garamond text-lg">
              {job?.location}-{job?.country}
            </Text>
            <Text className=" font-garamond text-lg">{job?.experienceRequired}</Text>
          </View>

          <Text className=" font-garamond text-lg">{job?.description}</Text>
        </View>

        <View className="w-full flex justify-between items-center py-6 border-t-[1px]">
          <View className="w-[90%] flex flex-row justify-between items-center">
            <Text className=" font-garamond text-lg">نوع الوظيفة</Text>
            <Text className=" font-garamond text-lg">{job?.type}</Text>
          </View>
        </View>

        <View className="w-full flex justify-between items-center py-6 border-t-[1px]">
          <View className="w-[90%] flex flex-row justify-between items-center">
            <Text className=" font-garamond text-lg">الفئة</Text>
            <Text className=" font-garamond text-lg">{job?.category}</Text>
          </View>
        </View>

        <View className="w-full flex justify-center items-center py-6 border-y-[1px] mb-5">
          <View className="w-[90%]">
            <Text className=" font-garamond text-lg">المهارات</Text>
            <View className="flex flex-row flex-wrap">
              {job?.skills?.length > 0 &&
                job?.skills?.map((skill, index) => (
                  <View className="inline-block px-2 py-2 rounded-2xl mr-2 mb-2 bg-[#ff8d3c]" key={index.toString()}>
                    <Text className="text-white">{skill}</Text>
                  </View>
                ))}
            </View>
          </View>
        </View>

        <View className="flex justify-center w-[90%]">
          <Text className="text-2xl font-garamond mb-2">رسالة التغطية</Text>

          <Text className=" font-garamond ">{job?.coverLetter}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default EmployeeJobDetails;
