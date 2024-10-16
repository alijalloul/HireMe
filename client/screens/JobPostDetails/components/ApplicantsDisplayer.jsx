import GaramondText from "@/components/GaramondText";
import { fetchApplicants } from "@/redux/User";
import { useEffect } from "react";

import { Image, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const ApplicantsDisplayer = ({ jobId, navigation }) => {
  const dispatch = useDispatch();

  const applicants = useSelector((state) => state.user.applicants)[jobId];

  useEffect(() => {
    fetchApplicants(dispatch, jobId);
  }, []);

  return (
    <View className="flex-1  items-center my-5 w-[90%]">
      {applicants?.length > 0 ? (
        applicants?.map((applicant, index) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("userDetails", {
                applicantId: applicant?.id,
                jobId: jobId,
              });
            }}
            key={index}
            className=" w-full px-4 flex-row items-center rounded border h-32 mb-3"
          >
            <View className="w-20 h-20 mr-2">
              <Image
                source={
                  applicant?.iconImage && applicant?.iconImage !== ""
                    ? { uri: applicant?.iconImage }
                    : null
                }
                className="rounded-full w-full h-full"
              />
            </View>

            <View>
              <View className="mb-5">
                <GaramondText className="text-lg ">
                  {applicant?.name}
                </GaramondText>
                <GaramondText className="opacity-50 text-sm">
                  posted 3hr ago
                </GaramondText>
              </View>

              <GaramondText>{applicant?.coverLetter}</GaramondText>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View className="w-[90%] items-center'">
          <GaramondText className="opacity-50">
            No one has applied yet. Refresh the page in order to update the
            list.
          </GaramondText>
        </View>
      )}
    </View>
  );
};

export default ApplicantsDisplayer;
