import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";
import { Image, TouchableOpacity, View } from "react-native";

import pen from "@/assets/images/pen.png";
import trash from "@/assets/images/trash.png";

const WorkExperienceDisplayer = ({
  workExperience,
  setWorkExperience,
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
    <View className=" ">
      <GaramondText
        style={headerSize && { fontSize: headerSize }}
        className="text-4xl font-garamond-semibold mb-5"
      >
        {headerText}
      </GaramondText>

      <View>
        {workExperience?.length > 0 &&
          workExperience.map((work, index) => (
            <View
              key={index}
              className="relative w-full border rounded-2xl p-5 pt-3 pr-3 mb-4 minh-60"
            >
              <View className="w-full flex flex-row justify-between items-center">
                <View className="w-[80%]">
                  <GaramondText className="text-3xl">{work.title}</GaramondText>
                </View>

                <View className="self-start w-[20%] flex flex-row justify-center items-center">
                  <TouchableOpacity
                    onPress={() => {
                      handleEdit(index);
                    }}
                    className="border border-gray-400 rounded-full p-[6px] mr-2"
                  >
                    <Image source={pen} className="w-5 h-5 aspect-square" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setWorkExperience(
                        workExperience?.filter(
                          (item, index2) => index2 !== index
                        )
                      );
                    }}
                    className="border border-gray-400 rounded-full p-[6px]"
                  >
                    <Image source={trash} className="w-5 h-5 aspect-square" />
                  </TouchableOpacity>
                </View>
              </View>
              <GaramondText className="text-xl">{work.company}</GaramondText>
              <View className="w-full flex my-4">
                <GaramondText className="text-[15px]">
                  {work.country},{work.location}
                </GaramondText>
                <GaramondText className="text-[15px]">
                  {work.startMonth} {work.startYear} - {work.endMonth}{" "}
                  {work.endYear}
                </GaramondText>
              </View>
              <GaramondText className="text-lg opacity-70">
                {work.description}
              </GaramondText>
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
            + Add experience
          </GaramondText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WorkExperienceDisplayer;
