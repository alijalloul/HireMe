import GaramondText from "@/components/GaramondText";

import UploadImage from "@/components/UploadImage";
import TextInputEditor from "@/screens/Profile/components/components/TextInputEditor";

import blobTop from "@/assets/images/blobTop.png";
import SpinnerScrollbar from "@/components/SpinnerScrollbar";
import { Colors } from "@/constants/Colors";
import { logout, updateUser } from "@/redux/User";
import { Image, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const Container = ({ formData, handleInputChange, navigation, children }) => {
  const dispatch = useDispatch();

  const pending = useSelector((state) => state.user.pending);
  const user = useSelector((state) => state.user.user);

  function isObject(obj) {
    return obj !== null && typeof obj === "object";
  }

  function deepEqual(obj1, obj2) {
    if (obj1 === obj2) return true;

    if (!isObject(obj1) || !isObject(obj2)) return false;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
      if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }

    return true;
  }

  const noChange = deepEqual(user, formData);

  return (
    <SpinnerScrollbar>
      <View className="flex-1 items-center w-full">
        <View className="absolute -translate-y-1/2 opacity-90">
          <Image source={blobTop} />
        </View>

        <TextInputEditor
          textSize={35}
          textColor={"white"}
          value={formData.name}
          setValue={(value) => handleInputChange("name", value)}
          placeholder="Full Name"
        />

        <UploadImage
          width={250}
          isButton={false}
          image={formData.image}
          setImage={(value) => handleInputChange("image", value)}
        />

        <View className="w-[90%]">
          {formData.profession && (
            <View className="w-full flex justify-center items-center">
              <TextInputEditor
                textSize={25}
                textColor={"black"}
                value={formData.profession}
                setValue={(value) => handleInputChange("profession", value)}
                placeholder="Professional Title"
              />
            </View>
          )}

          <View className="my-5 flex-1">
            <GaramondText className="font-garamond-semibold text-2xl">
              Contact Information
            </GaramondText>

            <View>
              <View className="w-full flex flex-row justify-start items-center border-y border-gray-500 py-3 px-2 ">
                <GaramondText className="">E-Mail:</GaramondText>
                <TextInputEditor
                  className="flex-1"
                  textSize={15}
                  textColor="black"
                  value={formData.email}
                  setValue={(value) => handleInputChange("email", value)}
                  placeholder="N/A"
                />
              </View>

              <View className="w-full flex flex-row justify-start items-center border-b border-gray-500 py-3 px-2 ">
                <GaramondText className="">Address:</GaramondText>
                <TextInputEditor
                  className="flex-1"
                  textSize={15}
                  textColor="black"
                  value={formData.address}
                  setValue={(value) => handleInputChange("address", value)}
                  placeholder="N/A"
                />
              </View>
            </View>
          </View>

          {children}

          <View className="flex justify-center items-center my-10">
            <TouchableOpacity
              onPress={() => {
                noChange
                  ? navigation.navigate("home")
                  : !pending &&
                    updateUser(
                      dispatch,
                      {
                        ...formData,
                        id: user?.id,
                        type: user.accountType,
                      },
                      navigation
                    );
              }}
              className="w-full h-16 flex justify-center items-center bottom-0 right-0 rounded-xl mb-8"
              style={{ backgroundColor: Colors.primary }}
            >
              <GaramondText className="text-lg text-white">Save</GaramondText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                logout(dispatch, navigation);
              }}
              className="w-full h-16 flex justify-center items-center bottom-0 right-0 bg-white border rounded-xl mb-8"
              style={{ borderColor: Colors.primary }}
            >
              <GaramondText
                className="text-lg"
                style={{ color: Colors.primary }}
              >
                Log Out
              </GaramondText>
            </TouchableOpacity>
          </View>
        </View>

        <View className="w-[90%] justify-center"></View>
      </View>
    </SpinnerScrollbar>
  );
};

export default Container;
