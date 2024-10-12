import GaramondText from "@/components/GaramondText";
import React, { useEffect, useState } from "react";
import { months, years } from "@/constants/Time";
import { View } from "react-native";

import RenderTextInput from "@/components/RenderTextInput";
import SingleSelectorModal from "@/components/SingleSelectorModal";
import PickerModalContainer from "../../components/PickerModalContainer";

const workExpModal = ({
  workExperience,
  setWorkExperience,
  isBottomSheetVisible,
  setBottomSheetVisible,
  postIndex,
  setPostIndex,
}) => {
  const isPostIndexDef = postIndex !== null && postIndex !== undefined;

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    country: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    description: "",
  });

  useEffect(() => {
    if (isPostIndexDef) {
      setFormData(workExperience[postIndex]);
    }
  }, [postIndex]);

  const [errors, setErrors] = useState({
    titleError: false,
    companyError: false,
    locationError: false,
    countryError: false,
  });

  const closeModal = () => {
    setBottomSheetVisible(false);
    setPostIndex(null);
    resetFormData();
  };

  const resetFormData = () => {
    setFormData({
      title: "",
      company: "",
      location: "",
      country: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      description: "",
    });
    setErrors({
      titleError: false,
      companyError: false,
      locationError: false,
      countryError: false,
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
      ? setWorkExperience(
          workExperience.map((work, index) =>
            index === postIndex ? { ...formData } : work
          )
        )
      : setWorkExperience([...workExperience, { ...formData }]);

    closeModal();
  };

  return (
    <PickerModalContainer
      title="Work Experience"
      isBottomSheetVisible={isBottomSheetVisible}
      postIndex={postIndex}
      handleSave={handleSave}
      closeModal={closeModal}
    >
      <RenderTextInput
        isMultiline={false}
        title={`Title *`}
        value={formData.title}
        setValue={(value) => handleInputChange("title", value)}
        placeholder="Ex: Accountant"
        isError={errors.titleError}
        setIsError={(isError) =>
          setErrors((prev) => ({ ...prev, titleError: isError }))
        }
        errorMessage="This field cannot be empty"
      />

      <RenderTextInput
        isMultiline={false}
        title={`Company *`}
        value={formData.company}
        setValue={(value) => handleInputChange("company", value)}
        placeholder="Ex: Amazon"
        isError={errors.companyError}
        setIsError={(isError) =>
          setErrors((prev) => ({ ...prev, companyError: isError }))
        }
        errorMessage="This field cannot be empty"
      />

      <RenderTextInput
        isMultiline={false}
        title={`Location *`}
        value={formData.location}
        setValue={(value) => handleInputChange("location", value)}
        placeholder="Ex: San Francisco"
        isError={errors.locationError}
        setIsError={(isError) =>
          setErrors((prev) => ({ ...prev, locationError: isError }))
        }
        errorMessage="This field cannot be empty"
      />

      <RenderTextInput
        isMultiline={false}
        title={`Country *`}
        value={formData.country}
        setValue={(value) => handleInputChange("country", value)}
        placeholder="Ex: USA"
        isError={errors.countryError}
        setIsError={(isError) =>
          setErrors((prev) => ({ ...prev, countryError: isError }))
        }
        errorMessage="This field cannot be empty"
      />

      <View className="flex flex-row justify-between w-full">
        <SingleSelectorModal
          className="w-[45%]"
          title="Start Month"
          value={formData.startMonth}
          setValue={(value) => handleInputChange("startMonth", value)}
          data={months}
        />
        <SingleSelectorModal
          className="w-[45%]"
          title="Start Year"
          value={formData.startYear}
          setValue={(value) => handleInputChange("startYear", value)}
          data={years}
        />
      </View>

      <View className="flex flex-row justify-between w-full">
        <SingleSelectorModal
          className="w-[45%]"
          title="End Month"
          value={formData.endMonth}
          setValue={(value) => handleInputChange("endMonth", value)}
          data={months}
        />
        <SingleSelectorModal
          className="w-[45%]"
          title="End Year"
          value={formData.endYear}
          setValue={(value) => handleInputChange("endYear", value)}
          data={years}
        />
      </View>

      <RenderTextInput
        isMultiline={true}
        title={`Description`}
        value={formData.description}
        setValue={(value) => handleInputChange("description", value)}
        placeholder="Write a short description"
      />
    </PickerModalContainer>
  );
};

export default workExpModal;
