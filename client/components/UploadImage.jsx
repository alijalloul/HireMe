import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import React, { memo } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const UploadImage = ({ width, isButton, image, setImage }) => {
  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!_image.canceled) {
      const resizedImage = await ImageManipulator.manipulateAsync(
        _image.assets[0].uri,
        [{ resize: { width: 512, height: 512 } }],
        { base64: true, compress: 1, format: "jpeg" }
      );

      setImage(`data:image/jpeg;base64,${resizedImage.base64}`);
    }
  };

  const removeImage = () => {
    setImage("");
  };

  return (
    <View className="flex justify-center items-center">
      <TouchableWithoutFeedback
        onPress={() => {
          !isButton && addImage();
        }}
      >
        <View
          style={{ width: width }}
          className="aspect-square bg-[#efefef] relative rounded-full overflow-hidden mb-2"
        >
          {image && <Image source={{ uri: image }} className="w-full h-full" />}
        </View>
      </TouchableWithoutFeedback>

      <View className="flex flex-row mb-2">
        {isButton && (
          <TouchableOpacity
            onPress={() => {
              addImage();
            }}
            className="flex items-center justify-center bg-white border w-24 py-2 rounded-xl mr-2"
            style={{ borderColor: Colors.primary }}
          >
            <GaramondText style={{ color: Colors.primary }}>
              {image ? "Edit" : "+ Add Image"}
            </GaramondText>
          </TouchableOpacity>
        )}

        {image && (
          <TouchableOpacity
            onPress={() => {
              removeImage();
            }}
            className="flex items-center justify-center bg-white border border-red-500 w-24 py-2 rounded-xl"
          >
            <GaramondText className=" text-red-500">Remove</GaramondText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default UploadImage;
