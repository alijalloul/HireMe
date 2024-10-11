import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import CustomeBackHeader from "@/components/Header/CustomBackHeader";
import RenderTextInput from "@/components/RenderTextInput";
import UploadImage from "@/components/UploadImage";
import { editUser, updateUser } from "@/redux/User";

const CV = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);

  const [image, setImage] = useState(user?.image || "");
  const [telephone, setTelephone] = useState(user?.telephone || "");
  const [address, setAddress] = useState(user?.address || "");

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CustomeBackHeader navigation={navigation} screenName="CV" />
      ),
    });
  }, []);

  return (
    <View className="bg-white flex-1 items-center">
      <View className="w-[90%] flex-1">
        <GaramondText className=" text-5xl mb-5">
          {user?.accountType === "employer"
            ? "First, tell the employee of how they would contact you."
            : "First, tell the employer of how they would contact you."}
        </GaramondText>

        <View
          className={`w-full flex justify-center items-center mb-2 ${
            user?.accountType !== "employer" && "hidden"
          }`}
        >
          <UploadImage
            width={150}
            isButton={true}
            image={image}
            setImage={setImage}
          />
        </View>

        <RenderTextInput
          isMultiline={false}
          title="Mobile Number"
          value={telephone}
          setValue={setTelephone}
          placeholder="Ex: +961 76 812 345"
        />

        <View className="my-2"></View>

        <RenderTextInput
          isMultiline={false}
          title="Address"
          value={address}
          setValue={setAddress}
          placeholder="Ex: Lebanon - Beirut - Hamera - Sadat St."
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          user?.accountType === "employee"
            ? editUser(
                {
                  ...user,
                  telephone: telephone,
                  address: address,
                },
                "introduction",
                navigation,
                dispatch
              )
            : updateUser(
                {
                  ...user,
                  image: image,
                  telephone: telephone,
                  address: address,
                },
                navigation,
                dispatch
              );
        }}
        className="self-end w-32 h-12 flex justify-center items-center mr-3 mb-3 rounded-xl"
        style={{ backgroundColor: Colors.primary }}
      >
        <GaramondText className="text-lg text-white">Next</GaramondText>
      </TouchableOpacity>
    </View>
  );
};

export default CV;
