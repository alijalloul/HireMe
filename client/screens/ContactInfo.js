import React, {
  useEffect,
  useState,
} from "react";
import {
  I18nManager,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import CustomeBackHeader from "@/components/Header/CustomBackHeader";
import RenderTextInput from "@/components/RenderTextInput";
import UploadImage from "@/components/UploadImage";
import {
  editUser,
  updateUser,
} from "@/redux/User";

const CV = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(
    (state) => state.user.userInfo
  );

  const [image, setImage] = useState(
    user?.image || ""
  );
  const [email, setEmail] = useState(
    user?.email || ""
  );
  const [address, setAddress] = useState(
    user?.address || ""
  );

  const translateText = (
    englishText,
    arabicText
  ) => {
    return I18nManager.isRTL
      ? arabicText
      : englishText;
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CustomeBackHeader
          navigation={navigation}
          screenName="CV"
        />
      ),
    });
  }, []);

  return (
    <View className="bg-white flex-1 items-center">
      <View className="w-[90%] flex-1">
        <Text className=" text-4xl font-garamond mb-5">
          {translateText(
            user?.type === "employer"
              ? "First, tell the employee of how they would contact you."
              : "First, tell the employer of how they would contact you.",
            "أولاً، قل للموظف كيفية التواصل معك."
          )}
        </Text>

        <View
          className={`w-full flex justify-center items-center mb-2 ${
            user?.type !== "employer" && "hidden"
          }`}
        >
          <UploadImage
            width={150}
            isButton={true}
            image={image}
            setImage={setImage}
          />
        </View>

        <RenderTextInput
          isMultiline={false}
          title={translateText(
            "E-Mail",
            "البريد الإلكتروني"
          )}
          value={email}
          setValue={setEmail}
          placeholder={translateText(
            "Ex: mohammed.h@hotmail.com",
            "مثال: mohammed.h@hotmail.com"
          )}
        />

        <View className="my-2"></View>

        <RenderTextInput
          isMultiline={false}
          title={translateText(
            "Address",
            "العنوان"
          )}
          value={address}
          setValue={setAddress}
          placeholder={translateText(
            "Ex: Lebanon - Beirut - Hamera - Sadat St.",
            "مثال: لبنان - بيروت - حمرا - شارع سادات"
          )}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          user?.type === "employee"
            ? editUser(
                {
                  ...user,
                  email: email,
                  address: address,
                },
                "introduction",
                navigation,
                dispatch
              )
            : updateUser(
                {
                  ...user,
                  image: image,
                  email: email,
                  address: address,
                },
                navigation,
                dispatch
              );
        }}
        className="self-end w-32 h-12 flex justify-center items-center mr-3 mb-3 bg-[#FE6F07] rounded-xl"
      >
        <Text className="text-lg font-garamond text-white">
          {translateText("Next", "التالي")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CV;
