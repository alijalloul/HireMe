import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";
import React, { memo, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

import RenderTextInput from "../RenderTextInput";
import SingleSelectorModal from "../SingleSelectorModal";

import pen from "@/assets/images/pen.png";
import trash from "@/assets/images/trash.png";

const WorkExperiencePicker = ({
  headerSize,
  headerText,
  workExperience,
  setWorkExperience,
}) => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [endYear, setEndYear] = useState("");
  const [description, setDescription] = useState("");

  const [titleError, setTitleError] = useState(false);
  const [companyError, setCompanyError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [countryError, setCountryError] = useState(false);

  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [workIndex, setWorkIndex] = useState(null);

  const closeModal = () => {
    setBottomSheetVisible(false);
    setIsEditing(false);

    setTitle("");
    setCompany("");
    setLocation("");
    setCountry("");
    setStartMonth("");
    setStartYear("");
    setEndMonth("");
    setEndYear("");
    setDescription("");
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setWorkIndex(index);
    setTitle(workExperience[index].title);
    setCompany(workExperience[index].company);
    setLocation(workExperience[index].location);
    setCountry(workExperience[index].country);
    setStartMonth(workExperience[index].startMonth);
    setStartYear(workExperience[index].startYear);
    setEndMonth(workExperience[index].endMonth);
    setEndYear(workExperience[index].endYear);
    setDescription(workExperience[index].description);
    setBottomSheetVisible(true);
  };

  const saveWorkExperience = () => {
    let error = false;

    if (title.trim() === "") {
      setTitleError(true);
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

    if (!error) {
      const updatedWorkExperience = isEditing
        ? workExperience.map((work, index) =>
            index === workIndex
              ? {
                  title,
                  company,
                  location,
                  country,
                  startMonth,
                  startYear,
                  endMonth,
                  endYear,
                  description,
                }
              : work
          )
        : [
            ...workExperience,
            {
              title,
              company,
              location,
              country,
              startMonth,
              startYear,
              endMonth,
              endYear,
              description,
            },
          ];

      setWorkExperience(updatedWorkExperience);
      closeModal();
    }
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const startYearN = 1990;
  const endYearN = 2023;
  const years = Array.from({ length: endYearN - startYearN + 1 }, (_, index) =>
    (endYearN - index).toString()
  );

  return (
    <View className="flex-1 w-full">
      <View className="flex-1 w-full self-center">
        <GaramondText
          style={{ fontSize: headerSize }}
          className="font-garamond-semibold mb-5"
        >
          {headerText}
        </GaramondText>
        <View>
          {workExperience.length > 0 &&
            workExperience.map((work, index) => (
              <View
                key={index}
                className="relative w-full border-[1px] rounded-2xl p-5 pt-3 pr-3 mb-4 minh-60"
              >
                <View className="w-full flex flex-row justify-between items-center">
                  <View className="w-[80%]">
                    <GaramondText className="text-3xl">
                      {work.title}
                    </GaramondText>
                  </View>

                  <View className="self-start w-[20%] flex flex-row justify-center items-center">
                    <TouchableOpacity
                      onPress={() => {
                        handleEdit(index);
                      }}
                      className="border-[1px] border-gray-400 rounded-full p-[6px] mr-2"
                    >
                      <Image source={pen} className="w-5 h-5 aspect-square" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setWorkExperience(
                          workExperience?.filter(
                            (item, index2) => index2 !== index
                          )
                        );
                      }}
                      className="border-[1px] border-gray-400 rounded-full p-[6px]"
                    >
                      <Image source={trash} className="w-5 h-5 aspect-square" />
                    </TouchableOpacity>
                  </View>
                </View>
                <GaramondText className="text-xl">{work.company}</GaramondText>
                <View className="w-full flex my-4">
                  <GaramondText className="text-[15px]">
                    {work.country},{work.location}
                  </GaramondText>
                  <GaramondText className="text-[15px]">
                    {work.startMonth} {work.startYear} - {work.endMonth}{" "}
                    {work.endYear}
                  </GaramondText>
                </View>
                <GaramondText className="text-lg opacity-70">
                  {work.description}
                </GaramondText>
              </View>
            ))}
          <TouchableOpacity
            onPress={() => {
              setBottomSheetVisible(true);
            }}
            className={`bg-white border-[1px] border-[${Colors.primary}] w-full py-3 rounded-3xl flex justify-center items-center mb-5`}
          >
            <GaramondText
              className={`text-[${Colors.primary}] font-garamond-bold text-xl`}
            >
              + Add experience
            </GaramondText>
          </TouchableOpacity>
        </View>
        <Modal
          isVisible={isBottomSheetVisible}
          animationInTiming={700}
          className="m-0 mt-10 rounded-t-xl"
        >
          <View className="flex-1 justify-center bg-white">
            <View
              className={`mb-5 w-full flex flex-row px-5 justify-between items-center ${
                isBottomSheetVisible && "border-b-[1px]"
              }`}
            >
              <GaramondText className="text-3xl font-garamond">
                {isEditing ? "Edit" : "Add Work Experience"}
              </GaramondText>

              <TouchableOpacity onPress={() => closeModal()}>
                <GaramondText className="text-5xl font-garamond-bold">
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
              <View className="w-[90%] flex-1">
                <View className="mb-5">
                  <RenderTextInput
                    isMultiline={false}
                    title={`Title *`}
                    value={title}
                    setValue={setTitle}
                    placeholder="Ex: Accountant"
                    isError={titleError}
                    setIsError={setTitleError}
                    errorMessage="This field can not be empty"
                  />
                </View>
                <View className="mb-5">
                  <RenderTextInput
                    isMultiline={false}
                    title={`Company *`}
                    value={company}
                    setValue={setCompany}
                    placeholder="Ex: Amazon"
                    isError={companyError}
                    setIsError={setCompanyError}
                    errorMessage="This field can not be empty"
                  />
                </View>
                <View className="mb-5">
                  <RenderTextInput
                    isMultiline={false}
                    title={`Location *`}
                    value={location}
                    setValue={setLocation}
                    placeholder="Ex: San Francisco"
                    isError={locationError}
                    setIsError={setLocationError}
                    errorMessage="This field can not be empty"
                  />
                </View>
                <View className="mb-5">
                  <RenderTextInput
                    isMultiline={false}
                    title={`Country *`}
                    value={country}
                    setValue={setCountry}
                    placeholder="Ex: USA"
                    isError={countryError}
                    setIsError={setCountryError}
                    errorMessage="This field can not be empty"
                  />
                </View>
                <View className="flex flex-row justify-between w-full mb-5">
                  <SingleSelectorModal
                    title={`Start Month`}
                    selectedValue={startMonth}
                    setSelectedValue={setStartMonth}
                    options={months}
                  />
                  <SingleSelectorModal
                    title={`Start Year`}
                    selectedValue={startYear}
                    setSelectedValue={setStartYear}
                    options={years}
                  />
                </View>
                <View className="flex flex-row justify-between w-full mb-5">
                  <SingleSelectorModal
                    title={`End Month`}
                    selectedValue={endMonth}
                    setSelectedValue={setEndMonth}
                    options={months}
                  />
                  <SingleSelectorModal
                    title={`End Year`}
                    selectedValue={endYear}
                    setSelectedValue={setEndYear}
                    options={years}
                  />
                </View>
                <View className="mb-5">
                  <RenderTextInput
                    isMultiline={true}
                    title={`Description`}
                    value={description}
                    setValue={setDescription}
                    placeholder="Describe your responsibilities"
                  />
                </View>
              </View>
            </ScrollView>

            <TouchableOpacity
              onPress={() => {
                saveWorkExperience();
              }}
              className="bg-[#FE6F07] py-3 rounded-3xl m-5"
            >
              <GaramondText className="text-white font-garamond-bold text-center text-xl">
                {isEditing ? "Save Changes" : "Save"}
              </GaramondText>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default memo(WorkExperiencePicker);
