import GaramondText from "@/components/GaramondText";
import { Colors } from "@/constants/Colors";

import { MotiView, useDynamicAnimation } from "moti";
import React, { useEffect } from "react";
import { Image, TouchableOpacity, View } from "react-native";

const NavButton = React.forwardRef(
  ({ focused, image, label, onPress, selectedButtonBottom }, ref) => {
    const homeAnimation = useDynamicAnimation(() => ({ bottom: 0 }));

    useEffect(() => {
      homeAnimation.animateTo({
        bottom: focused ? selectedButtonBottom : 0,
      });
    }, [focused]);

    return (
      <View
        ref={ref}
        className="z-20 relative flex justify-center items-center"
      >
        <MotiView
          state={homeAnimation}
          transition={{ type: "spring", damping: 300 }}
        >
          <TouchableOpacity onPress={onPress} className="rounded-full">
            <Image
              source={image}
              className="w-8 h-8 "
              tintColor={focused ? "white" : Colors.primary}
            />
          </TouchableOpacity>
        </MotiView>
        <GaramondText className="text-lg" style={{ color: Colors.primary }}>
          {label}
        </GaramondText>
      </View>
    );
  }
);

export default NavButton;
