import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";
import React, { memo, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import SkillsData from "@/constants/Skills";

const SkillModal = ({ value, setValue, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [search, setSearch] = useState("");

  const [skills, setSkills] = useState(value);

  const filteredSkills =
    search !== ""
      ? SkillsData?.filter((item) =>
          item.toLowerCase().includes(search.toLowerCase())
        )
      : SkillsData;

  return (
    <View className={className}>
      <GaramondText className="text-xl mb-2">Skills</GaramondText>
      <View className="flex flex-row flex-wrap">
        {skills?.map((skill, index) => (
          <TouchableOpacity
            onPress={() => {
              setIsVisible(true);
            }}
            className="inline-block px-2 py-2 rounded-2xl mr-2 mb-2 bg-[#ff8d3c]"
            key={index.toString()}
          >
            <GaramondText className="text-white">{skill}</GaramondText>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          onPress={() => {
            setIsVisible(true);
          }}
          className="inline-block px-2 py-2 rounded-2xl mr-2 mb-2 border border-gray-300"
        >
          <GaramondText className="text-gray-300 ">+</GaramondText>
        </TouchableOpacity>
      </View>

      <Modal visible={isVisible} animationType="slide">
        <View className="flex-1 justify-center bg-white">
          <View
            className={`mb-5 w-full flex flex-row px-5 justify-between items-center ${
              isVisible && "border-b-[1px]"
            }`}
          >
            <TextInput
              value={search}
              onChangeText={(text) => {
                setSearch(text);
              }}
              className="text-3xl w-[90%]"
              placeholder="Search"
            ></TextInput>

            <TouchableOpacity
              onPress={() => {
                setValue(skills);
                setIsVisible(false);
                setSearch("");
              }}
            >
              <GaramondText className="text-4xl font-garamond-semibold">
                ×
              </GaramondText>
            </TouchableOpacity>
          </View>

          <ScrollView
            className="mx-5"
            contentContainerStyle={{
              flexGrow: 1,
            }}
          >
            <View className="flex flex-row flex-wrap border-b-[1px] mb-5 pb-5">
              {skills?.length > 0 ? (
                skills.map((skill, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSkills(skills?.filter((item) => item !== skill));
                    }}
                    className="inline-block px-2 py-2 rounded-2xl mr-2 mb-2 bg-[#ff8d3c]"
                    key={index.toString()}
                  >
                    <GaramondText className="text-white">{skill}</GaramondText>
                  </TouchableOpacity>
                ))
              ) : (
                <GaramondText className="opacity-60 text-xl">
                  Search to find skills
                </GaramondText>
              )}
            </View>

            <View className="flex flex-row flex-wrap ">
              {filteredSkills.map((skill, index) => (
                <TouchableOpacity
                  onPress={() => {
                    skills.includes(skill)
                      ? setSkills(skills?.filter((item) => item !== skill))
                      : setSkills([...skills, skill]);
                  }}
                  className={`inline-block px-2 py-2 bg-gray-200 rounded-2xl mr-2 mb-2 ${
                    skills.includes(skill) && "bg-[#ff8d3c]"
                  }`}
                  key={index.toString()}
                >
                  <GaramondText
                    className={`${skills.includes(skill) && "text-white"}`}
                  >
                    {skill}
                  </GaramondText>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default SkillModal;
