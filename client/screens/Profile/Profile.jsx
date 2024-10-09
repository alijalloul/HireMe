import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUser } from "@/redux/User";
import Spinner from "@/components/Spinner";
import EmployeeProfile from "./components/EmployeeProfile";
import EmployerProfile from "./components/EmployerProfile";

const Profile = ({ navigation }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  const pending = useSelector((state) => state.user.pending);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    image: "",
    profession: "",
    introduction: "",
    workExperience: [],
    education: [],
    languageArr: [],
  });

  useEffect(() => {
    if (isFocused && user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        address: user.address || "",
        image: user.image || "",
        profession: user.profession || "",
        introduction: user.introduction || "",
        workExperience: user.workExperience || [],
        education: user.education || [],
        languageArr: user.language || [],
      });
    }
  }, [user, isFocused]);

  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  return (
    <View className="flex-1 justify-center bg-white">
      {pending && (
        <>
          <View className="absolute w-full h-full justify-center items-center">
            <Spinner />
          </View>
          <View className="bg-white z-20 absolute h-full w-full opacity-50"></View>
        </>
      )}

      <ScrollView
        contentContainerStyle={{ alignItems: "center", minHeight: 692 }}
      >
        {user?.accountType === "employee" ? (
          <EmployeeProfile
            formData={formData}
            handleInputChange={handleInputChange}
          />
        ) : (
          <EmployerProfile
            formData={formData}
            handleInputChange={handleInputChange}
          />
        )}

        <View className="w-[90%] justify-center">
          <View className="flex justify-center items-center my-10">
            <TouchableOpacity
              onPress={() => {
                logout(navigation, dispatch);
              }}
              className="w-full h-12 flex justify-center items-center bottom-0 right-0 bg-white border-[1px] rounded-xl mb-2"
              style={{ borderColor: Colors.primary }}
            >
              <GaramondText
                className="text-lg"
                style={{ color: Colors.primary }}
              >
                Log Out
              </GaramondText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                updateUser(
                  {
                    ...formData,
                    id: user.id,
                    type: user.accountType,
                  },
                  navigation,
                  dispatch
                );
              }}
              className="w-full h-12 flex justify-center items-center bottom-0 right-0 rounded-xl mb-8"
              style={{ backgroundColor: Colors.primary }}
            >
              <GaramondText className="text-lg text-white">Save</GaramondText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
