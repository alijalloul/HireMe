import GaramondText from "@/components/GaramondText";
import { Colors } from "@/constants/Colors";
import { TouchableOpacity, View } from "react-native";
import EditDeleteButtons from "../../components/EditDeleteButtons";

const WorkExperienceDisplayer = ({
  workExperience,
  setWorkExperience,
  headerSize,
  headerText,
  setPostIndex,
  setBottomSheetVisible,
  isView,
}) => {
  const handleEdit = (index) => {
    setPostIndex(index);
    setBottomSheetVisible(true);
  };

  return (
    <View className="w-full">
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
              className="relative w-full border rounded-2xl p-5 pt-3 pr-3 mb-4 min-h-60"
            >
              <View className="w-full flex flex-row justify-between items-center">
                <GaramondText className="text-3xl">{work.title}</GaramondText>

                {!isView && (
                  <EditDeleteButtons
                    index={index}
                    setPostIndex={setPostIndex}
                    setBottomSheetVisible={setBottomSheetVisible}
                    value={workExperience}
                    setValue={setWorkExperience}
                  />
                )}
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

        {isView ? (
          workExperience?.length === 0 && (
            <View>
              <GaramondText className=" opacity-70">
                No work experience added
              </GaramondText>
            </View>
          )
        ) : (
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
        )}
      </View>
    </View>
  );
};

export default WorkExperienceDisplayer;
