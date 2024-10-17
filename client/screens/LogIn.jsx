import GaramondText from "@/components/GaramondText";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

import RenderTextInput from "@/components/RenderTextInput";
import SpinnerScrollbar from "@/components/SpinnerScrollbar";
import { login } from "@/redux/User";

const LogIn = ({ navigation }) => {
  const dispatch = useDispatch();

  const [errorType, setErrorType] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    if (errorType === "User doesn't exist") {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (errorType === "Invalid password") {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [errorType]);
  const handleLogIn = async () => {
    if (email === "") {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (password === "") {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if (password !== "" && email !== "") {
      await login(
        dispatch,
        {
          email: email,
          password: password,
        },
        navigation
      );
    }
  };

  return (
    <SpinnerScrollbar>
      <View className="w-[90%] flex-1 my-10 flex flex-col justify-between">
        <GaramondText
          className="text-4xl font-garamond-semibold "
          style={{ color: Colors.primary }}
        >
          Welcome Back
        </GaramondText>

        <View className="w-full">
          <RenderTextInput
            className="mb-4"
            isMultiline={false}
            value={email}
            setValue={setEmail}
            placeholder="E-Mail"
            isError={emailError}
            setIsError={setEmailError}
            errorMessage={errorType === "User doesn't exist"}
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
            errorMessage={errorType === "Invalid password"}
          />

          <View className="w-full flex justify-end items-end">
            <TouchableOpacity className=" opacity-60">
              <GaramondText className=" border-b">Forgot Password</GaramondText>
            </TouchableOpacity>
          </View>
        </View>

        <View className="w-full">
          <TouchableOpacity
            onPress={() => {
              handleLogIn();
            }}
            className=" w-full py-3 rounded-3xl flex justify-center items-center "
            style={{ backgroundColor: Colors.primary }}
          >
            <GaramondText className="text-white font-garamond-bold text-xl">
              Log In
            </GaramondText>
          </TouchableOpacity>

          <View className=" relative flex justify-center items-center w-full my-2">
            <GaramondText className="text-opacity-50 bg-white px-1 py-1 z-10">
              or
            </GaramondText>
            <View className="opacity-50 absolute w-full border-b "></View>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("signUp");
            }}
            className="bg-white border border-gray-400 w-full py-3 rounded-3xl flex justify-center items-center"
          >
            <GaramondText className=" font-garamond-bold text-xl">
              Sign Up
            </GaramondText>
          </TouchableOpacity>
        </View>
      </View>
    </SpinnerScrollbar>
  );
};

export default LogIn;
