import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";
import moment from "moment";
import React, { memo, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Modal from "react-native-modal";

import RenderTextInput from "../RenderTextInput";

import check from "@/assets/images/checkWhite.png";
import pen from "@/assets/images/pen.png";
import trash from "@/assets/images/trash.png";

import SingleSelectorModal from "../SingleSelectorModal";
import SkillModal from "./SkillModal";

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
  jobsStatus,
}) => {
  const dispatch = useDispatch();
  const employerID = useSelector((state) => state?.user.userInfo)?._id;
  const jobs = useSelector((state) => state.user.jobPosts)?.filter(
    (job) => job.status === jobsStatus
  );

  const [id, setId] = useState(null);

  const [jobTitle, setJobTitle] = useState("Software Engineer");
  const [company, setCompany] = useState("TechCo");
  const [location, setLocation] = useState("San Francisco");
  const [country, setCountry] = useState("United States");
  const [category, setCategory] = useState("Information Technology");
  const [skills, setSkills] = useState(["JavaScript", "React", "Node"]);
  const [experienceRequired, setExperienceRequired] = useState("3-4 years");
  const [jobType, setJobType] = useState("Full-Time");
  const [description, setDescription] = useState(
    "We are looking for a skilled Software Engineer to join our dynamic team..."
  );

  const [jobTitleError, setJobTitleError] = useState(false);
  const [companyError, setCompanyError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const translateCategoryToEnglish = (arabicCategory) => {
    const categoryTranslations = {
      تكنولوجيا: "Technology",
      "الرعاىة الصحية": "Healthcare",
      تمويل: "Finance",
      تعليم: "Education",
      تسويق: "Marketing",
      مبيعات: "Sales",
      تصميم: "Design",
      هندسة: "Engineering",
      "خدمة الزبائن": "Customer Service",
      "الموارد البشرية": "Human Resources",
      إداري: "Administrative",
      قانوني: "Legal",
      كتابة: "Writing",
      فن: "Art",
      ترفيه: "Entertainment",
      علوم: "Science",
      "بيع بالتجزئة": "Retail",
      "خدمة الطعام": "Food Service",
      بناء: "Construction",
      مواصلات: "Transportation",
      "خدمات اجتماعية": "Social Services",
      تصنيع: "Manufacturing",
      وسائط: "Media",
      بحث: "Research",
      بنيان: "Architecture",
      البيئية: "Environmental",
      ضيافة: "Hospitality",
      العقارات: "Real Estate",
      زراعة: "Agriculture",
      "لياقة بدنية": "Fitness",
      موضة: "Fashion",
      السيارات: "Automotive",
      آخر: "Other",
    };

    return categoryTranslations[arabicCategory] || arabicCategory;
  };

  const translateExperienceToEnglish = (arabicCategory) => {
    const experienceTranslations = {
      "لا تجربة": "No Experience",
      "1-2 سنوات": "1-2 years",
      "3-4 سنوات": "3-4 years",
      "5+ سنوات": "5+ years",
    };

    return experienceTranslations[arabicCategory] || arabicCategory;
  };

  const translateTypeToEnglish = (arabicCategory) => {
    const typeTranslations = {
      "دوام كامل": "Full-Time",
      "دوام جزئي": "Part-Time",
      عقد: "Contract",
    };

    return typeTranslations[arabicCategory] || arabicCategory;
  };

  const translateCategoryToArabic = (englishCategory) => {
    const categoryTranslations = {
      Technology: "تكنولوجيا",
      Healthcare: "الرعاية الصحية",
      Finance: "تمويل",
      Education: "تعليم",
      Marketing: "تسويق",
      Sales: "مبيعات",
      Design: "تصميم",
      Engineering: "هندسة",
      "Customer Service": "خدمة الزبائن",
      "Human Resources": "الموارد البشرية",
      Administrative: "إداري",
      Legal: "قانوني",
      Writing: "كتابة",
      Art: "فن",
      Entertainment: "ترفيه",
      Science: "علوم",
      Retail: "بيع بالتجزئة",
      "Food Service": "خدمة الطعام",
      Construction: "بناء",
      Transportation: "مواصلات",
      "Social Services": "خدمات اجتماعية",
      Manufacturing: "تصنيع",
      Media: "وسائط",
      Research: "بحث",
      Architecture: "بنيان",
      Environmental: "البيئية",
      Hospitality: "ضيافة",
      "Real Estate": "العقارات",
      Agriculture: "زراعة",
      Fitness: "لياقة بدنية",
      Fashion: "موضة",
      Automotive: "السيارات",
      Other: "آخر",
    };

    return categoryTranslations[englishCategory] || englishCategory;
  };

  const translateExperienceToArabic = (englishCategory) => {
    const experienceTranslations = {
      "No Experience": "لا تجربة",
      "1-2 years": "1-2 سنوات",
      "3-4 years": "3-4 سنوات",
      "5+ years": "5+ سنوات",
    };

    return experienceTranslations[englishCategory] || englishCategory;
  };

  const translateTypeToArabic = (englishCategory) => {
    const typeTranslations = {
      "Full-Time": "دوام كامل",
      "Part-Time": "دوام جزئي",
      Contract: "عقد",
    };

    return typeTranslations[englishCategory] || englishCategory;
  };

  const closeModal = () => {
    setBottomSheetVisible(false);
    setIsEditing(false);

    setJobTitle("");
    setCompany("");
    setLocation("");
    setCountry("");
    setCategory("");
    setSkills([]);
    setExperienceRequired("");
    setJobType("");
    setDescription("");
  };

  const saveWorkExperience = () => {
    const categoryEN = translateCategoryToEnglish(category);
    const experienceRequiredEN =
      translateExperienceToEnglish(experienceRequired);
    const jobTypeEN = translateTypeToEnglish(jobType);

    let error = false;

    if (jobTitle.trim() === "") {
      setJobTitleError(true);
      error = true;
    }
    if (company.trim() === "") {
      setCompanyError(true);
      error = true;
    }
    if (location.trim() === "") {
      setLocationError(true);
      error = true;
    }
    if (country.trim() === "") {
      setCountryError(true);
      error = true;
    }
    if (category.trim() === "") {
      setCategoryError(true);
      error = true;
    }

    if (!error) {
      isEditing
        ? updateJobPost(
            {
              jobTitle,
              company,
              location,
              country,
              category: categoryEN,
              skills,
              experienceRequired: experienceRequiredEN,
              jobType: jobTypeEN,
              description,
              date: new Date(),
              employer_id: employerID,
              status: "pending",
              _id: id,
            },
            dispatch
          )
        : createJobPost(
            {
              jobTitle,
              company,
              location,
              country,
              category: categoryEN,
              skills,
              experienceRequired: experienceRequiredEN,
              jobType: jobTypeEN,
              description,
              date: new Date(),
              employer_id: employerID,
              status: "pending",
            },
            dispatch
          );

      closeModal();
    }
  };

  const categories = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Marketing",
    "Sales",
    "Design",
    "Engineering",
    "Customer Service",
    "Human Resources",
    "Administrative",
    "Legal",
    "Writing",
    "Art",
    "Entertainment",
    "Science",
    "Retail",
    "Food Service",
    "Construction",
    "Transportation",
    "Social Services",
    "Manufacturing",
    "Media",
    "Research",
    "Architecture",
    "Environmental",
    "Hospitality",
    "Real Estate",
    "Agriculture",
    "Fitness",
    "Fashion",
    "Automotive",
    "Other",
  ];

  const CheckMarkForm = ({ value, setValue, conditional }) => {
    return (
      <View className="flex flex-row  items-center mb-4">
        <TouchableOpacity
          onPress={() => {
            setValue(conditional);
          }}
          className={`h-8 w-8 p-2 rounded-lg mr-3 ${
            value === conditional
              ? `bg-[${Colors.primary}]`
              : "bg-white border-[1px]"
          }`}
        >
          {value === conditional && (
            <Image source={check} className="w-full h-full" />
          )}
        </TouchableOpacity>

        <GaramondText className="text-lg ">{conditional}</GaramondText>
      </View>
    );
  };

  const EditBtn = ({ index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setIsEditing(true);

          setJobTitle(jobs[index].jobTitle);
          setCompany(jobs[index].company);
          setLocation(jobs[index].location);
          setCountry(jobs[index].country);
          setCategory(jobs[index].category);
          setSkills(jobs[index].skills);
          setExperienceRequired(jobs[index].experienceRequired);
          setJobType(jobs[index].jobType);
          setDescription(jobs[index].description);

          setId(jobs[index]._id);

          setBottomSheetVisible(true);
        }}
        className="border-[1px] border-gray-400 rounded-full p-[6px] mr-2"
      >
        <Image source={pen} className="w-5 h-5 aspect-square" />
      </TouchableOpacity>
    );
  };

  const DelteBtn = ({ index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          deletePost(jobs[index]._id, dispatch);
        }}
        className="border-[1px] border-gray-400 rounded-full p-[6px]"
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
                navigation.navigate("UserJobPostDetails", { itemId: job?._id });
                fetchEmployeesByJobId(job?._id, dispatch);
              }}
              key={index}
              className="flex justify-center w-full border-[1px] rounded-2xl p-5 mb-4 h-64"
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
                  {translateExperienceToArabic(job?.experienceRequired)}
                </GaramondText>
                <GaramondText className=" text-[15px] ">
                  {translateTypeToArabic(job?.jobType)}
                </GaramondText>
              </View>

              <GaramondText className=" text-[15px] opacity-50 leading-6">
                {job?.description?.substring(0, 200)}
              </GaramondText>
            </TouchableOpacity>
          ))}
      </View>

      <Modal
        isVisible={isBottomSheetVisible}
        animationInTiming={700}
        className=" m-0 mt-10 rounded-t-xl"
      >
        <View className="flex-1 justify-center bg-white">
          <View
            className={`mb-5 w-full flex flex-row px-5 justify-between items-center ${
              isBottomSheetVisible && "border-b-[1px]"
            }`}
          >
            <GaramondText className=" text-3xl font-garamond">
              {isEditing ? Edit : "Post a Job"}
            </GaramondText>

            <TouchableOpacity onPress={() => closeModal()}>
              <GaramondText className=" text-5xl font-garamond-bold">
                ×
              </GaramondText>
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "center",
            }}
            className=""
          >
            <View className="w-[90%] flex-1">
              <View className="mb-5">
                <RenderTextInput
                  isMultiline={false}
                  title="Job Title *"
                  value={jobTitle}
                  setValue={setJobTitle}
                  placeholder="Ex: Accountant"
                  isError={jobTitleError}
                  setIsError={setJobTitleError}
                  errorMessage="This field can not be empty"
                />
              </View>
              <View className="mb-5">
                <RenderTextInput
                  isMultiline={false}
                  title="Company *"
                  value={company}
                  setValue={setCompany}
                  placeholder="Ex: Amazon"
                  isError={companyError}
                  setIsError={setCategoryError}
                  errorMessage="This field can not be empty"
                />
              </View>
              <View className="mb-5">
                <RenderTextInput
                  isMultiline={false}
                  title="Location *"
                  value={location}
                  setValue={setLocation}
                  placeholder="Ex: Beirut"
                  isError={locationError}
                  setIsError={setLocationError}
                  errorMessage="This field can not be empty"
                />
              </View>
              <View className="mb-5">
                <RenderTextInput
                  isMultiline={false}
                  title="Country *"
                  value={country}
                  setValue={setCountry}
                  placeholder="Ex: Lebanon"
                  isError={countryError}
                  setIsError={setCountryError}
                  errorMessage="This field can not be empty"
                />
              </View>

              <View className="mb-5">
                <SingleSelectorModal
                  title="Category *"
                  data={categories}
                  value={category}
                  setValue={setCategory}
                  isError={categoryError}
                  setIsError={setCategoryError}
                  errorMessage="This field can not be empty"
                />
              </View>

              <View className="mb-5">
                <GaramondText className="text-[20px] mb-2">Skills</GaramondText>

                <SkillModal value={skills} setValue={setSkills} />
              </View>

              <View className="mb-5">
                <GaramondText className="text-[20px] mb-2">
                  Job Experience
                </GaramondText>

                <View>
                  {
                    <CheckMarkForm
                      value={experienceRequired}
                      setValue={setExperienceRequired}
                      conditional="No Experience"
                    />
                  }

                  {
                    <CheckMarkForm
                      value={experienceRequired}
                      setValue={setExperienceRequired}
                      conditional="1-2 years"
                    />
                  }

                  {
                    <CheckMarkForm
                      value={experienceRequired}
                      setValue={setExperienceRequired}
                      conditional="3-4 years"
                    />
                  }

                  {
                    <CheckMarkForm
                      value={experienceRequired}
                      setValue={setExperienceRequired}
                      conditional="5+ years"
                    />
                  }
                </View>
              </View>

              <View className="mb-5">
                <GaramondText className="text-[20px] mb-2">
                  Job Type
                </GaramondText>

                <View>
                  {
                    <CheckMarkForm
                      value={jobType}
                      setValue={setJobType}
                      conditional="Full-Time"
                    />
                  }

                  {
                    <CheckMarkForm
                      value={jobType}
                      setValue={setJobType}
                      conditional="Part-Time"
                    />
                  }

                  {
                    <CheckMarkForm
                      value={jobType}
                      setValue={setJobType}
                      conditional="Contract"
                    />
                  }
                </View>
              </View>

              <View className="mb-5">
                <RenderTextInput
                  isMultiline={true}
                  title="Description"
                  value={description}
                  setValue={setDescription}
                  placeholder="Ex: I count money"
                />
              </View>

              <View className="w-full flex justify-center items-end mb-8">
                <TouchableOpacity
                  onPress={() => saveWorkExperience()}
                  className={`w-32 bottom-0 right-0 bg-[${Colors.primary}] rounded-xl px-10 py-2`}
                >
                  <GaramondText className="text-lg fontW-garamond text-white">
                    {isEditing ? Edit : "Post"}
                  </GaramondText>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default memo(PostJobModal);
