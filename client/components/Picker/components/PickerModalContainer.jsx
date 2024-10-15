import GaramondText from "@/components/GaramondText";
import { Colors } from "@/constants/Colors";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

const PickerModalContainer = ({
  title,
  children,
  isBottomSheetVisible,
  postIndex,
  handleSave,
  closeModal,
  buttonText,
}) => {
  const isPostIndexDef = postIndex !== null && postIndex !== undefined;

  return (
    <Modal visible={isBottomSheetVisible} animationType="slide">
      <View className="flex-1 justify-center bg-white">
        <View
          className={`mb-5 w-full flex flex-row px-5 justify-between items-center ${
            isBottomSheetVisible && "border-b"
          }`}
        >
          <GaramondText className="text-3xl ">
            {isPostIndexDef ? "Edit" : `Add ${title}`}
          </GaramondText>

          <TouchableOpacity onPress={closeModal}>
            <GaramondText className="text-4xl font-garamond-semibold ">
              ×
            </GaramondText>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",
          }}
        >
          <View className="w-[90%] flex-1 ">
            <View className="flex-1  gap-y-5 mb-5">{children}</View>

            <TouchableOpacity
              className=" w-full h-[56px] rounded-lg justify-center items-center mb-5"
              style={{ backgroundColor: Colors.primary }}
              onPress={handleSave}
            >
              <Text className="text-white font-bold text-lg">
                {buttonText ? buttonText : "Add"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default PickerModalContainer;
