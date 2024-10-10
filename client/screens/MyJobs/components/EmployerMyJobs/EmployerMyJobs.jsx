import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import GaramondText from "@/components/GaramondText";
import Pagination from "@/components/Pagination";
import PostJobModal from "./PostJob/PostJobModal";

import { Colors } from "@/constants/Colors";

const EmployerMyJobs = ({ navigation, jobsStatus }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.userInfo);
  const page = useSelector((state) => state.user.currentPage);
  const numberOfPages = useSelector((state) => state.user.numberOfPages);

  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  return (
    <View className="flex-1 flex justify-center items-center w-full">
      <PostJobModal
        isBottomSheetVisible={isBottomSheetVisible}
        setBottomSheetVisible={setBottomSheetVisible}
        navigation={navigation}
        jobsStatus={jobsStatus}
      />

      <Pagination
        fetchType="postsById"
        userId={user?.id}
        page={page}
        numberOfPages={numberOfPages}
      />

      <TouchableOpacity
        onPress={() => {
          setBottomSheetVisible(true);
        }}
        className={`${
          user?.accountType === "employee"
            ? "hidden"
            : `self-end w-32 h-12 flex justify-center items-center mr-3 mb-3 rounded-xl`
        }`}
        style={{ backgroundColor: Colors.primary }}
      >
        <GaramondText className="text-lg text-white">Post Job</GaramondText>
      </TouchableOpacity>
    </View>
  );
};

export default EmployerMyJobs;
