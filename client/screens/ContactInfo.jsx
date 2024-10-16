import GaramondText from "@/components/GaramondText";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Container from "@/components/Container";
import CustomeBackHeader from "@/components/Header/CustomBackHeader";
import RenderTextInput from "@/components/RenderTextInput";

const CV = ({ navigation }) => {
  const user = useSelector((state) => state.user.user);

  const [telephone, setTelephone] = useState(user?.telephone || "");
  const [address, setAddress] = useState(user?.address || "");

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CustomeBackHeader navigation={navigation} screenName="CV" />
      ),
    });
  }, []);

  return (
    <Container
      user={{
        telephone: telephone,
        address: address,
      }}
      screenName="introduction"
      navigation={navigation}
    >
      <GaramondText className=" text-4xl font-garamond-semibold mb-5">
        {user?.accountType === "employee"
          ? "First, tell the employer how they would contact you."
          : accountType === "employer" &&
            "First, tell the employee how they would contact you."}
      </GaramondText>

      <RenderTextInput
        className="mb-5"
        isMultiline={false}
        title="Mobile Number"
        value={telephone}
        setValue={setTelephone}
        placeholder="Ex: +961 76 812 345"
      />

      <RenderTextInput
        isMultiline={false}
        title="Address"
        value={address}
        setValue={setAddress}
        placeholder="Ex: Lebanon - Beirut - Hamera - Sadat St."
      />
    </Container>
  );
};

export default CV;
