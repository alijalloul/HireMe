import React from "react";
import { ActivityIndicator, View } from "react-native";

const Spinner = () => {
  return (
    <View className="flex-1 justify-center item-center">
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
};

export default Spinner;
