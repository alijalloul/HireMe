import GaramondText from "@/components/GaramondText";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";

const EmployeeJobDetails = ({ route, navigation }) => {
  const { jobId } = route.params;

  const job = useSelector((state) => state.user.jobPosts)?.filter(
    (item) => item.id === jobId && item
  )[0];

  return (
    <ScrollView
      className=" bg-white"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View className="flex-1 w-full items-center">
        <View className=" w-[90%] mb-8 ">
          <View className="mb-8">
            <GaramondText className=" font-garamond-semibold text-4xl font-garamond-semibold">
              {job?.title}
            </GaramondText>
            <GaramondText className=" text-[15px] opacity-50">
              {job?.createdAt}
            </GaramondText>
          </View>

          <View className="flex flex-row justify-between items-center mb-8">
            <GaramondText className=" text-lg">
              {job?.location}-{job?.country}
            </GaramondText>
            <GaramondText className=" text-lg">
              {job?.experienceRequired}
            </GaramondText>
          </View>

          <GaramondText className=" text-lg">{job?.description}</GaramondText>
        </View>

        <View className="w-full flex justify-between items-center py-6 border-t-[1px]">
          <View className="w-[90%] flex flex-row justify-between items-center">
            <GaramondText className=" text-lg">نوع الوظيفة</GaramondText>
            <GaramondText className=" text-lg">{job?.type}</GaramondText>
          </View>
        </View>

        <View className="w-full flex justify-between items-center py-6 border-t-[1px]">
          <View className="w-[90%] flex flex-row justify-between items-center">
            <GaramondText className=" text-lg">الفئة</GaramondText>
            <GaramondText className=" text-lg">{job?.category}</GaramondText>
          </View>
        </View>

        <View className="w-full flex justify-center items-center py-6 border-y-[1px] mb-5">
          <View className="w-[90%]">
            <GaramondText className=" text-lg">المهارات</GaramondText>
            <View className="flex flex-row flex-wrap">
              {job?.skills?.length > 0 &&
                job?.skills?.map((skill, index) => (
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

        <View className="flex justify-center w-[90%]">
          <GaramondText className="text-2xl mb-2">رسالة التغطية</GaramondText>

          <GaramondText className=" ">{job?.coverLetter}</GaramondText>
        </View>
      </View>
    </ScrollView>
  );
};

export default EmployeeJobDetails;
