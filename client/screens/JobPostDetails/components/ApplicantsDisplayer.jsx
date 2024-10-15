import GaramondText from "@/components/GaramondText";
import { fetchApplicants } from "@/redux/User";
import { useEffect } from "react";

import { Image, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const ApplicantsDisplayer = ({ jobId, navigation }) => {
  const dispatch = useDispatch();

  const applicants = useSelector((state) => state.user.applicants).filter(
    (applicant) => applicant[jobId]
  ).jobId;

  useEffect(() => {
    console.log("applicants: ", applicants);
  }, [applicants]);

  useEffect(() => {
    fetchApplicants(dispatch, jobId);
  }, []);

  return (
    <View className="flex-1 w-full items-center">
      {applicants?.length > 0 ? (
        applicants?.map((applicant, index) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("userDetails", { userId: applicant?.id });
            }}
            key={index}
            className="w-[90%] px-4 flex-row items-center rounded-full border h-32 mb-3"
          >
            <View className="w-20 h-20 mr-2">
              <Image
                source={
                  applicant?.image !== "" ? { uri: applicant?.image } : null
                }
                className="rounded-full w-full h-full"
              />
            </View>

            <View className="">
              <View className="mb-5">
                <GaramondText className="text-lg ">
                  {applicant?.name}
                </GaramondText>
                <GaramondText className="opacity-50 text-sm">
                  posted 3hr ago
                </GaramondText>
              </View>

              <GaramondText className="">{applicant?.coverLetter}</GaramondText>
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
