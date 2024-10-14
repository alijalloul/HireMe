import { cn } from "@/lib/utils";
import { Text } from "react-native";

const GaramondText = ({ props, className, style, children }) => {
  return (
    <Text className={cn("font-garamond", className)} style={style} {...props}>
      {children}
    </Text>
  );
};

export default GaramondText;
