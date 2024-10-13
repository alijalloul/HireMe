import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import EmployeeProfile from "./components/EmployeeProfile";
import Container from "./components/Container";

const Profile = ({ navigation }) => {
  const isFocused = useIsFocused();
  const user = useSelector((state) => state.user.userInfo);

  const [formData, setFormData] = useState(user);

  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  return (
    <Container
      formData={formData}
      handleInputChange={handleInputChange}
      navigation={navigation}
    >
      {user?.accountType === "employee" && (
        <EmployeeProfile
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}
    </Container>
  );
};

export default Profile;
