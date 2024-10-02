import { Colors } from '@/constants/Colors'
import React from "react";
import { Text } from "react-native";
import { cn } from "@/lib/utils";

const GaramondText = ({ props, className, children }) => {
  return (
    <Text className={cn("font-garamond", className)} {...props}>
      {children}
    </Text>
  );
};

export default GaramondText;
