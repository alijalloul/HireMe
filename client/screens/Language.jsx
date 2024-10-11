import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";
import React, { memo, useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import CustomeBackHeader from "@/components/Header/CustomBackHeader";
import LanguagePicker from "@/components/Picker/LanguagePicker/LanguagePicker";
import Spinner from "@/components/Spinner";
import { updateUser } from "@/redux/User";
import Container from "@/components/Container";

const Language = ({ navigation }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const pending = useSelector((state) => state.user.pending);

  const [language, setLanguageArr] = useState(
    userInfo?.language || [
      {
        language: "Deutsch",
        proficiency: "Fluent",
      },
      {
        language: "العربية",
        proficiency: "Basic",
      },
      {
        language: "English",
        proficiency: "Intermediate",
      },
    ]
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CustomeBackHeader navigation={navigation} screenName="education" />
      ),
    });
  }, []);

  return (
    <Container
      isOver={true}
      userInfo={{ ...userInfo, language: language }}
      navigation={navigation}
    >
      <LanguagePicker
        headerSize={35}
        headerText="One last thing. Tell us what languages do you speak."
        language={language}
        setLanguageArr={setLanguageArr}
      />
    </Container>
  );
};

export default memo(Language);
