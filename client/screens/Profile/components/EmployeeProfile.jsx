import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";

import { Image, TouchableOpacity, View } from "react-native";

import EducationPicker from "@/components/Picker/EducationPicker/EducationPicker";
import LanguagePicker from "@/components/Picker/LanguagePicker/LanguagePicker";
import WorkExperiencePicker from "@/components/Picker/WorkExperiencePicker/WorkExperiencePicker";
import IntroductionPicker from "@/screens/Profile/components/IntroductionPicker";
import TextInputEditor from "@/screens/Profile/components/TextInputEditor";
import UploadImage from "@/components/UploadImage";

import blobTop from "@/assets/images/blobTop.png";

const EmployeeProfile = ({ formData, handleInputChange }) => {
  return (
    <View className="flex-1 items-center w-full">
      <View className="absolute -top-72  opacity-90">
        <Image source={blobTop} />
      </View>

      <View className="my-8 w-full">
        <TextInputEditor
          textSize={35}
          textColor={"white"}
          value={name}
          setValue={setName}
          placeholder="Full Name"
        />
      </View>

      <UploadImage
        width={250}
        isButton={false}
        image={image}
        setImage={setImage}
      />

      <TextInputEditor
        textSize={25}
        textColor={"black"}
        value={profession}
        setValue={setProfession}
        placeholder="Professional Title"
      />

      <View className="w-[90%]">
        <View className=" my-8">
          <IntroductionPicker
            introduction={introduction}
            setIntroduction={setIntroduction}
            placeholder="Introduction"
          />
        </View>

        <View className="w-full my-5 flex-1">
          <WorkExperiencePicker
            headerSize={25}
            headerText="Work Experience"
            workExperience={workExperience}
            setWorkExperience={setWorkExperience}
          />
        </View>

        <View className="w-full my-5 flex-1">
          <EducationPicker
            headerSize={25}
            headerText="Education"
            education={education}
            setEducation={setEducation}
          />
        </View>

        <View className="w-full my-5 flex-1">
          <LanguagePicker
            headerSize={25}
            headerText="Languages"
            language={language}
            setLanguageArr={setLanguageArr}
          />
        </View>

        <View className=" my-5 flex-1">
          <GaramondText className=" font-garamond-semibold text-2xl">
            Contact Information
          </GaramondText>

          <View className="">
            <View className=" opacity-50 flex flex-row justify-start items-center border-y-[1px] py-4 px-2">
              <GaramondText className=" ">Telephone:</GaramondText>
              <GaramondText className=" ">{user?.telephone}</GaramondText>
            </View>
            <View className=" flex flex-row justify-start items-center border-y-[1px] py-4 px-2 my-[1px]">
              <GaramondText className=" ">E-Mail:</GaramondText>
              <TextInputEditor
                textSize={15}
                textColor="black"
                value={email}
                setValue={setEmail}
                placeholder="N/A"
              />
            </View>
            <View className="flex flex-row justify-start items-center border-b-[1px] py-4 px-2">
              <GaramondText className=" ">Address:</GaramondText>
              <TextInputEditor
                textSize={15}
                textColor="black"
                value={address}
                setValue={setAddress}
                placeholder="N/A"
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EmployeeProfile;
