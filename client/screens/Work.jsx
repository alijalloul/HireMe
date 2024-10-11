import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";
import React, { memo, useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { editUser } from "@/redux/User";

import CustomeBackHeader from "@/components/Header/CustomBackHeader";
import WorkExperiencePicker from "@/components/Picker/WorkExperiencePicker/WorkExperiencePicker";
import Container from "@/components/Container";

const Work = ({ navigation }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  const [workExperience, setWorkExperience] = useState(
    userInfo?.workExperience
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CustomeBackHeader navigation={navigation} screenName="introduction" />
      ),
    });
  }, []);

  return (
    <Container
      userInfo={{
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
