import GaramondText from "@/components/GaramondText";
import React, { useEffect, useState } from "react";
import { months, years } from "@/constants/Time";
import { View } from "react-native";

import RenderTextInput from "@/components/RenderTextInput";
import SingleSelectorModal from "@/components/SingleSelectorModal";
import PickerModalContainer from "../../components/PickerModalContainer";
import { useDispatch } from "react-redux";
import { updateJobPost } from "@/redux/User";

const workExpModal = ({
  jobs,
  setJobs,
  isBottomSheetVisible,
  setBottomSheetVisible,
  postIndex,
  setPostIndex,
}) => {
  const dispatch = useDispatch();

  const isPostIndexDef = postIndex !== null && postIndex !== undefined;

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    country: "",
    category: "",
    skills: [],
    experienceRequired: "",
    jobType: "",
    description: "",
  });

  useEffect(() => {
    if (isPostIndexDef) {
      setFormData(jobs[postIndex]);
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
      category: "",
      skills: [],
      experienceRequired: "",
      jobType: "",
      description: "",
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
      ? updateJobPost(
          dispatch,
          jobs.map((work, index) =>
            index === postIndex ? { ...formData } : work
          )
        )
      : updateJobPost(dispatch, [...jobs, { ...formData }]);

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
        className="mb-3"
        label="Job Title"
        value={formData.jobTitle}
        setValue={handleInputChange("jobTitle", jobTitle)}
        error={formErrors.jobTitle}
      />

      <RenderTextInput
        className="mb-3"
        label="Company"
        value={formData.company}
        setValue={handleInputChange("company", company)}
        error={formErrors.company}
      />

      <RenderTextInput
        className="mb-3"
        label="Location"
        value={formData.location}
        setValue={handleInputChange("location", location)}
        error={formErrors.location}
      />

      <RenderTextInput
        className="mb-3"
        label="Country"
        value={formData.country}
        setValue={handleInputChange("country", country)}
        error={formErrors.country}
      />

      <SingleSelectorModal
        className="mb-3"
        data={categories}
        title="Category"
        value={formData.category}
        setValue={handleInputChange("category", category)}
      />

      <SkillModal
        className="mb-3"
        value={formData.skills}
        setValue={handleInputChange("skills", skills)}
      />

      <SingleSelectorModal
        className="mb-3"
        data={experienceLevels}
        title="Experience Required"
        value={formData.experienceRequired}
        setValue={handleInputChange("experienceRequired", experienceRequired)}
      />

      <SingleSelectorModal
        className="mb-3"
        data={employmentTypes}
        title="Job Type"
        value={formData.jobType}
        setValue={handleInputChange("jobType", jobType)}
      />

      <RenderTextInput
        className="mb-3"
        label="Description"
        value={formData.description}
        setValue={handleInputChange("description", description)}
        error={false}
        multiline
      />

      <TouchableOpacity
        onPress={() => saveWorkExperience()}
        className=" self-end w-32 h-12 flex justify-center items-center rounded-lg"
        style={{ backgroundColor: Colors.primary }}
      >
        <GaramondText className=" text-center text-white text-lg">
          Post
        </GaramondText>
      </TouchableOpacity>
    </PickerModalContainer>
  );
};

export default workExpModal;
