import { useState } from "react";
import { View } from "react-native";

import LanguageDisplayer from "./components/LanguageDisplayer";
import LanguageModal from "./components/LanguageModal";

const LanguagePicker = ({ language, setLanguage, headerSize, headerText }) => {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [postIndex, setPostIndex] = useState(null);

  return (
    <View className="flex-1">
      <View className="flex-1 self-center w-full ">
        <LanguageDisplayer
          language={language}
          setLanguage={setLanguage}
          headerSize={headerSize}
          headerText={headerText}
          setPostIndex={setPostIndex}
          setBottomSheetVisible={setBottomSheetVisible}
        />

        <LanguageModal
          language={language}
          setLanguage={setLanguage}
          isBottomSheetVisible={isBottomSheetVisible}
          setBottomSheetVisible={setBottomSheetVisible}
          postIndex={postIndex}
          setPostIndex={setPostIndex}
        />
      </View>
    </View>
  );
};

export default LanguagePicker;
