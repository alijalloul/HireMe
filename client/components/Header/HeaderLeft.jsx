import GaramondText from "@/components/GaramondText";
import { Colors } from "@/constants/Colors";
import { Image, TouchableOpacity, View } from "react-native";

import Filter from "@/assets/images/filter.png";

const HeaderLeft = ({ setBottomSheetVisible, numberOfFilters }) => {
  return (
    <TouchableOpacity
      onPress={() => setBottomSheetVisible(true)}
      className="rounded-full w-8 h-8 m-5"
    >
      <Image source={Filter} className="w-full h-full" />

      {numberOfFilters > 0 && (
        <View
          className="relative left-4 bottom-3 self-end flex justify-center items-center rounded-full aspect-square w-6"
          style={{ backgroundColor: Colors.primary }}
        >
          <GaramondText className=" text-white font-bold text-sm">
            {numberOfFilters}
          </GaramondText>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default HeaderLeft;
