import GaramondText from "@/components/GaramondText";

import TextInputEditor from "@/screens/Profile/components/components/TextInputEditor";
import UploadImage from "@/components/UploadImage";

import blobTop from "@/assets/images/blobTop.png";
import { TouchableOpacity } from "react-native";
import { logout, updateUser } from "@/redux/User";
import { Colors } from "@/constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, View, Image } from "react-native";
import Spinner from "@/components/Spinner";

const Container = ({ formData, handleInputChange, navigation, children }) => {
  const dispatch = useDispatch();

  const pending = useSelector((state) => state.user.pending);
  const user = useSelector((state) => state.user.user);

  return (
    <View className="flex-1 justify-center bg-white">
      {pending && (
        <>
          <View className="absolute w-full h-full justify-center items-center">
            <Spinner />
          </View>
          <View className="bg-white z-20 absolute h-full w-full opacity-50"></View>
        </>
      )}

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          minHeight: 692,
        }}
      >
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
                  logout(navigation, dispatch);
                }}
                className="w-full h-12 flex justify-center items-center bottom-0 right-0 bg-white border rounded-xl mb-2"
                style={{ borderColor: Colors.primary }}
              >
                <GaramondText
                  className="text-lg"
                  style={{ color: Colors.primary }}
                >
                  Log Out
                </GaramondText>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  updateUser(
                    {
                      ...formData,
                      id: user.id,
                      type: user.accountType,
                    },
                    navigation,
                    dispatch
                  );
                }}
                className="w-full h-12 flex justify-center items-center bottom-0 right-0 rounded-xl mb-8"
                style={{ backgroundColor: Colors.primary }}
              >
                <GaramondText className="text-lg text-white">Save</GaramondText>
              </TouchableOpacity>
            </View>
          </View>

          <View className="w-[90%] justify-center"></View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Container;
