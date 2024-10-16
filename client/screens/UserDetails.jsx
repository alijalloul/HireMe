import GaramondText from "@/components/GaramondText";
import { Colors } from "@/constants/Colors";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import blobTop from "@/assets/images/blobTop.png";
import EducationDisplayer from "@/components/Picker/EducationPicker/components/EducationDisplayer";
import LanguageDisplayer from "@/components/Picker/LanguagePicker/components/LanguageDisplayer";
import WorkExperienceDisplayer from "@/components/Picker/WorkExperiencePicker/components/WorkExperienceDisplayer";
import { fetchUser, hireEmployee } from "@/redux/User";
import { useEffect, useState } from "react";

const UserDetails = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const { userId } = route.params;
  const jobPostId = useSelector((state) => state.user?.jobPostId);
  const [user, setUser] = useState(null);

  const handleHire = () => {
    hireEmployee(dispatch, jobPostId, userId, navigation);
  };

  useEffect(() => {
    async function getUser() {
      const res = await fetchUser(dispatch, userId);

      setUser(res);
    }

    getUser();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: "center",
      }}
    >
      <View className="flex-1 items-center w-full">
        <View className="absolute -translate-y-1/2 opacity-90">
          <Image source={blobTop} />
        </View>

        <GaramondText className="text-white text-4xl">
          {user?.name}
        </GaramondText>

        <View
          style={{ width: 250 }}
          className="aspect-square bg-[#efefef] relative rounded-full overflow-hidden mb-2"
        >
          {user?.image && (
            <Image source={{ uri: user.image }} className="w-full h-full" />
          )}
        </View>

        <GaramondText className="text-center text-xl ">
          {user?.profession}
        </GaramondText>

        <View className="w-[90%] gap-y-5 ">
          <View className="">
            <GaramondText className="font-garamond-semibold text-2xl">
              Introduction
            </GaramondText>

            <GaramondText className="opacity-70 text-xl ">
              {user?.introduction ? user.introduction : "..."}
            </GaramondText>
          </View>

          <GaramondText className="font-garamond-semibold text-2xl">
            Contact Information
          </GaramondText>

          <View>
            <View className="w-full flex flex-row justify-start items-center border-y border-gray-500 py-3 px-2 ">
              <GaramondText className="">E-Mail:</GaramondText>

              <GaramondText className="flex-1 text-lg">
                {user?.email}
              </GaramondText>
            </View>

            <View className="w-full flex flex-row justify-start items-center border-b border-gray-500 py-3 px-2 ">
              <GaramondText className="">Address:</GaramondText>

              <GaramondText className="flex-1 text-lg">
                {user?.address}
              </GaramondText>
            </View>
          </View>

          <WorkExperienceDisplayer
            workExperience={user?.workExperience}
            headerText="Work Experience"
            isView={true}
          />

          <EducationDisplayer
            education={user?.education}
            headerText="Education"
            isView={true}
          />

          <LanguageDisplayer
            language={user?.language}
            headerText="Languge"
            isView={true}
          />

          <TouchableOpacity
            onPress={() => {
              handleHire();
            }}
            className=" w-full h-14 rounded-lg justify-center items-center mb-5"
            style={{ backgroundColor: Colors.primary }}
          >
            <GaramondText className="text-lg text-white">Hire</GaramondText>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default UserDetails;
