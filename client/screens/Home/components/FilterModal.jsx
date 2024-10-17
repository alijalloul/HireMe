import GaramondText from "@/components/GaramondText";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { Image, Modal, ScrollView, TouchableOpacity, View } from "react-native";

import check from "@/assets/images/check.png";

import {
  categories,
  employmentTypes,
  experienceLevels,
} from "@/constants/JobData";

import RenderTextInput from "@/components/RenderTextInput";
import SingleSelectorModal from "@/components/SingleSelectorModal";
import SkillModal from "@/components/SkillModal";

const FilterModal = ({
  filters,
  setFilters,
  bottomSheetVisible,
  setBottomSheetVisible,
  setNumberOfFilters,
}) => {
  const [formData, setFormData] = useState(filters);

  const saveFilter = () => {
    let counter = 0;
    Object.values(formData).forEach((value) => {
      if (Array.isArray(value) ? value.length > 0 : value.trim() !== "") {
        counter++;
      }
    });

    setNumberOfFilters(counter);
    setFilters(formData);
    setBottomSheetVisible(false);
  };

  const clear = () => {
    const emptyFilters = {
      company: "",
      location: "",
      country: "",
      category: "",
      skills: [],
      experienceRequired: "",
      type: "",
    };

    setNumberOfFilters(0);
    setFilters(emptyFilters);
    setFormData(emptyFilters);
    setBottomSheetVisible(false);
  };

  return (
    <Modal visible={bottomSheetVisible} animationType="slide">
      <View className="flex-1 justify-center bg-white">
        <View
          className={`mb-5 w-full flex flex-row px-5 py-2 justify-between items-center ${
            bottomSheetVisible && "border-b"
          }`}
        >
          <GaramondText className=" text-3xl ">Filter</GaramondText>

          <TouchableOpacity
            onPress={() => {
              setBottomSheetVisible(false);
              setFormData(filters);
            }}
          >
            <GaramondText className=" text-4xl font-garamond-semibold">
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
          <View className="w-[90%] flex-1 gap-y-5">
            <RenderTextInput
              isMultiline={false}
              title="Company"
              value={formData.company}
              setValue={(value) =>
                setFormData((prev) => ({ ...prev, company: value }))
              }
              placeholder="Ex: Amazon"
            />
            <RenderTextInput
              isMultiline={false}
              title="Location"
              value={formData.location}
              setValue={(value) =>
                setFormData((prev) => ({ ...prev, location: value }))
              }
              placeholder="Ex: Beirut"
            />
            <RenderTextInput
              isMultiline={false}
              title="Country"
              value={formData.country}
              setValue={(value) =>
                setFormData((prev) => ({ ...prev, country: value }))
              }
              placeholder="Ex: Lebanon"
            />

            <SingleSelectorModal
              title="Category"
              data={categories}
              value={formData.category}
              setValue={(value) =>
                setFormData((prev) => ({ ...prev, category: value }))
              }
            />

            <SkillModal
              value={formData.skills}
              setValue={(value) =>
                setFormData((prev) => ({ ...prev, skills: value }))
              }
            />

            <View>
              <GaramondText className="text-xl mb-2">
                Job Experience
              </GaramondText>

              <View>
                {experienceLevels.map((experience) => (
                  <CheckMarkForm
                    key={experience}
                    value={formData.experienceRequired}
                    setValue={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        experienceRequired: value,
                      }))
                    }
                    conditional={experience}
                  />
                ))}
              </View>
            </View>

            <View>
              <GaramondText className="text-xl mb-2">Job Type</GaramondText>

              <View>
                {employmentTypes.map((type) => (
                  <CheckMarkForm
                    key={type}
                    value={formData.type}
                    setValue={(value) =>
                      setFormData((prev) => ({ ...prev, type: value }))
                    }
                    conditional={type}
                  />
                ))}
              </View>
            </View>

            <View className="w-full flex-row justify-between items-end mb-8">
              <TouchableOpacity
                onPress={clear}
                className="flex justify-center items-center w-32 bottom-0 right-0 border bg-white rounded-xl py-2"
                style={{ borderColor: Colors.primary }}
              >
                <GaramondText
                  className="text-lg fontW-garamond"
                  style={{ color: Colors.primary }}
                >
                  Clear
                </GaramondText>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={saveFilter}
                className="flex justify-center items-center w-32 bottom-0 right-0 rounded-xl py-2"
                style={{ backgroundColor: Colors.primary }}
              >
                <GaramondText className="text-lg fontW-garamond text-white">
                  Filter
                </GaramondText>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default FilterModal;

const CheckMarkForm = ({ value, setValue, conditional }) => {
  return (
    <View className="flex-1 flex flex-row items-center mb-4">
      <TouchableOpacity
        onPress={() => {
          setValue(value === conditional ? "" : conditional);
        }}
        className="h-8 w-8 p-2 rounded-lg mr-3 border"
        style={{
          backgroundColor: value === conditional ? Colors.primary : "white",
          borderColor: value === conditional ? Colors.primary : "black",
        }}
      >
        {value === conditional && (
          <Image source={check} className="w-full h-full" />
        )}
      </TouchableOpacity>

      <GaramondText className="text-lg">{conditional}</GaramondText>
    </View>
  );
};
