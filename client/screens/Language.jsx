import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CustomeBackHeader from "@/components/Header/CustomBackHeader";
import LanguagePicker from "@/components/Picker/LanguagePicker/LanguagePicker";

import Container from "@/components/Container";

const Language = ({ navigation }) => {
  const userInfo = useSelector((state) => state.user.userInfo);

  const [language, setLanguage] = useState(userInfo?.language);

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
        setLanguage={setLanguage}
      />
    </Container>
  );
};

export default Language;
