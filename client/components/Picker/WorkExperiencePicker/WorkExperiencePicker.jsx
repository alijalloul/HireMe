import React, { memo, useEffect, useState } from "react";
import { View } from "react-native";

import WorkExperienceModal from "./components/WorkExperienceModal";
import WorkExperienceDisplayer from "./components/WorkExperienceDisplayer";

const WorkExperiencePicker = ({ headerSize, headerText }) => {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [postIndex, setPostIndex] = useState(null);

  return (
    <View className="flex-1 ">
      <View className="flex-1 self-center ">
        <WorkExperienceDisplayer
          headerSize={headerSize}
          headerText={headerText}
          setPostIndex={setPostIndex}
          setBottomSheetVisible={setBottomSheetVisible}
        />

        <WorkExperienceModal
          isBottomSheetVisible={isBottomSheetVisible}
          setBottomSheetVisible={setBottomSheetVisible}
          postIndex={postIndex}
          setPostIndex={setPostIndex}
        />
      </View>
    </View>
  );
};

export default WorkExperiencePicker;
