import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CustomeBackHeader from "@/components/Header/CustomBackHeader";
import EducationPicker from "@/components/Picker/EducationPicker/EducationPicker";

import Container from "@/components/Container";

const Education = ({ navigation }) => {
  const userInfo = useSelector((state) => state.user.userInfo);

  const [education, setEducation] = useState(userInfo?.education);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CustomeBackHeader navigation={navigation} screenName="work" />
      ),
    });
  }, []);

  return (
    <Container
      userInfo={{
        education: education,
      }}
      screenName="language"
      navigation={navigation}
    >
      <EducationPicker
        headerText="Your education is very important to the client"
        education={education}
        setEducation={setEducation}
      />
    </Container>
  );
};

export default Education;
