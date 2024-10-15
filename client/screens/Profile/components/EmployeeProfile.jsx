import EducationPicker from "@/components/Picker/EducationPicker/EducationPicker";
import LanguagePicker from "@/components/Picker/LanguagePicker/LanguagePicker";
import WorkExperiencePicker from "@/components/Picker/WorkExperiencePicker/WorkExperiencePicker";
import IntroductionPicker from "@/screens/Profile/components/components/IntroductionPicker";

const EmployeeProfile = ({ formData, handleInputChange }) => {
  return (
    <>
      <IntroductionPicker
        introduction={formData.introduction}
        setIntroduction={(value) => handleInputChange("introduction", value)}
        placeholder="Introduction"
      />

      <WorkExperiencePicker
        headerSize={25}
        headerText="Work Experience"
        workExperience={formData.workExperience}
        setWorkExperience={(value) =>
          handleInputChange("workExperience", value)
        }
      />

      <EducationPicker
        headerSize={25}
        headerText="Education"
        education={formData.education}
        setEducation={(value) => handleInputChange("education", value)}
      />

      <LanguagePicker
        headerSize={25}
        headerText="Languages"
        language={formData.language}
        setLanguage={(value) => handleInputChange("language", value)}
      />
    </>
  );
};

export default EmployeeProfile;
