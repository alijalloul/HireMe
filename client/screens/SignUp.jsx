import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import GaramondText from "@/components/GaramondText";
import RenderTextInput from "@/components/RenderTextInput";
import Spinner from "@/components/Spinner";
import { Colors } from "@/constants/Colors";
import { signup } from "@/redux/User";

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();
  const pending = useSelector((state) => state.user.pending);

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    accountType: "employee",
  });

  // State for errors
  const [errors, setErrors] = useState({
    nameError: false,
    emailError: false,
    passwordError: false,
    emailErrorMessage: "",
  });

  const handleSignUp = async () => {
    let error = false;
    let updatedErrors = { ...errors };

    if (formData.name === "") {
      updatedErrors.nameError = true;
      error = true;
    }
    if (formData.email === "") {
      updatedErrors.emailError = true;
      updatedErrors.emailErrorMessage = "This field cannot be empty";
      error = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      updatedErrors.emailError = true;
      updatedErrors.emailErrorMessage = "Please enter a valid email address";
      error = true;
    }
    if (formData.password === "") {
      updatedErrors.passwordError = true;
      error = true;
    }

    setErrors(updatedErrors);

    if (!error) {
      await signup(dispatch, formData, navigation);
    }
  };

  return (
    <View className="flex-1 justify-center bg-white">
      {pending && (
        <>
          <View className="z-30 absolute w-full h-full justify-center items-center">
            <Spinner />
          </View>
          <View className=" bg-white z-20 absolute h-full w-full opacity-50 " />
        </>
      )}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          minHeight: 692,
        }}
      >
        <View className="w-[90%] flex-1 my-10 flex flex-col justify-between">
          <GaramondText
            className="text-4xl font-garamond-semibold text-white"
            style={{ color: Colors.primary }}
          >
            Create Account
          </GaramondText>

          <View className="w-full">
            <RenderTextInput
              className="mb-4"
              isNumpad={false}
              isMultiline={false}
              value={formData.name}
              setValue={(value) => setFormData({ ...formData, name: value })}
              placeholder="Full Name"
              isError={errors.nameError}
              setIsError={(value) => setErrors({ ...errors, nameError: value })}
              errorMessage="This field cannot be empty"
            />

            <RenderTextInput
              className="mb-4"
              isNumpad={false}
              isMultiline={false}
              value={formData.email}
              setValue={(value) => setFormData({ ...formData, email: value })}
              placeholder="Email Address"
              isError={errors.emailError}
              setIsError={(value) =>
                setErrors({ ...errors, emailError: value })
              }
              errorMessage={errors.emailErrorMessage}
            />

            <RenderTextInput
              className="mb-4"
              isNumpad={false}
              isMultiline={false}
              value={formData.password}
              setValue={(value) =>
                setFormData({ ...formData, password: value })
              }
              placeholder="Password"
              isError={errors.passwordError}
              setIsError={(value) =>
                setErrors({ ...errors, passwordError: value })
              }
              errorMessage="This field cannot be empty"
            />

            <View>
              <GaramondText>Looking for...</GaramondText>

              <View
                className="flex flex-row justify-between items-center rounded border overflow-hidden"
                style={{ borderColor: Colors.primary }}
              >
                <TouchableOpacity
                  className="w-[50%] flex justify-center items-center py-3 border-r"
                  style={
                    formData.accountType === "employee"
                      ? {
                          backgroundColor: Colors.primary,
                          borderColor: Colors.primary,
                        }
                      : {
                          backgroundColor: "white",
                          borderColor: Colors.primary,
                        }
                  }
                  onPress={() =>
                    setFormData({ ...formData, accountType: "employee" })
                  }
                >
                  <GaramondText
                    style={
                      formData.accountType === "employee"
                        ? { color: "white" }
                        : { color: "black" }
                    }
                  >
                    Job
                  </GaramondText>
                </TouchableOpacity>

                <TouchableOpacity
                  className="w-[50%] flex justify-center items-center py-3 border-l"
                  style={
                    formData.accountType === "employer"
                      ? {
                          backgroundColor: Colors.primary,
                          color: "white",
                          borderColor: Colors.primary,
                        }
                      : {
                          backgroundColor: "white",
                          color: "black",
                          borderColor: Colors.primary,
                        }
                  }
                  onPress={() =>
                    setFormData({ ...formData, accountType: "employer" })
                  }
                >
                  <GaramondText
                    style={
                      formData.accountType === "employer"
                        ? { color: "white" }
                        : { color: "black" }
                    }
                  >
                    Employee
                  </GaramondText>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View className="w-full">
            <TouchableOpacity
              onPress={handleSignUp}
              className="w-full py-3 rounded-3xl flex justify-center items-center"
              style={{ backgroundColor: Colors.primary }}
            >
              <GaramondText className="text-white font-garamond-bold text-xl">
                Sign Up
              </GaramondText>
            </TouchableOpacity>

            <View className="relative flex justify-center items-center w-full my-2">
              <GaramondText className="text-opacity-50 bg-white px-1 py-1 z-10">
                or
              </GaramondText>
              <View className="opacity-50 absolute w-full border-b" />
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate("login")}
              className="bg-white border border-gray-400 w-full py-3 rounded-3xl flex justify-center items-center mb-2"
            >
              <GaramondText className="font-garamond-bold text-xl">
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
