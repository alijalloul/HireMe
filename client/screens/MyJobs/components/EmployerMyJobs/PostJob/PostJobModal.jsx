import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";
import moment from "moment";
import React, { memo, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  Modal,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import RenderTextInput from "@/components/RenderTextInput";

import check from "@/assets/images/checkWhite.png";
import pen from "@/assets/images/pen.png";
import trash from "@/assets/images/trash.png";

import SingleSelectorModal from "@/components/SingleSelectorModal";
import SkillModal from "./_components/SkillModal";

import CheckMarkForm from "./_components/CheckMarkForm";

import {
  categories,
  experienceLevels,
  employmentTypes,
} from "@/constants/JobData";

import {
  createJobPost,
  deletePost,
  fetchEmployeesByJobId,
  updateJobPost,
} from "@/redux/User";

const PostJobModal = ({
  isBottomSheetVisible,
  setBottomSheetVisible,
  navigation,
}) => {
  const dispatch = useDispatch();
  const employerId = useSelector((state) => state?.user.userInfo)?.id;
  const jobs = useSelector((state) => state.user.jobPosts);

  const [formData, setFormData] = useState({
    jobTitle: "UI/UX Designer",
    company: "Creative Studios",
    location: "London",
    country: "United Kingdom",
    category: "Design",
    skills: [
      "UI/UX Design",
      "Figma",
      "Adobe Creative Suite",
      "Prototyping",
      "Sketch",
    ],
    experienceRequired: "1-2 years",
    jobType: "Part-Time",
    description:
      "We are looking for a talented UI/UX Designer to create engaging and intuitive designs for web and mobile applications...",
  });

  const [id, setId] = useState(null);

  const [formErrors, setFormErrors] = useState({
    jobTitle: false,
    company: false,
    location: false,
    country: false,
    category: false,
  });

  const [isEditing, setIsEditing] = useState(false);

  const closeModal = () => {
    setBottomSheetVisible(false);
    setIsEditing(false);
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

  const saveWorkExperience = () => {
    let error = false;
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      const value = formData[key];

      if (!Array.isArray(value)) {
        if (value.trim() === "") {
          newErrors[key] = true;
          error = true;
        } else {
          newErrors[key] = false;
        }
      }
    });

    setFormErrors(newErrors);

    if (!error) {
      const jobData = {
        ...formData,
        employerId,
        status: "pending",
      };

      if (isEditing) {
        updateJobPost(jobData, dispatch);
      } else {
        createJobPost(jobData, dispatch);
      }

      closeModal();
    }
  };

  const EditBtn = ({ index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setIsEditing(true);
          setFormData({
            jobTitle: jobs[index].jobTitle,
            company: jobs[index].company,
            location: jobs[index].location,
            country: jobs[index].country,
            category: jobs[index].category,
            skills: jobs[index].skills,
            experienceRequired: jobs[index].experienceRequired,
            jobType: jobs[index].jobType,
            description: jobs[index].description,
          });
          setId(jobs[index].id);
          setBottomSheetVisible(true);
        }}
        className="border border-gray-400 rounded-full p-[6px] mr-2"
      >
        <Image source={pen} className="w-5 h-5 aspect-square" />
      </TouchableOpacity>
    );
  };

  const DelteBtn = ({ index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          deletePost(jobs[index].id, dispatch);
        }}
        className="border border-gray-400 rounded-full p-[6px]"
      >
        <Image source={trash} className="w-5 h-5 aspect-square" />
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 w-[90%]">
      <View
        className={`flex-1 justify-center items-center ${
          jobs?.length > 0 && "hidden"
        }`}
      >
        <GaramondText className="mb-5 text-lg opacity-60">
          You Have Not Posted Any Job Yet.
        </GaramondText>
      </View>
      <View>
        {jobs?.length > 0 &&
          jobs?.map((job, index) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("UserJobPostDetails", { itemId: job?.id });
                fetchEmployeesByJobId(job?.id, dispatch);
              }}
              key={index}
              className="flex justify-center w-full border rounded-2xl p-5 mb-4 h-64"
            >
              <View className="flex flex-row justify-between items-center">
                <GaramondText className=" text-3xl">
                  {job?.jobTitle}
                </GaramondText>

                <View className="flex flex-row justify-end items-center">
                  {<EditBtn index={index} />}
                  {<DelteBtn index={index} />}
                </View>
              </View>

              <GaramondText className=" text-[12px] opacity-50 mb-5">
                {moment(job?.date).fromNow()}
              </GaramondText>

              <View className="mb-3 flex flex-row justify-between">
                <GaramondText className=" text-[15px] ">
                  {job?.country}
                </GaramondText>
                <GaramondText className=" text-[15px] ">
                  {job?.location}
                </GaramondText>
              </View>

              <View className="mb-3 flex flex-row justify-between">
                <GaramondText className=" text-[15px] ">
                  {job?.experienceRequired}
                </GaramondText>
                <GaramondText className=" text-[15px] ">
                  {job?.jobType}
                </GaramondText>
              </View>

              <GaramondText className=" text-[15px] opacity-50 leading-6">
                {job?.description?.substring(0, 200)}
              </GaramondText>
            </TouchableOpacity>
          ))}
      </View>

      <Modal
        visible={isBottomSheetVisible}
        animationType="slide"
        transparent={true}
      >
        <View className="flex-1 justify-center bg-white py-5">
          <View
            className={`mb-5 w-full flex flex-row px-5 justify-between items-center ${
              isBottomSheetVisible && "border-b-[1px]"
            }`}
          >
            <GaramondText className=" text-3xl ">
              {isEditing ? "Edit" : "Post a Job"}
            </GaramondText>

            <TouchableOpacity onPress={() => closeModal()}>
              <GaramondText className=" text-4xl font-garamond-semibold font-garamond-bold">
                ×
              </GaramondText>
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={{
              alignItems: "center",

              justifyContent: "center",
            }}
          >
            <View className="w-[90%] ">
              <RenderTextInput
                className="mb-3"
                label="Job Title"
                value={formData.jobTitle}
                onChangeText={(text) =>
                  setFormData({ ...formData, jobTitle: text })
                }
                error={formErrors.jobTitle}
              />

              <RenderTextInput
                className="mb-3"
                label="Company"
                value={formData.company}
                onChangeText={(text) =>
                  setFormData({ ...formData, company: text })
                }
                error={formErrors.company}
              />

              <RenderTextInput
                className="mb-3"
                label="Location"
                value={formData.location}
                onChangeText={(text) =>
                  setFormData({ ...formData, location: text })
                }
                error={formErrors.location}
              />

              <RenderTextInput
                className="mb-3"
                label="Country"
                value={formData.country}
                onChangeText={(text) =>
                  setFormData({ ...formData, country: text })
                }
                error={formErrors.country}
              />

              <SingleSelectorModal
                className="mb-3"
                data={categories}
                title="Category"
                value={formData.category}
                setValue={(value) =>
                  setFormData({ ...formData, category: value })
                }
              />

              <SkillModal
                className="mb-3"
                value={formData.skills}
                setValue={(skills) => setFormData({ ...formData, skills })}
              />

              <SingleSelectorModal
                className="mb-3"
                data={experienceLevels}
                title="Experience Required"
                value={formData.experienceRequired}
                setValue={(value) =>
                  setFormData({ ...formData, experienceRequired: value })
                }
              />

              <SingleSelectorModal
                className="mb-3"
                data={employmentTypes}
                title="Job Type"
                value={formData.jobType}
                setValue={(value) =>
                  setFormData({ ...formData, jobType: value })
                }
              />

              <RenderTextInput
                className="mb-3"
                label="Description"
                value={formData.description}
                onChangeText={(text) =>
                  setFormData({ ...formData, description: text })
                }
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
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default memo(PostJobModal);
