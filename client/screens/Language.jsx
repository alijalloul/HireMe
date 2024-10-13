import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CustomeBackHeader from "@/components/Header/CustomBackHeader";
import LanguagePicker from "@/components/Picker/LanguagePicker/LanguagePicker";

import Container from "@/components/Container";

const Language = ({ navigation }) => {
  const user = useSelector((state) => state.user.user);

  const [language, setLanguage] = useState(user?.language);

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
      user={{ ...user, language: language }}
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
