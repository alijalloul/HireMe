import GaramondText from "@/components/GaramondText";
import { Image, View } from "react-native";

import TextInputEditor from "@/screens/Profile/components/TextInputEditor";
import UploadImage from "@/components/UploadImage";

import blobTop from "@/assets/images/blobTop.png";

const EmployerProfile = ({ formData, handleInputChange }) => {
  return (
    <View className="flex-1 items-center w-full">
      <View className="absolute -top-72 opacity-90">
        <Image source={blobTop} />
      </View>

      <TextInputEditor
        className="my-2"
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
        <View className="my-5 flex-1">
          <GaramondText className="font-garamond-semibold text-2xl">
            Contact Information
          </GaramondText>

          <View>
            <View className="w-full flex flex-row justify-start items-center border-y border-gray-500 py-3 px-2 ">
              <GaramondText className="font-garamond">E-Mail:</GaramondText>
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
              <GaramondText className="font-garamond">Address:</GaramondText>
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
      </View>
    </View>
  );
};

export default EmployerProfile;
