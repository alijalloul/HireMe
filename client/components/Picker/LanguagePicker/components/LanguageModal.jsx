import GaramondText from "@/components/GaramondText";
import React, { useEffect, useState } from "react";
import { languages, proficiencies } from "@/constants/Language";
import RenderTextInput from "@/components/RenderTextInput";
import SingleSelectorModal from "@/components/SingleSelectorModal";

import { useDispatch, useSelector } from "react-redux";
import { editUser } from "@/redux/User";
import PickerModalContainer from "../../components/PickerModalContainer";

const LanguageModal = ({
  isBottomSheetVisible,
  setBottomSheetVisible,
  postIndex,
  setPostIndex,
}) => {
  const language = useSelector((state) => state.user.userInfo).language;
  const dispatch = useDispatch();

  const isPostIndexDef = postIndex !== null && postIndex !== undefined;

  const [formData, setFormData] = useState({
    language: "",
    proficiency: "",
  });

  useEffect(() => {
    if (isPostIndexDef) {
      setFormData(language[postIndex]);
    }
  }, [postIndex]);

  const closeModal = () => {
    setBottomSheetVisible(false);
    setPostIndex(null);
    resetFormData();
  };

  const resetFormData = () => {
    setFormData({
      language: "",
      proficiency: "",
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
      ? editUser(dispatch, {
          language: language.map((lang, index) =>
            index === postIndex ? { ...formData } : lang
          ),
        })
      : editUser(dispatch, { language: [...language, { ...formData }] });

    closeModal();
  };

  return (
    <PickerModalContainer
      title="Language"
      isBottomSheetVisible={isBottomSheetVisible}
      postIndex={postIndex}
      handleSave={handleSave}
      closeModal={closeModal}
    >
      <SingleSelectorModal
        title="Language *"
        data={languages}
        value={formData.language}
        setValue={(value) => handleInputChange("language", value)}
      />

      <SingleSelectorModal
        title="Proficiency *"
        data={proficiencies}
        value={formData.proficiency}
        setValue={(value) => handleInputChange("proficiency", value)}
      />
    </PickerModalContainer>
  );
};

export default LanguageModal;
