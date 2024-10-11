import GaramondText from "@/components/GaramondText";
import React, { memo, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  View,
} from "react-native";

import downVector from "@/assets/images/downVector.png";

const SingleSelectorModal = ({ className, title, value, setValue, data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [search, setSearch] = useState("");

  const filteredData = data?.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View className={className}>
      {title && <GaramondText className="text-xl mb-2 ">{title}</GaramondText>}

      <View className="w-full">
        <TouchableOpacity
          onPress={() => {
            setIsVisible(true);
          }}
          className="border p-2 w-full rounded-lg flex flex-row justify-between items-center"
        >
          <GaramondText className="text-xl">
            {value ? value : "_ _ _"}
          </GaramondText>
          <Image source={downVector} className=" w-5 aspect-[2/1]" />
        </TouchableOpacity>
      </View>
      <Modal visible={isVisible} animationType="slide">
        <View className=" flex-1 justify-center bg-white">
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
              className=" text-3xl w-[90%]"
              placeholder="Search"
            ></TextInput>

            <TouchableOpacity
              onPress={() => {
                setIsVisible(false);
                setSearch("");
              }}
            >
              <GaramondText className=" text-4xl  font-garamond-bold">
                ×
              </GaramondText>
            </TouchableOpacity>
          </View>

          <FlatList
            data={filteredData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) =>
              renderList({ item, setValue, setIsVisible, setSearch })
            }
            className="w-[90%] self-center"
          />
        </View>
      </Modal>
    </View>
  );
};

export default SingleSelectorModal;

const renderList = ({ item, setValue, setIsVisible, setSearch }) => {
  return (
    <View className="flex flex-row justify-start items-center mb-4 ">
      <TouchableOpacity
        onPress={() => {
          setValue(item);
          setIsVisible(false);
          setSearch("");
        }}
        className="flex justify-start items-start w-full pb-4  border-b"
      >
        <GaramondText className="text-2xl">{item}</GaramondText>
      </TouchableOpacity>
    </View>
  );
};
