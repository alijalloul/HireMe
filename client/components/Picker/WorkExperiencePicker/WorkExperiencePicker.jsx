import { useState } from "react";
import { View } from "react-native";

import WorkExperienceDisplayer from "./components/WorkExperienceDisplayer";
import WorkExperienceModal from "./components/WorkExperienceModal";

const WorkExperiencePicker = ({
  workExperience,
  setWorkExperience,
  headerSize,
  headerText,
}) => {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [postIndex, setPostIndex] = useState(null);

  return (
    <View className="flex-1 ">
      <View className="flex-1 self-center ">
        <WorkExperienceDisplayer
          workExperience={workExperience}
          setWorkExperience={setWorkExperience}
          headerSize={headerSize}
          headerText={headerText}
          setPostIndex={setPostIndex}
          setBottomSheetVisible={setBottomSheetVisible}
        />

        <WorkExperienceModal
          workExperience={workExperience}
          setWorkExperience={setWorkExperience}
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
