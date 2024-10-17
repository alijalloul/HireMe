import { Image, TouchableOpacity, View } from "react-native";

import pen from "@/assets/images/pen.png";
import trash from "@/assets/images/trash.png";
import { Colors } from "@/constants/Colors";
import { deleteJobPost } from "@/redux/User";
import { useDispatch } from "react-redux";

const EditDeleteButtons = ({
  index,
  setPostIndex,
  setBottomSheetVisible,
  value,
  setValue,
  deleteFromDB,
  jobId,
}) => {
  const dispatch = useDispatch();

  const handleEdit = (index) => {
    setPostIndex(index);
    setBottomSheetVisible(true);
  };

  return (
    <View className="flex flex-row justify-center items-center">
      <TouchableOpacity
        onPress={() => {
          handleEdit(index);
        }}
        className="border border-gray-400 rounded-full p-[6px] mr-2"
      >
        <Image
          source={pen}
          tintColor={Colors.primary}
          className="w-5 h-5 aspect-square"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          deleteFromDB
            ? deleteJobPost(dispatch, jobId)
            : setValue(value?.filter((item, index2) => index2 !== index));
        }}
        className="border border-gray-400 rounded-full p-[6px]"
      >
        <Image
          source={trash}
          tintColor={Colors.primary}
          className="w-5 h-5 aspect-square"
        />
      </TouchableOpacity>
    </View>
  );
};

export default EditDeleteButtons;
