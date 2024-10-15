import { Colors } from "@/constants/Colors";
import { editUser, updateUser } from "@/redux/User";
import { TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import GaramondText from "./GaramondText";
import SpinnerScrollbar from "./SpinnerScrollbar";

const Container = ({ isOver, user, screenName, navigation, children }) => {
  const dispatch = useDispatch();

  return (
    <SpinnerScrollbar>
      <View className="flex-1 w-[90%] mb-5  ">
        <View className="flex-1 ">{children}</View>

        <TouchableOpacity
          onPress={() => {
            isOver
              ? updateUser(dispatch, user, navigation)
              : editUser(dispatch, user, screenName, navigation);
          }}
          className="self-end w-32 h-12 flex justify-center items-center rounded-xl"
          style={{ backgroundColor: Colors.primary }}
        >
          <GaramondText className="text-lg text-white">Next</GaramondText>
        </TouchableOpacity>
      </View>
    </SpinnerScrollbar>
  );
};

export default Container;
