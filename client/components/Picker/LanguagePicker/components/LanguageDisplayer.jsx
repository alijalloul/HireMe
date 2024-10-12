import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";
import { Image, TouchableOpacity, View } from "react-native";

import downVector from "@/assets/images/downVector.png";
import trash from "@/assets/images/trash.png";

const LanguageDisplayer = ({
  language,
  setLanguage,
  headerSize,
  headerText,
  setPostIndex,
  setBottomSheetVisible,
}) => {
  const handleEdit = (index) => {
    setPostIndex(index);
    setBottomSheetVisible(true);
  };

  return (
    <View>
      <GaramondText
        style={headerSize && { fontSize: headerSize }}
        className="text-4xl font-garamond-semibold mb-5"
      >
        {headerText}
      </GaramondText>

      <View>
        {language?.length > 0 &&
          language.map((lang, index) => (
            <View
              key={index}
              className="relative w-full py-3 border-t-[1px] border-b-[1px] mb-4"
            >
              <View className="flex flex-row justify-center items-center">
                <TouchableOpacity
                  onPress={() => {
                    handleEdit(index);
                  }}
                  className="border rounded-2xl  px-2 py-2 mr-2 w-[35%] flex flex-row justify-between items-center"
                >
                  <GaramondText className=" text-xl">
                    {lang.language}
                  </GaramondText>
                  <Image source={downVector} className=" w-5 aspect-[2/1]" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleEdit(index);
                  }}
                  className="border rounded-2xl  px-2 py-2 mr-3 w-[45%] flex flex-row justify-between items-center"
                >
                  <GaramondText className=" text-xl">
                    {lang.proficiency}
                  </GaramondText>
                  <Image source={downVector} className=" w-5 aspect-[2/1]" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setLanguage(
                      language?.filter((item, index2) => index2 !== index)
                    );
                  }}
                  className="flex justify-center items-center border border-gray-400 rounded-full w-10 aspect-square"
                >
                  <Image
                    source={trash}
                    tintColor={Colors.primary}
                    className="w-5 h-5 aspect-square"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}

        <TouchableOpacity
          onPress={() => {
            setBottomSheetVisible(true);
          }}
          className="bg-white border w-full py-3 rounded-3xl flex justify-center items-center mb-5"
          style={{ borderColor: Colors.primary }}
        >
          <GaramondText
            className="font-garamond-bold text-xl"
            style={{ color: Colors.primary }}
          >
            + Add language
          </GaramondText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LanguageDisplayer;
