import GaramondText from "@/components/GaramondText";
import { Image, TouchableOpacity, View } from "react-native";

import pen from "@/assets/images/pen.png";
import trash from "@/assets/images/trash.png";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";

import { deleteJobPost } from "@/redux/User";

const PostJobDisplayer = ({ setPostIndex, setBottomSheetVisible }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleEdit = (index) => {
    setPostIndex(index);
    setBottomSheetVisible(true);
  };

  const jobs = useSelector((state) => state.user.jobPosts);

  return (
    <View>
      {jobs?.length > 0 &&
        jobs.map((job, index) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("JobPostDetails", { jobId: job?.id });
            }}
            key={index}
            className="relative w-full border rounded-2xl p-5 pt-3 pr-3 mb-4 min-h-60"
          >
            <View className="flex flex-row justify-between items-center">
              <GaramondText className=" text-3xl">{job?.title}</GaramondText>

              {setPostIndex && setPostIndex && (
                <View className="self-start w-[20%] flex flex-row justify-center items-center">
                  <TouchableOpacity
                    onPress={() => {
                      handleEdit(index);
                    }}
                    className="border border-gray-400 rounded-full p-[6px] mr-2"
                  >
                    <Image source={pen} className="w-5 h-5 aspect-square" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      deleteJobPost(dispatch, job?.id);
                    }}
                    className="border border-gray-400 rounded-full p-[6px]"
                  >
                    <Image source={trash} className="w-5 h-5 aspect-square" />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <GaramondText className=" text-[12px] opacity-50 mb-5">
              {moment(job?.createdAt).fromNow()}
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
              <GaramondText className=" text-[15px] ">{job?.type}</GaramondText>
            </View>

            <GaramondText className=" text-[15px] opacity-50 leading-6">
              {job?.description?.substring(0, 200)}
            </GaramondText>
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default PostJobDisplayer;
