import React, {
  useEffect,
  useState,
} from "react";
import {
  I18nManager,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import blobright from "@/assets/images/blobright.png";
import key from "@/assets/images/key.png";
import phone from "@/assets/images/phone.png";
import user from "@/assets/images/userBlack.png";

import RenderTextInput from "@/components/RenderTextInput";

import Spinner from "@/components/Spinner";
import { editUser, sendotp } from "@/redux/User";

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();

  const userInfo = useSelector(
    (state) => state.user.userInfo
  );
  const pending = useSelector(
    (state) => state.user.pending
  );
  const [errorType, setErrorType] =
    useState(null);

  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] =
    useState(false);
  const [telephoneError, setTelephoneError] =
    useState(false);
  const [passwordError, setPasswordError] =
    useState(false);

  const [
    telephoneErrorMessage,
    setTelephoneErrorMessage,
  ] = useState("");
  const [
    passwordErroMessager,
    setPasswordErrorMessage,
  ] = useState("");

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
      setTelephoneErrorMessage(
        translateText(
          "This field can not be empty",
          "هذا الحقل لا يمكن أن يكون فارغًا"
        )
      );
      setTelephoneError(true);
      error = true;
    } else if (telephone.length < 8) {
      setTelephoneErrorMessage(
        translateText(
          "Your phone number should be 8 characters long",
          " يجب أن يتكون رقم هاتفك من ٨ أحرف"
        )
      );
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
      const res = await sendotp(
        telephone,
        navigation,
        dispatch
      );

      if (res) {
        setTelephoneErrorMessage(
          translateText(
            "This phone number is already in use, try loggin in",
            "رقم الهاتف مستعمل"
          )
        );
        setTelephoneError(true);
      }
    }
  };

  const translateText = (
    englishText,
    arabicText
  ) => {
    return I18nManager.isRTL
      ? arabicText
      : englishText;
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
        className="flex-1 bg-white "
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={blobright}
          className="absolute -left-12 -top-[310px] "
        />

        <View className="flex-1 w-[90%]">
          <Text className="pl-5 pt-20 text-[40px] text-white font-garamond w-[50%]">
            {translateText(
              "Create Account",
              "إنشاء حساب"
            )}
          </Text>
          <View className=" mt-32">
            <View className="mb-10">
              <View className="mb-4">
                <RenderTextInput
                  isNumpad={false}
                  isMultiline={false}
                  icon={user}
                  value={name}
                  setValue={setName}
                  placeholder={translateText(
                    "Full Name",
                    "الاسم الكامل"
                  )}
                  isError={nameError}
                  setIsError={setNameError}
                  errorMessage={translateText(
                    "This field can not be empty",
                    "هذا الحقل لا يمكن أن يكون فارغًا"
                  )}
                  isArabic={
                    I18nManager.isRTL && true
                  }
                />
              </View>

              <View className="mb-4">
                <RenderTextInput
                  isNumpad={true}
                  isMultiline={false}
                  icon={phone}
                  value={telephone}
                  setValue={setTelephone}
                  placeholder={translateText(
                    "Phone Number",
                    "رقم الهاتف"
                  )}
                  isError={telephoneError}
                  setIsError={setTelephoneError}
                  errorMessage={
                    telephoneErrorMessage
                  }
                  isArabic={
                    I18nManager.isRTL && true
                  }
                />
              </View>

              <View className="mb-4">
                <RenderTextInput
                  isNumpad={false}
                  isMultiline={false}
                  icon={key}
                  value={password}
                  setValue={setPassword}
                  placeholder={translateText(
                    "Password",
                    "كلمة المرور"
                  )}
                  isError={passwordError}
                  setIsError={setPasswordError}
                  errorMessage={translateText(
                    "This field can not be empty",
                    "هذا الحقل لا يمكن أن يكون فارغًا"
                  )}
                  isArabic={
                    I18nManager.isRTL && true
                  }
                />
              </View>
            </View>

            <View>
              <TouchableOpacity
                onPress={() => {
                  handleNext();
                }}
                className="bg-[#FE6F07] w-full py-3 rounded-3xl flex justify-center items-center"
              >
                <Text className="text-white font-garamond-bold text-xl">
                  {translateText(
                    "Sign Up",
                    "سجل"
                  )}
                </Text>
              </TouchableOpacity>

              <View className=" relative flex justify-center items-center w-full my-4">
                <Text className="text-opacity-50 font-garamond bg-white px-1 py-1 z-10">
                  {translateText("or", "او")}
                </Text>
                <View className="opacity-50 absolute w-full border-b-[1px] "></View>
              </View>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("login");
                }}
                className="bg-white border-[1px] border-gray-400 w-full py-3 rounded-3xl flex justify-center items-center mb-2"
              >
                <Text className=" font-garamond-bold text-xl">
                  {translateText(
                    "Log In",
                    "تسجيل الدخول"
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;
