import GaramondText from "@/components/GaramondText";
import React, { useEffect, useState } from "react";
import { years } from "@/constants/Time";
import { degrees, majors } from "@/constants/Education";
import { View } from "react-native";

import RenderTextInput from "@/components/RenderTextInput";
import SingleSelectorModal from "@/components/SingleSelectorModal";

import PickerModalContainer from "../../components/PickerModalContainer";

const EducationModal = ({
  education,
  setEducation,
  isBottomSheetVisible,
  setBottomSheetVisible,
  postIndex,
  setPostIndex,
}) => {
  const isPostIndexDef = postIndex !== null && postIndex !== undefined;

  const [formData, setFormData] = useState({
    degree: "",
    major: "",
    school: "",
    startYear: "",
    endYear: "",
    note: "",
  });

  useEffect(() => {
    if (isPostIndexDef) {
      setFormData(education[postIndex]);
    }
  }, [postIndex]);

  const closeModal = () => {
    setBottomSheetVisible(false);
    setPostIndex(null);
    resetFormData();
  };

  const resetFormData = () => {
    setFormData({
      degree: "",
      major: "",
      school: "",
      startYear: "",
      endYear: "",
      note: "",
    });
  };

  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleSave = () => {
    isPostIndexDef
      ? setEducation(
          education.map((educ, index) =>
            index === postIndex ? { ...formData } : educ
          )
        )
      : setEducation([...education, { ...formData }]);

    closeModal();
  };

  return (
    <PickerModalContainer
      title="Education"
      isBottomSheetVisible={isBottomSheetVisible}
      postIndex={postIndex}
      handleSave={handleSave}
      closeModal={closeModal}
    >
      <SingleSelectorModal
        title="Degree *"
        data={degrees}
        value={formData.degree}
        setValue={(value) => handleInputChange("degree", value)}
      />

      <SingleSelectorModal
        title="Major *"
        data={majors}
        value={formData.major}
        setValue={(value) => handleInputChange("major", value)}
      />

      <RenderTextInput
        isMultiline={false}
        title="School *"
        value={formData.school}
        setValue={(value) => handleInputChange("school", value)}
        placeholder="Ex: LU"
      />

      <GaramondText className="text-xl mb-2">Duration</GaramondText>

      <View className="flex flex-row justify-between items-center">
        <SingleSelectorModal
          className="w-[45%]"
          data={years}
          value={formData.startYear}
          setValue={(value) => handleInputChange("startYear", value)}
        />

        <SingleSelectorModal
          className="w-[45%]"
          data={years}
          value={formData.endYear}
          setValue={(value) => handleInputChange("endYear", value)}
        />
      </View>

      <RenderTextInput
        isMultiline={true}
        title="Add Note"
        value={formData.note}
        setValue={(value) => handleInputChange("note", value)}
        placeholder="Ex: Minor in cyber security"
      />
    </PickerModalContainer>
  );
};

export default EducationModal;
