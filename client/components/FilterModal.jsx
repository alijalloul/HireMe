import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";
import React, { memo, useState } from "react";
import {
  I18nManager,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";

import Modal from "react-native-modal";

import RenderTextInput from "./RenderTextInput";

import check from "@/assets/images/checkWhite.png";

import { fetchPosts, fetchPostsByFilter } from "@/redux/JobPost";
import SkillModal from "./PostJob/SkillModal";
import SingleSelectorModal from "./SingleSelectorModal";

const translateText = (englishText, arabicText) => {
  return I18nManager.isRTL ? arabicText : englishText;
};

const FilterModal = ({
  bottomSheetVisible,
  setBottomSheetVisible,
  page,
  setNumberOfFilters,
}) => {
  const dispatch = useDispatch();

  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [skills, setSkills] = useState([]);
  const [experienceRequired, setExperienceRequired] = useState("");
  const [jobType, setJobType] = useState("");

  const closeModal = () => {
    setBottomSheetVisible(false);

    setCompany("");
    setLocation("");
    setCountry("");
    setCategory("");
    setSkills([]);
    setExperienceRequired("");
    setJobType("");
  };

  const saveWorkExperience = () => {
    let counter = 0;
    if (company.trim() !== "") {
      counter++;
    }
    if (location.trim() !== "") {
      counter++;
    }
    if (country.trim() !== "") {
      counter++;
    }
    if (category.trim() !== "") {
      counter++;
    }
    if (skills.length > 0) {
      counter++;
    }
    if (experienceRequired.trim() !== "") {
      counter++;
    }
    if (jobType.trim() !== "") {
      counter++;
    }

    setNumberOfFilters(counter);
    fetchPostsByFilter(
      company,
      location,
      country,
      category,
      skills,
      experienceRequired,
      jobType,
      page,
      dispatch
    );
    setBottomSheetVisible(false);
  };

  const clear = () => {
    setNumberOfFilters(0);
    fetchPosts(page, dispatch);

    closeModal();
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

        <GaramondText className="text-lg ">
          {translateText(conditional, conditional)}
        </GaramondText>
      </View>
    );
  };

  return (
    <View className="flex-1 w-[90%]">
      <Modal
        isVisible={bottomSheetVisible}
        animationInTiming={700}
        className=" m-0 mt-10 rounded-t-xl"
      >
        <View className="flex-1 justify-center bg-white">
          <View
            className={`mb-5 w-full flex flex-row px-5 justify-between items-center ${
              bottomSheetVisible && "border-b-[1px]"
            }`}
          >
            <GaramondText className=" text-3xl font-garamond">
              {translateText("Filter", "تصفية")}
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
                  title={translateText("Company", "الشركة")}
                  value={company}
                  setValue={setCompany}
                  placeholder={translateText("Ex: Amazon", "مثال: أمازون")}
                />
              </View>
              <View className="mb-5">
                <RenderTextInput
                  isMultiline={false}
                  title={translateText("Location", "الموقع")}
                  value={location}
                  setValue={setLocation}
                  placeholder={translateText("Ex: Beirut", "مثال: بيروت")}
                />
              </View>
              <View className="mb-5">
                <RenderTextInput
                  isMultiline={false}
                  title={translateText("Country", "البلد")}
                  value={country}
                  setValue={setCountry}
                  placeholder={translateText("Ex: Lebanon", "مثال: لبنان")}
                />
              </View>

              <View className="mb-5">
                <SingleSelectorModal
                  title={translateText("Category", "الفئة")}
                  data={categories}
                  value={category}
                  setValue={setCategory}
                />
              </View>

              <View className="mb-5">
                <GaramondText className="text-[20px] mb-2">
                  {translateText("Skills", "المهارات")}
                </GaramondText>

                <SkillModal value={skills} setValue={setSkills} />
              </View>

              <View className="mb-5">
                <GaramondText className="text-[20px] mb-2">
                  {translateText("Job Experience", "خبرة العمل")}
                </GaramondText>

                <View>
                  {
                    <CheckMarkForm
                      value={experienceRequired}
                      setValue={setExperienceRequired}
                      conditional={translateText("No Experience", "بدون خبرة")}
                    />
                  }

                  {
                    <CheckMarkForm
                      value={experienceRequired}
                      setValue={setExperienceRequired}
                      conditional={translateText("1-2 years", "1-2 سنوات")}
                    />
                  }

                  {
                    <CheckMarkForm
                      value={experienceRequired}
                      setValue={setExperienceRequired}
                      conditional={translateText("3-4 years", "3-4 سنوات")}
                    />
                  }

                  {
                    <CheckMarkForm
                      value={experienceRequired}
                      setValue={setExperienceRequired}
                      conditional={translateText("5+ years", "5+ سنوات")}
                    />
                  }
                </View>
              </View>

              <View className="mb-5">
                <GaramondText className="text-[20px] mb-2">
                  {translateText("Job Type", "نوع الوظيفة")}
                </GaramondText>

                <View>
                  {
                    <CheckMarkForm
                      value={jobType}
                      setValue={setJobType}
                      conditional={translateText("Full-Time", "وقت كامل")}
                    />
                  }

                  {
                    <CheckMarkForm
                      value={jobType}
                      setValue={setJobType}
                      conditional={translateText("Part-Time", "وقت جزئي")}
                    />
                  }

                  {
                    <CheckMarkForm
                      value={jobType}
                      setValue={setJobType}
                      conditional={translateText("Contract", "عقد")}
                    />
                  }
                </View>
              </View>

              <View className="w-full flex-row justify-between items-end mb-8">
                <TouchableOpacity
                  onPress={() => clear()}
                  className="flex justify-center items-center w-32 bottom-0 right-0 border-[1px] border-[#FE6F07] bg-white rounded-xl py-2"
                >
                  <GaramondText className="text-lg fontW-garamond text-[#FE6F07]">
                    {translateText("Clear", "مسح")}
                  </GaramondText>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => saveWorkExperience()}
                  className="flex justify-center items-center w-32 bottom-0 right-0 bg-[#FE6F07] rounded-xl py-2"
                >
                  <GaramondText className="text-lg fontW-garamond text-white">
                    {translateText("Filter", "تصفية")}
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

export default memo(FilterModal);
