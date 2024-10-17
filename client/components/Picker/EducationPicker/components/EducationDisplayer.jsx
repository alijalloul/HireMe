import GaramondText from "@/components/GaramondText";
import { Colors } from "@/constants/Colors";
import { TouchableOpacity, View } from "react-native";

import EditDeleteButtons from "../../components/EditDeleteButtons";

const EducationDisplayer = ({
  education,
  setEducation,
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
        {education?.length > 0 &&
          education?.map((educ, index) => (
            <View
              key={index}
              className="relative w-full border rounded-2xl p-5 pt-3 pr-3 mb-4 min-h-44"
            >
              <View className="w-full flex flex-row justify-between items-center">
                <GaramondText className="text-2xl">
                  {educ.degree?.split("(")[0].trim()}
                </GaramondText>

                {!isView && (
                  <EditDeleteButtons
                    index={index}
                    setPostIndex={setPostIndex}
                    setBottomSheetVisible={setBottomSheetVisible}
                    value={education}
                    setValue={setEducation}
                  />
                )}
              </View>

              {educ.major && (
                <GaramondText className="text-[15px]">
                  in
                  <GaramondText
                    className="text-xl"
                    style={{ color: Colors.primary }}
                  >{` ${educ.major} `}</GaramondText>
                  from
                </GaramondText>
              )}
              <View className="w-full flex flex-row justify-between items-center mb-4">
                <GaramondText className="text-lg">{educ.school}</GaramondText>
                <GaramondText className="text-[15px] opacity-70 mb-3">
                  {educ.startYear} -{educ.endYear}
                </GaramondText>
              </View>
              <GaramondText className="text-lg opacity-70">
                {educ.note}
              </GaramondText>
            </View>
          ))}

        {isView ? (
          education?.length === 0 && (
            <View>
              <GaramondText className=" opacity-70">
                No education added
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
              + Add education
            </GaramondText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default EducationDisplayer;
