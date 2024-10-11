import React, { memo, useEffect, useState } from "react";
import { View } from "react-native";

import LanguageDisplayer from "./components/LanguageDisplayer";
import LanguageModal from "./components/LanguageModal";

const LanguagePicker = ({ headerSize, headerText }) => {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [postIndex, setPostIndex] = useState(null);

  return (
    <View className="flex-1">
      <View className="flex-1 self-center w-full ">
        <LanguageDisplayer
          headerSize={headerSize}
          headerText={headerText}
          setPostIndex={setPostIndex}
          setBottomSheetVisible={setBottomSheetVisible}
        />

        <LanguageModal
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
