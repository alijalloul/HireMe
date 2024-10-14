import GaramondText from "@/components/GaramondText";
import React, { useEffect, useState } from "react";

import RenderTextInput from "@/components/RenderTextInput";
import SingleSelectorModal from "@/components/SingleSelectorModal";
import PickerModalContainer from "@/components/Picker/components/PickerModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { createJobPost, updateJobPost } from "@/redux/User";

import {
  categories,
  experienceLevels,
  employmentTypes,
} from "@/constants/JobData";
import SkillModal from "../../../../../components/SkillModal";
import { TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";

const PostJobModal = ({
  isBottomSheetVisible,
  setBottomSheetVisible,
  postIndex,
  setPostIndex,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userId = user.user.id;
  const jobs = user.jobPosts;

  const isPostIndexDef = postIndex !== null && postIndex !== undefined;

  const [formData, setFormData] = useState({
    jobTitle: "Software Engineer",
    company: "Tech Solutions Inc.",
    location: "Berlin",
    country: "Germany",
    category: "Information Technology",
    skills: ["JavaScript", "React", "Node.js"],
    experienceRequired: "3-5 years",
    jobType: "Full-Time",
    description:
      "We are looking for a Software Engineer to join our dynamic team. You will be responsible for developing high-quality software solutions.",
  });

  useEffect(() => {
    if (isPostIndexDef) {
      setFormData(jobs[postIndex]);
    }
  }, [postIndex]);

  const closeModal = () => {
    setBottomSheetVisible(false);
    setPostIndex(null);
    resetFormData();
  };

  const resetFormData = () => {
    setFormData({
      jobTitle: "",
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
          jobs
            .filter((job, index) => index === postIndex)
            .map((job) => ({ id: job.id, ...formData }))[0]
        )
      : createJobPost(dispatch, { employerId: userId, ...formData });

    closeModal();
  };

  return (
    <PickerModalContainer
      title="Work Experience"
      isBottomSheetVisible={isBottomSheetVisible}
      postIndex={postIndex}
      handleSave={handleSave}
      closeModal={closeModal}
      buttonText="Post"
    >
      <RenderTextInput
        className="mb-3"
        label="Job Title"
        value={formData.jobTitle}
        setValue={(value) => handleInputChange("jobTitle", value)}
      />

      <RenderTextInput
        className="mb-3"
        label="Company"
        value={formData.company}
        setValue={(value) => handleInputChange("company", value)}
      />

      <RenderTextInput
        className="mb-3"
        label="Location"
        value={formData.location}
        setValue={(value) => handleInputChange("location", value)}
      />

      <RenderTextInput
        className="mb-3"
        label="Country"
        value={formData.country}
        setValue={(value) => handleInputChange("country", value)}
      />

      <SingleSelectorModal
        className="mb-3"
        data={categories}
        title="Category"
        value={formData.category}
        setValue={(value) => handleInputChange("category", value)}
      />

      <SkillModal
        className="mb-3"
        value={formData.skills}
        setValue={(value) => handleInputChange("skills", value)}
      />

      <SingleSelectorModal
        className="mb-3"
        data={experienceLevels}
        title="Experience Required"
        value={formData.experienceRequired}
        setValue={(value) => handleInputChange("experienceRequired", value)}
      />

      <SingleSelectorModal
        className="mb-3"
        data={employmentTypes}
        title="Job Type"
        value={formData.jobType}
        setValue={(value) => handleInputChange("jobType", value)}
      />

      <RenderTextInput
        className="mb-3"
        label="Description"
        value={formData.description}
        setValue={(value) => handleInputChange("description", value)}
        error={false}
        multiline
      />
    </PickerModalContainer>
  );
};

export default PostJobModal;
