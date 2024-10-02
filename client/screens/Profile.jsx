import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";
import { useIsFocused } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { StorageAccessFramework } from "expo-file-system";
import * as Notifications from "expo-notifications";
import * as Updates from "expo-updates";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import EducationPicker from "@/components/Picker/EducationPicker";
import LanguagePicker from "@/components/Picker/LanguagePicker";
import WorkExperiencePicker from "@/components/Picker/WorkExperiencePicker";
import ContactInfoEditor from "@/components/Profile/ContactInfoEditor";
import IntroductionPicker from "@/components/Profile/IntroductionPicker";
import TextInputEditor from "@/components/Profile/TextInputEditor";
import UploadImage from "@/components/UploadImage";

import { editAppLanguage, logout, updateUser } from "@/redux/User";

import blobTop from "@/assets/images/blobTop.png";
import Spinner from "@/components/Spinner";

const Profile = ({ navigation }) => {
  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  const pending = useSelector((state) => state.user.pending);
  const appLanguage = useSelector((state) => state.user.appLanguage);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pdf, setPdf] = useState("");
  const [image, setImage] = useState("");
  const [profession, setProfession] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [workExperience, setWorkExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [languageArr, setLanguageArr] = useState([]);
  const [language, setLanguage] = useState(appLanguage);
  console.log(appLanguage, " : ", language);

  const reload = async () => {
    await Updates.reloadAsync();
  };

  useEffect(() => {
    if (language === "arabic") {
      I18nManager.forceRTL(true);
    } else {
      I18nManager.forceRTL(false);
    }

    if (!__DEV__) {
      reload();
    }
  }, [language]);

  useEffect(() => {
    if (isFocused) {
      user?.name && setName(user.name);
      user?.email && setEmail(user.email);
      user?.address && setAddress(user.address);
      user?.pdf && setPdf(user.pdf);
      user?.image && setImage(user.image);
      user?.profession && setProfession(user.profession);
      user?.introduction && setIntroduction(user.introduction);
      user?.workExperience && setWorkExperience(user.workExperience);
      user?.education && setEducation(user.education);
      user?.language && setLanguageArr(user.language);
    }
  }, [user, isFocused]);

  const downloadPDF = async (base64PDF) => {
    const base64Data = base64PDF.split(",")[1];

    try {
      await StorageAccessFramework.createFileAsync(
        "content://com.android.externalstorage.documents/tree/primary%3ADocuments",
        `${name}CV.pdf`,
        "application/pdf"
      )
        .then(async (uri) => {
          await FileSystem.writeAsStringAsync(uri, base64Data, {
            encoding: FileSystem.EncodingType.Base64,
          });

          await Notifications.scheduleNotificationAsync({
            content: {
              title: "File Downloaded Successfully",
              body: `${name}CV $has been downloaded successfully to Documents.`,
            },
            trigger: { seconds: 2 },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      throw new Error(e);
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (result.canceled === false) {
        if (result.assets[0].size > 1024 * 1024) {
          alert("Selected PDF exceeds the size limit of 1MB.");
          return;
        }

        try {
          const response = await fetch(result.assets[0].uri);
          const blob = await response.blob();
          const reader = new FileReader();

          const base64Data = await new Promise((resolve) => {
            reader.onloadend = () => {
              resolve(reader.result);
            };
            reader.readAsDataURL(blob);
          });
          setPdf(base64Data);
        } catch (error) {
          console.error("Error converting to base64:", error);
        }
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  const handlePDF = () => {
    if (pdf !== "") {
      downloadPDF(pdf);
    } else {
      pickDocument();
    }
  };

  const EmployerProfile = () => {
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

        <View className="w-[90%]">
          <View className=" my-5 flex-1">
            <GaramondText className=" font-garamond-semibold text-2xl">
              Contact Information
            </GaramondText>

            <View className="">
              <View className=" opacity-50 flex flex-row justify-start items-center border-y-[1px] py-4 px-2">
                <GaramondText className=" font-garamond">
                  Telephone:
                </GaramondText>
                <GaramondText className=" font-garamond">
                  {user?.telephone}
                </GaramondText>
              </View>
              <View className=" flex flex-row justify-start items-center border-y-[1px] py-4 px-2 my-[1px]">
                <GaramondText className=" font-garamond">E-Mail:</GaramondText>
                <ContactInfoEditor
                  textSize={15}
                  textColor="black"
                  value={email}
                  setValue={setEmail}
                  placeholder="N/A"
                />
              </View>
              <View className="flex flex-row justify-start items-center border-b-[1px] py-4 px-2">
                <GaramondText className=" font-garamond">Address:</GaramondText>
                <ContactInfoEditor
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

  const EmployeeProfile = () => {
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
              languageArr={languageArr}
              setLanguageArr={setLanguageArr}
            />
          </View>

          <View className=" my-5 flex-1">
            <GaramondText className=" font-garamond-semibold text-2xl">
              Contact Information
            </GaramondText>

            <View className="">
              <View className=" opacity-50 flex flex-row justify-start items-center border-y-[1px] py-4 px-2">
                <GaramondText className=" font-garamond">
                  Telephone:
                </GaramondText>
                <GaramondText className=" font-garamond">
                  {user?.telephone}
                </GaramondText>
              </View>
              <View className=" flex flex-row justify-start items-center border-y-[1px] py-4 px-2 my-[1px]">
                <GaramondText className=" font-garamond">E-Mail:</GaramondText>
                <ContactInfoEditor
                  textSize={15}
                  textColor="black"
                  value={email}
                  setValue={setEmail}
                  placeholder="N/A"
                />
              </View>
              <View className="flex flex-row justify-start items-center border-b-[1px] py-4 px-2">
                <GaramondText className=" font-garamond">Address:</GaramondText>
                <ContactInfoEditor
                  textSize={15}
                  textColor="black"
                  value={address}
                  setValue={setAddress}
                  placeholder="N/A"
                />
              </View>
            </View>
          </View>

          <View className="my-5">
            <GaramondText className=" font-garamond-semibold text-2xl mb-4">
              My CV
            </GaramondText>

            <View className="flex flex-row justify-between items-center">
              <TouchableOpacity
                onPress={() => {
                  handlePDF();
                }}
                className={`p-2 flex justify-center items-center rounded-xl mr-2 ${
                  pdf ? "bg-sky-300" : `bg-[${Colors.primary}]`
                }`}
              >
                <GaramondText className="text-lg text-white">
                  {pdf === "" ? "Upload PDF" : "Download PDF"}
                </GaramondText>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setPdf("");
                }}
                className={`${
                  pdf
                    ? " px-2 py-2 border-[1px] rounded-xl border-red-500 bg-white"
                    : "hidden"
                }`}
              >
                <GaramondText className=" text-[15px] text-red-500">
                  Remove
                </GaramondText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 justify-center bg-white">
      <View
        className={`${
          pending
            ? "absolute w-full h-full justify-center items-center"
            : "hidden"
        }`}
      >
        <Spinner />
      </View>
      <View
        className={`${
          pending
            ? " bg-white z-20 absolute h-full w-full opacity-50 "
            : "hidden"
        }`}
      ></View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        {user?.type === "employee" ? <EmployeeProfile /> : <EmployerProfile />}

        <View className="w-[90%] justify-center">
          <View className={` flex justify-center items-center my-10`}>
            <TouchableOpacity
              onPress={() => {
                logout(navigation, dispatch);
              }}
              className={`w-full h-12 flex justify-center items-center bottom-0 right-0 bg-white border-[1px] border-[${Colors.primary}] rounded-xl mb-2`}
            >
              <GaramondText className={`text-lg text-[${Colors.primary}]`}>
                Log Out
              </GaramondText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                updateUser(
                  {
                    name: name,
                    image: image,
                    profession: profession,
                    introduction: introduction,
                    workExperience: workExperience,
                    education: education,
                    language: languageArr,
                    email: email,
                    address: address,
                    pdf: pdf,
                    _id: user._id,
                    type: user.type,
                  },

                  navigation,
                  dispatch
                );

                appLanguage !== language &&
                  editAppLanguage(language, null, dispatch);
              }}
              className={`w-full h-12 flex justify-center items-center bottom-0 right-0 bg-[${Colors.primary}] rounded-xl  mb-8`}
            >
              <GaramondText className="text-lg text-white">Save</GaramondText>
            </TouchableOpacity>

            <View
              className={`w-full border-2 border-[${Colors.primary}] rounded-2xl flex-row justify-center items-center`}
            >
              <TouchableOpacity
                onPress={() => {
                  setLanguage("english");
                }}
                className={`${
                  language === "english"
                    ? `bg-[${Colors.primary}] `
                    : "bg-white"
                } rounded-xl  w-[50%] py-5  flex justify-center items-center `}
              >
                <GaramondText
                  className={`${
                    language === "english"
                      ? " text-white "
                      : `text-[${Colors.primary}]`
                  } font-garamond-bold text-xl`}
                >
                  English
                </GaramondText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setLanguage("arabic");
                }}
                className={`${
                  language === "arabic" ? `bg-[${Colors.primary}] ` : "bg-white"
                } rounded-xl  w-[50%] py-5  flex justify-center items-center`}
              >
                <GaramondText
                  className={`${
                    language === "arabic"
                      ? " text-white "
                      : `text-[${Colors.primary}]`
                  } font-garamond-bold text-xl`}
                >
                  عربي
                </GaramondText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
