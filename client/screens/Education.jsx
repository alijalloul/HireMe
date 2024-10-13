import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CustomeBackHeader from "@/components/Header/CustomBackHeader";
import EducationPicker from "@/components/Picker/EducationPicker/EducationPicker";

import Container from "@/components/Container";

const Education = ({ navigation }) => {
  const user = useSelector((state) => state.user.user);

  const [education, setEducation] = useState(user?.education);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CustomeBackHeader navigation={navigation} screenName="work" />
      ),
    });
  }, []);

  return (
    <Container
      user={{
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
