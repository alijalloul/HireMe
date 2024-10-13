import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CustomeBackHeader from "@/components/Header/CustomBackHeader";
import WorkExperiencePicker from "@/components/Picker/WorkExperiencePicker/WorkExperiencePicker";
import Container from "@/components/Container";

const Work = ({ navigation }) => {
  const user = useSelector((state) => state.user.user);

  const [workExperience, setWorkExperience] = useState(user?.workExperience);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CustomeBackHeader navigation={navigation} screenName="introduction" />
      ),
    });
  }, []);

  return (
    <Container
      user={{
        workExperience: workExperience,
      }}
      screenName="education"
      navigation={navigation}
    >
      <WorkExperiencePicker
        headerText="If you have relevant work experience, add it here."
        workExperience={workExperience}
        setWorkExperience={setWorkExperience}
      />
    </Container>
  );
};

export default memo(Work);
