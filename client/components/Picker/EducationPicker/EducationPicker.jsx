import React, { memo, useEffect, useState } from "react";
import { View } from "react-native";

import EducationModal from "./components/EducationModal";
import EducationDisplayer from "./components/EducationDisplayer";

const EducationPicker = ({ headerSize, headerText }) => {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [postIndex, setPostIndex] = useState(null);

  return (
    <View className="flex-1">
      <View className="flex-1 self-center w-full ">
        <EducationDisplayer
          headerSize={headerSize}
          headerText={headerText}
          setPostIndex={setPostIndex}
          setBottomSheetVisible={setBottomSheetVisible}
        />

        <EducationModal
          isBottomSheetVisible={isBottomSheetVisible}
          setBottomSheetVisible={setBottomSheetVisible}
          postIndex={postIndex}
          setPostIndex={setPostIndex}
        />
      </View>
    </View>
  );
};

export default EducationPicker;
