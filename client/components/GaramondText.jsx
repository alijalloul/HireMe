import { Colors } from "@/constants/Colors";
import React from "react";
import { Text } from "react-native";
import { cn } from "@/lib/utils";

const GaramondText = ({ props, className, style, children }) => {
  return (
    <Text className={cn("font-garamond", className)} style={style} {...props}>
      {children}
    </Text>
  );
};

export default GaramondText;
