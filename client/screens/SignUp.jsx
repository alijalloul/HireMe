import React, { useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import blobright from "@/assets/images/blobright.png";
import key from "@/assets/images/key.png";
import phone from "@/assets/images/phone.png";
import user from "@/assets/images/userBlack.png";

import { Colors } from "@/constants/Colors";

import GaramondText from "@/components/GaramondText";
import RenderTextInput from "@/components/RenderTextInput";
import Spinner from "@/components/Spinner";

import { editUser, sendotp } from "@/redux/User";

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user.userInfo);
  const pending = useSelector((state) => state.user.pending);
  const [errorType, setErrorType] = useState(null);

  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState(false);
  const [telephoneError, setTelephoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [telephoneErrorMessage, setTelephoneErrorMessage] = useState("");
  const [passwordErroMessager, setPasswordErrorMessage] = useState("");

  useEffect(() => {
    if (errorType) {
      setTelephoneError(true);
    }
  }, [errorType]);

  const handleNext = async () => {
    let error = false;

    if (name === "") {
      setNameError(true);
      error = true;
    }
    if (telephone === "") {
      setTelephoneErrorMessage("This field can not be empty");
      setTelephoneError(true);
      error = true;
    } else if (telephone.length < 8) {
      setTelephoneErrorMessage("Your phone number should be 8 characters long");
      setTelephoneError(true);
      error = true;
    }
    if (password === "") {
      setPasswordError(true);
      error = true;
    }

    if (!error) {
      await editUser(
        {
          ...userInfo,
          name: name,
          telephone: telephone,
          password: password,
        },
        null,
        null,
        dispatch
      );
      const res = await sendotp(telephone, navigation, dispatch);

      if (res) {
        setTelephoneErrorMessage(
          "This phone number is already in use, try loggin in"
        );
        setTelephoneError(true);
      }
    }
  };

  return (
    <View className="flex-1 justify-center bg-white">
      <View
        className={`${
          pending
            ? "z-30 absolute w-full h-full justify-center items-center"
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
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={blobright} className="absolute -left-12 -top-[310px] " />

        <View className=" w-[90%] ">
          <View className="border-2 py-24">
            <GaramondText className="text-5xl text-white">
              Create Account
            </GaramondText>
          </View>

          <View className="w-full ">
            <RenderTextInput
              className="mb-4"
              isNumpad={false}
              isMultiline={false}
              icon={user}
              value={name}
              setValue={setName}
              placeholder="Full Name"
              isError={nameError}
              setIsError={setNameError}
              errorMessage="This field can not be empty"
            />

            <RenderTextInput
              className="mb-4"
              isNumpad={true}
              isMultiline={false}
              icon={phone}
              value={telephone}
              setValue={setTelephone}
              placeholder="Phone Number"
              isError={telephoneError}
              setIsError={setTelephoneError}
              errorMessage={telephoneErrorMessage}
            />

            <RenderTextInput
              className="mb-4"
              isNumpad={false}
              isMultiline={false}
              icon={key}
              value={password}
              setValue={setPassword}
              placeholder="Password"
              isError={passwordError}
              setIsError={setPasswordError}
              errorMessage="This field can not be empty"
            />
          </View>

          <View className="w-full">
            <TouchableOpacity
              onPress={() => {
                handleNext();
              }}
              className={`bg-[${Colors.primary}] w-full py-3 rounded-3xl flex justify-center items-center`}
            >
              <GaramondText className="text-white font-garamond-bold text-xl">
                Sign Up
              </GaramondText>
            </TouchableOpacity>

            <View className=" relative flex justify-center items-center w-full my-4">
              <GaramondText className="text-opacity-50 bg-white px-1 py-1 z-10">
                or
              </GaramondText>
              <View className="opacity-50 absolute w-full border-b-[1px] "></View>
            </View>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("login");
              }}
              className="bg-white border-[1px] border-gray-400 w-full py-3 rounded-3xl flex justify-center items-center mb-2"
            >
              <GaramondText className=" font-garamond-bold text-xl">
                Log In
              </GaramondText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;
