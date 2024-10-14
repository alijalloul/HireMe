import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";

import GaramondText from "@/components/GaramondText";

import { Colors } from "@/constants/Colors";
import PostJobDisplayer from "./components/PostJobDisplayer";
import PostJobModal from "./components/PostJobModal";
import { fetchJobsByEmployer } from "@/redux/User";
import { useDispatch, useSelector } from "react-redux";

const EmployerMyJobs = ({}) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user)?.id;

  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [postIndex, setPostIndex] = useState(null);

  useEffect(() => {
    fetchJobsByEmployer(dispatch, userId);
  }, []);

  return (
    <View className="flex-1 flex justify-center items-center w-full">
      <View className="flex-1 w-[90%] mb-5">
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
