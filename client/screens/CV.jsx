import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";
import * as DocumentPicker from "expo-document-picker";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import CustomeBackHeader from "@/components/Header/CustomBackHeader";
import Spinner from "@/components/Spinner";
import { editUser, updateUser } from "@/redux/User";

const CV = ({ navigation }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.userInfo);
  const pending = useSelector((state) => state.user.pending);

  const [pdf, setPdf] = useState(null);
  const [pdfName, setPdfName] = useState("");

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (result.canceled === false) {
        if (result.size > 1024 * 1024) {
          alert("Selected PDF exceeds the size limit of 1MB.");
          return;
        }

        setPdfName(result.assets[0].name);

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

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CustomeBackHeader navigation={navigation} screenName="onBoarding" />
      ),
    });
  }, []);

  return (
    <View className="flex-1 justify-center bg-white">
      <View
        className={`${
          pending
            ? "absolute z-30 w-full h-full justify-center items-center"
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
      <View className="bg-white flex-1 items-center">
        <View className="w-[90%] h-full">
          <GaramondText className=" text-5xl mb-5">
            How would you like to introduce yourself?
          </GaramondText>
          <GaramondText className=" text-[20px] mb-5">
            It is important to express your education, previous work experience
            and skills to your potential employer as clearly as possible, as
            this will set you on the top of your competition.
          </GaramondText>

          <View className=" mb-5 felx justify-center items-center">
            <TouchableOpacity
              onPress={() => {
                pickDocument();
              }}
              className={`bg-white border-[1px] border-[${Colors.primary}] w-full py-3 rounded-3xl flex justify-center items-center mb-2`}
            >
              <GaramondText
                className={`text-[${Colors.primary}] font-garamond-bold text-xl`}
              >
                Upload your CV
              </GaramondText>
            </TouchableOpacity>

            <View
              className={`w-full px-2 flex flex-row justify-between items-center ${
                !pdfName && "hidden"
              }`}
            >
              <GaramondText className="font-garamond">{pdfName}</GaramondText>

              <TouchableOpacity
                onPress={() => {
                  setPdf("");
                  setPdfName("");
                }}
                className="border-red-500 border-[1px] rounded-2xl p-2"
              >
                <GaramondText className=" text-red-500">Remove</GaramondText>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              pdf
                ? editUser(
                    { ...user, pdf: pdf },
                    "contactInfo",
                    navigation,
                    dispatch
                  )
                : navigation.navigate("contactInfo");
            }}
            className={`bg-white border-[1px] w-full py-3 rounded-3xl flex justify-center items-center border-[${Colors.primary}] opacity-1`}
          >
            <GaramondText
              className={` font-garamond-bold text-xl text-[${Colors.primary}]`}
            >
              Fill it out manually
            </GaramondText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              updateUser(
                {
                  name: user.name,
                  telephone: user.telephone,
                  type: user.accountType,
                  pushToken: user.pushToken,
                  id: user.id,
                  pdf: pdf,
                },
                navigation,
                dispatch
              );
            }}
            className={` border-[1px] w-full py-3 rounded-3xl flex justify-center items-center absolute bottom-0 mb-10 ${
              pdf
                ? `border-[${Colors.primary}] opacity-1`
                : "border-black opacity-50"
            }`}
          >
            <GaramondText
              className={`text-black font-garamond-bold text-xl  ${
                pdf ? `text-[${Colors.primary}]` : "border-black"
              }`}
            >
              {pdf ? Next : "Skip"}
            </GaramondText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CV;
