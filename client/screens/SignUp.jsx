import React, { useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import blobright from "@/assets/images/blobright.png";
import key from "@/assets/images/key.png";
import { EmailSVG } from "@/assets/images/svgs"; // Replace with an appropriate email icon
import user from "@/assets/images/userBlack.png";

import { Colors } from "@/constants/Colors";

import GaramondText from "@/components/GaramondText";
import RenderTextInput from "@/components/RenderTextInput";
import Spinner from "@/components/Spinner";

import { editUser, sendotp, signup } from "@/redux/User";

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user.userInfo);
  const pending = useSelector((state) => state.user.pending);
  const [errorType, setErrorType] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  useEffect(() => {
    if (errorType) {
      setEmailError(true);
    }
  }, [errorType]);

  const handleSignUp = async () => {
    let error = false;

    if (name === "") {
      setNameError(true);
      error = true;
    }
    if (email === "") {
      setEmailErrorMessage("This field can not be empty");
      setEmailError(true);
      error = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailErrorMessage("Please enter a valid email address");
      setEmailError(true);
      error = true;
    }
    if (password === "") {
      setPasswordError(true);
      error = true;
    }

    if (!error) {
      await signup({ name, email, password }, navigation, dispatch);
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

        <View className=" w-[90%] flex flex-col justify-between">
          <View className="h-[30%]">
            <GaramondText className="text-5xl text-white">
              Create Account
            </GaramondText>
          </View>

          <View className="w-full ">
            <RenderTextInput
              className="mb-4"
              isNumpad={false}
              isMultiline={false}
              value={name}
              setValue={setName}
              placeholder="Full Name"
              isError={nameError}
              setIsError={setNameError}
              errorMessage="This field can not be empty"
            />

            <RenderTextInput
              className="mb-4"
              isNumpad={false}
              isMultiline={false}
              value={email}
              setValue={setEmail}
              placeholder="Email Address"
              isError={emailError}
              setIsError={setEmailError}
              errorMessage={emailErrorMessage}
            />

            <RenderTextInput
              className="mb-4"
              isNumpad={false}
              isMultiline={false}
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
                handleSignUp();
              }}
              className={`bg-[${Colors.primary}] w-full py-3 rounded-3xl flex justify-center items-center `}
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
