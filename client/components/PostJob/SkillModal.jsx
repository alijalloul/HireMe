import { Colors } from '@/constants/Colors'
import GaramondText from "@/components/GaramondText";
import React, { memo, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";

import downVector from "@/assets/images/downVector.png";

const SkillModal = ({ value, setValue }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [search, setSearch] = useState("");

  const [skills, setSkills] = useState(value);

  const data = [
    // Software Development
    "JavaScript",
    "React",
    "Angular",
    "Vue",
    "Node",
    "Python",
    "Java",
    "C++",
    "C#",
    "Ruby",
    "PHP",
    "HTML",
    "CSS",
    "Git",
    "Redux",
    "Webpack",
    "REST",
    "GraphQL",
    "MongoDB",
    "PostgreSQL",

    // Data Analysis & Database
    "SQL",
    "Data Mining",
    "Data Visualization",
    "Tableau",
    "Power BI",
    "Excel",
    "Pandas",
    "NumPy",
    "Matplotlib",
    "D3",
    "NoSQL",
    "ETL",

    // Machine Learning & AI
    "Machine Learning",
    "Deep Learning",
    "TensorFlow",
    "PyTorch",
    "NLP",
    "Computer Vision",
    "Natural Language Processing",
    "Reinforcement Learning",

    // DevOps & Cloud
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "Google Cloud",
    "CI/CD",
    "Jenkins",
    "Ansible",
    "Terraform",

    // Project Management
    "Agile",
    "Scrum",
    "Kanban",
    "JIRA",
    "Asana",
    "Trello",
    "Project Planning",
    "Resource Management",

    // Design & Creativity
    "UI/UX Design",
    "Adobe Creative Suite",
    "Photoshop",
    "Illustrator",
    "Sketch",
    "Figma",
    "InDesign",
    "Prototyping",

    // Marketing & SEO
    "Digital Marketing",
    "SEO",
    "Content Marketing",
    "Social Media Management",
    "Google Analytics",
    "SEM",
    "Email Marketing",
    "PPC",

    // Communication
    "Communication Skills",
    "Presentation",
    "Negotiation",
    "Active Listening",
    "Public Speaking",
    "Interpersonal Skills",

    // Sales & Customer Service
    "Salesforce",
    "Cold Calling",
    "Relationship Management",
    "Customer Support",
    "CRM",
    "Upselling",

    // Financial & Business
    "Financial Analysis",
    "Budgeting",
    "Business Strategy",
    "Market Research",
    "Accounting",
    "Entrepreneurship",
    "Risk Management",

    // Writing & Editing
    "Content Writing",
    "Copywriting",
    "Editing",
    "Proofreading",
    "Technical Writing",
    "Blogging",

    // Languages
    "Foreign Languages",
    "Translation",
    "Interpretation",
    "Linguistics",
    "Language Teaching",
  ];

  const filteredSkills =
    search !== ""
      ? data?.filter((item) =>
          item.toLowerCase().includes(search.toLowerCase())
        )
      : [];

  return (
    <View className="flex justify-between w-full">
      <View className="flex flex-row flex-wrap">
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <TouchableOpacity
              onPress={() => {
                setIsVisible(true);
              }}
              className="inline-block px-2 py-2 rounded-2xl mr-2 mb-2 bg-[#ff8d3c]"
              key={index.toString()}
            >
              <GaramondText className="text-white">{skill}</GaramondText>
            </TouchableOpacity>
          ))
        ) : (
          <TouchableOpacity
            onPress={() => {
              setIsVisible(true);
            }}
            className="border-[1px] p-2 w-full rounded-lg flex flex-row justify-between items-center"
          >
            <GaramondText className="text-[20px] font-garamond">
              _ _ _
            </GaramondText>
            <Image source={downVector} className="w-5 aspect-[2/1]" />
          </TouchableOpacity>
        )}
      </View>

      <Modal
        isVisible={isVisible}
        animationInTiming={700}
        className="m-0 mt-10 rounded-t-xl"
      >
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
              placeholder="بحث"
            ></TextInput>

            <TouchableOpacity
              onPress={() => {
                setIsVisible(false);
                setSearch("");
              }}
            >
              <GaramondText className="text-5xl font-garamond-bold">
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
              {skills.length > 0 ? (
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
                  ابحث للعثور على مهارات
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

            <View className="flex-1 justify-end items-end">
              <TouchableOpacity
                onPress={() => {
                  setValue(skills);
                  setSkills([]);
                  setIsVisible(false);
                }}
                className={`w-32 h-12 flex justify-center items-center mr-3 mb-3 bg-[${Colors.primary}] rounded-xl`}
              >
                <GaramondText className="text-lg text-white">حفظ</GaramondText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default memo(SkillModal);
