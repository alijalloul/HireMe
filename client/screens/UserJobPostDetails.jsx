import GaramondText from "@/components/GaramondText";
import moment from "moment";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

const UserJobPostDetails = ({ route, navigation }) => {
  const { itemId } = route.params;

  const employees = useSelector((state) => state.user.employeesByJobId);
  const job = useSelector((state) => state.user.jobPosts)?.filter(
    (item) => item.id === itemId && item
  )[0];

  return (
    <ScrollView
      className="bg-white"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View className="w-full items-center mb-10">
        <View className="w-[90%] mb-8">
          <View className="mb-8">
            <GaramondText className="font-garamond-semibold text-4xl font-garamond-semibold">
              {job?.jobTitle}
            </GaramondText>
            <GaramondText className="text-[15px] opacity-50">
              {moment(job?.createdAt).fromNow()}
            </GaramondText>
          </View>

          <View className="flex flex-row justify-between items-center mb-8">
            <GaramondText className="text-lg">
              {job?.location + "-" + job?.country}
            </GaramondText>
            <GaramondText className="text-lg">
              {job?.experienceRequired}
            </GaramondText>
          </View>

          <GaramondText className="text-lg">{job?.description}</GaramondText>
        </View>

        <View className="w-full flex justify-between items-center py-3 border-t-[1px]">
          <View className="w-[90%] flex flex-row justify-between items-center">
            <GaramondText className="text-lg">Job Type</GaramondText>
            <GaramondText className="text-lg">{job?.jobType}</GaramondText>
          </View>
        </View>

        <View className="w-full flex justify-between items-center py-3 border-t-[1px]">
          <View className="w-[90%] flex flex-row justify-between items-center">
            <GaramondText className="text-lg">Category</GaramondText>
            <GaramondText className="text-lg">{job?.category}</GaramondText>
          </View>
        </View>

        <View className="w-full flex justify-center items-center py-6 border-y-[1px]">
          <View className="w-[90%]">
            <GaramondText className="text-lg mb-2">Skills</GaramondText>
            <View className="flex flex-row flex-wrap">
              {job?.skills.length > 0 &&
                job?.skills.map((skill, index) => (
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
      </View>

      <View className="flex-1 w-full items-center">
        {employees?.length > 0 ? (
          employees?.map((employee, index) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("userDetails", { userId: employee?.id });
              }}
              key={index}
              className="w-[90%] px-4 flex-row items-center rounded-full border h-32 mb-3"
            >
              <View className="w-20 h-20 mr-2">
                <Image
                  source={
                    employee.image !== "" ? { uri: employee.image } : null
                  }
                  className="rounded-full w-full h-full"
                />
              </View>

              <View className="">
                <View className="mb-5">
                  <GaramondText className="text-lg ">
                    {employee.name}
                  </GaramondText>
                  <GaramondText className="opacity-50 text-sm">
                    posted 3hr ago
                  </GaramondText>
                </View>

                <GaramondText className="">{employee.coverLetter}</GaramondText>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View className="w-[90%] items-center'">
            <GaramondText className="opacity-50">
              No one has applied yet. Refresh the page in order to update the
              list.
            </GaramondText>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default UserJobPostDetails;
