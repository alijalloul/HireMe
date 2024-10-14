import { useState } from "react";
import { useSelector } from "react-redux";

import Container from "./components/Container";
import EmployeeProfile from "./components/EmployeeProfile";

const Profile = ({ navigation }) => {
  const user = useSelector((state) => state.user.user);

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
