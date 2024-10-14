import GaramondText from "@/components/GaramondText";
import { useEffect, useState } from "react";

import { View } from "react-native";
import { useSelector } from "react-redux";

import Container from "@/components/Container";
import CustomeBackHeader from "@/components/Header/CustomBackHeader";
import RenderTextInput from "@/components/RenderTextInput";
import UploadImage from "@/components/UploadImage";

const Introduction = ({ navigation }) => {
  const user = useSelector((state) => state.user.user);

  const [image, setImage] = useState(user?.image || "");
  const [professionalRole, setProffesionalRole] = useState(
    user?.profession || ""
  );
  const [introduction, setIntroduction] = useState(user?.introduction || "");

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CustomeBackHeader navigation={navigation} screenName="contactInfo" />
      ),
    });
  }, []);

  return (
    <Container
      user={{
        image: image,
        profession: professionalRole,
        introduction: introduction,
      }}
      screenName="work"
      navigation={navigation}
    >
      <GaramondText className="text-4xl font-garamond-semibold mb-5">
        You are one step closer towards finding your perfect job!
      </GaramondText>
      <GaramondText className="text-xl mb-5">
        We will need you to fill out some information to get to know you better.
      </GaramondText>

      <View className="w-full flex justify-center items-center mb-2">
        <UploadImage
          width={150}
          isButton={true}
          image={image}
          setImage={setImage}
        />
      </View>

      <View className="mb-4">
        <RenderTextInput
          isNumpad={false}
          isMultiline={false}
          title="Professional Role"
          value={professionalRole}
          setValue={setProffesionalRole}
          placeholder="Ex: Web Developer | Translator"
        />
      </View>
      <View className="mb-4">
        <RenderTextInput
          isMultiline={true}
          title="Introduction"
          value={introduction}
          setValue={setIntroduction}
          placeholder="Ex: Hello, I am a university student currently majoring in computer science at LIU. I like to travel, jog, and sleep."
        />
      </View>
    </Container>
  );
};

export default Introduction;
