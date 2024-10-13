import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";

import GaramondText from "@/components/GaramondText";
import Pagination from "@/components/Pagination";

import { Colors } from "@/constants/Colors";
import PostJobDisplayer from "./_components/PostJobDisplayer";
import PostJobModal from "@/components/PostJob/PostJobModal";

const EmployerMyJobs = ({ navigation, jobsStatus }) => {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [postIndex, setPostIndex] = useState(null);

  return (
    <View className="flex-1 flex justify-center items-center w-full">
      <View className="flex-1 ">
        <View className="flex-1 self-center ">
          <PostJobDisplayer
            setPostIndex={setPostIndex}
            setBottomSheetVisible={setBottomSheetVisible}
          />

          <PostJobModal
            isBottomSheetVisible={isBottomSheetVisible}
            setBottomSheetVisible={setBottomSheetVisible}
            postIndex={postIndex}
            setPostIndex={setPostIndex}
          />
        </View>
      </View>

      <Pagination fetchType="postsByUserId" />

      <TouchableOpacity
        onPress={() => {
          setBottomSheetVisible(true);
        }}
        className="self-end w-32 h-12 flex justify-center items-center mr-3 mb-3 rounded-xl"
        style={{ backgroundColor: Colors.primary }}
      >
        <GaramondText className="text-lg text-white">Post Job</GaramondText>
      </TouchableOpacity>
    </View>
  );
};

export default EmployerMyJobs;
