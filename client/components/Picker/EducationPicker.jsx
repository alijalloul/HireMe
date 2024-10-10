import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";
import React, { memo, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

import pen from "@/assets/images/pen.png";
import trash from "@/assets/images/trash.png";

import RenderTextInput from "../RenderTextInput";
import SingleSelectorModal from "../SingleSelectorModal";

const EducationPicker = ({
  headerText,
  headerSize,
  education,
  setEducation,
}) => {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [isEditing, setEditing] = useState(false);

  const [degree, setDegree] = useState("");
  const [major, setMajor] = useState("");
  const [school, setSchool] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [note, setNote] = useState("");

  const [degreeError, setDegreeError] = useState("");
  const [majorError, setMajorError] = useState("");
  const [schoolError, setSchoolError] = useState("");

  const [educationIndex, setEducationIndex] = useState(null);

  const closeModal = () => {
    setBottomSheetVisible(false);
    setEditing(false);

    if (isEditing) {
      setDegree("");
      setMajor("");
      setSchool("");
      setStartYear("");
      setEndYear("");
      setNote("");
    }
  };

  const saveEducation = () => {
    let error = false;

    if (degree.trim() === "") {
      setDegreeError(true);
      error = true;
    }
    if (major.trim() === "") {
      setMajorError(true);
      error = true;
    }
    if (school.trim() === "") {
      setSchoolError(true);
      error = true;
    }

    if (!error) {
      const updatedEducation = isEditing
        ? education.map((item, index) =>
            index === educationIndex
              ? {
                  degree,
                  major,
                  school,
                  startYear,
                  endYear,
                  note,
                }
              : item
          )
        : [
            ...education,
            {
              degree,
              major,
              school,
              startYear,
              endYear,
              note,
            },
          ];

      setEducation(updatedEducation);
      closeModal();
    }
  };

  const handleEdit = (index) => {
    setEditing(true);
    setEducationIndex(index);

    setDegree(education[index].degree);
    setMajor(education[index].major);
    setSchool(education[index].school);
    setStartYear(education[index].startYear);
    setEndYear(education[index].endYear);
    setNote(education[index].note);

    setBottomSheetVisible(true);
  };

  const degrees = [
    "Bachelor of Science (BS)",
    "Master of Science (MS)",
    "Doctor of Philosophy (PHD)",
    "Bachelor of Technology (BTech)",
    "High School Diploma",
  ];

  const majors = [
    "Computer Science",
    "Mechanical Engineering",
    "Psychology",
    "Biology",
    "Business Administration",
    "Economics",
    "English Literature",
    "History",
    "Chemistry",
    "Mathematics",
    "Political Science",
    "Sociology",
    "Physics",
    "Art and Design",
    "Environmental Science",
    "Nursing",
    "Marketing",
    "Accounting",
    "Civil Engineering",
    "Architecture",
    "Music",
    "Education",
    "Communications",
    "Graphic Design",
    "Philosophy",
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
          {education?.length > 0 &&
            education?.map((educ, index) => (
              <View
                key={index}
                className="relative w-full border-[1px] rounded-2xl p-5 pt-3 pr-3 mb-4 h-60"
              >
                <View className="w-full flex flex-row justify-between items-center">
                  <View className="w-[80%]">
                    <GaramondText className="text-3xl">
                      {educ.degree.split("(")[0].trim()}
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
                        setEducation(
                          education?.filter((item, index2) => index2 !== index)
                        );
                      }}
                      className="border-[1px] border-gray-400 rounded-full p-[6px]"
                    >
                      <Image source={trash} className="w-5 h-5 aspect-square" />
                    </TouchableOpacity>
                  </View>
                </View>

                {educ.major && (
                  <GaramondText className="text-[15px]">
                    in
                    <GaramondText className="text-xl">
                      {educ.major}
                    </GaramondText>
                    from
                  </GaramondText>
                )}
                <View className="w-full flex flex-row justify-between items-center mb-4">
                  <GaramondText className="text-lg">{educ.school}</GaramondText>
                  <GaramondText className="text-[15px] opacity-70 mb-3">
                    {educ.startYear} -{educ.endYear}
                  </GaramondText>
                </View>
                <GaramondText className="text-lg opacity-70">
                  {educ.note}
                </GaramondText>
              </View>
            ))}
        </View>

        <TouchableOpacity
          onPress={() => {
            setBottomSheetVisible(true);
          }}
          className={`bg-white border-[1px] border-[${Colors.primary}] w-full py-3 rounded-3xl flex justify-center items-center mb-5`}
        >
          <GaramondText
            className={`text-[${Colors.primary}] font-garamond-bold text-xl`}
          >
            + Add education
          </GaramondText>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={isBottomSheetVisible}
        animationInTiming={700}
        className="m-0 mt-10"
      >
        <View className="flex-1 justify-center bg-white rounded-t-xl">
          <View
            className={`w-full flex flex-row px-5 justify-between items-center ${
              isBottomSheetVisible && "border-b-[1px]"
            }`}
          >
            <GaramondText className="text-3xl font-garamond">
              {isEditing ? Edit : "Add Education"}
            </GaramondText>

            <TouchableOpacity
              onPress={() => {
                closeModal();
              }}
            >
              <GaramondText className="text-5xl font-garamond-bold">
                ×
              </GaramondText>
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={{
              flexGrow: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
            className="mt-10"
          >
            <View className="w-[90%]">
              <View className="mb-5">
                <SingleSelectorModal
                  title="Degree *"
                  data={degrees}
                  value={degree}
                  setValue={setDegree}
                  isError={degreeError}
                  setIsError={setDegreeError}
                  errorMessage="This field can not be empty"
                />
              </View>

              <View className="mb-5">
                <SingleSelectorModal
                  title="Major *"
                  data={majors}
                  value={major}
                  setValue={setMajor}
                  isError={majorError}
                  setIsError={setMajorError}
                  errorMessage="This field can not be empty"
                />
              </View>

              <View className="mb-5">
                <RenderTextInput
                  isMultiline={false}
                  title="School *"
                  value={school}
                  setValue={setSchool}
                  placeholder="Ex: LU"
                  isError={schoolError}
                  setIsError={setSchoolError}
                  errorMessage="This field can not be empty"
                />
              </View>

              <View className="mb-5">
                <GaramondText className="text-[20px] mb-2">
                  Duration
                </GaramondText>
                <View className="flex flex-row justify-between items-center">
                  <View className="w-[45%]">
                    <SingleSelectorModal
                      data={years}
                      value={startYear}
                      setValue={setStartYear}
                    />
                  </View>

                  <View className="w-[45%]">
                    <SingleSelectorModal
                      data={years}
                      value={endYear}
                      setValue={setEndYear}
                    />
                  </View>
                </View>
              </View>

              <View className="mb-5">
                <RenderTextInput
                  isMultiline={true}
                  title="Add Note"
                  value={note}
                  handleChange={setNote}
                  placeholder="Ex: Minor in cyber security"
                />
              </View>

              <View className="w-full flex justify-center items-end mb-4">
                <TouchableOpacity
                  onPress={() => {
                    saveEducation();
                  }}
                  className={`w-32 bottom-0 right-0 bg-[${Colors.primary}] rounded-xl px-10 py-2`}
                >
                  <GaramondText className="text-lg text-white">
                    {isEditing ? Edit : "Add"}
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

export default memo(EducationPicker);
