import { useState } from "react";
import { View } from "react-native";

import EducationDisplayer from "./components/EducationDisplayer";
import EducationModal from "./components/EducationModal";

const EducationPicker = ({
  education,
  setEducation,
  headerSize,
  headerText,
}) => {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [postIndex, setPostIndex] = useState(null);

  return (
    <View className="flex-1">
      <View className="flex-1 self-center w-full ">
        <EducationDisplayer
          education={education}
          setEducation={setEducation}
          headerSize={headerSize}
          headerText={headerText}
          setPostIndex={setPostIndex}
          setBottomSheetVisible={setBottomSheetVisible}
        />

        <EducationModal
          education={education}
          setEducation={setEducation}
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
