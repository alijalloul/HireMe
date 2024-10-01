import React, {
  memo,
  useCallback,
  useState,
} from "react";
import {
  I18nManager,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import EmployeeJobs from "@/components/EmployeeJobs";
import Pagination from "@/components/Pagination";
import PostJobModal from "@/components/PostJob/PostJobModal";

const translateText = (
  englishText,
  arabicText
) => {
  return I18nManager.isRTL
    ? arabicText
    : englishText;
};

const MyJobs = ({ navigation }) => {
  const dispatch = useDispatch();

  const user = useSelector(
    (state) => state.user.userInfo
  );
  const page = useSelector(
    (state) => state.user.currentPage
  );
  const numberOfPages = useSelector(
    (state) => state.user.numberOfPages
  );

  const [jobsStatus, setJobsStatus] =
    useState("pending");

  const [refreshing, setRefreshing] =
    useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const EmployerMyJobs = () => {
    const [
      isBottomSheetVisible,
      setBottomSheetVisible,
    ] = useState(false);

    return (
      <View className="flex-1 flex justify-center items-center w-full">
        <PostJobModal
          isBottomSheetVisible={
            isBottomSheetVisible
          }
          setBottomSheetVisible={
            setBottomSheetVisible
          }
          navigation={navigation}
          jobsStatus={jobsStatus}
        />

        <Pagination
          fetchType="postsById"
          userId={user?._id}
          page={page}
          numberOfPages={numberOfPages}
        />

        <TouchableOpacity
          onPress={() => {
            setBottomSheetVisible(true);
          }}
          className={`${
            user?.type === "employee"
              ? "hidden"
              : "self-end w-32 h-12 flex justify-center items-center mr-3 mb-3 bg-[#FE6F07] rounded-xl"
          }`}
        >
          <Text className="text-lg font-garamond text-white">
            {translateText(
              "Post Job",
              "أضف الوظيفة"
            )}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const EmployeeMyJobs = () => {
    return (
      <View className="flex-1 flex justify-center items-center">
        <EmployeeJobs
          navigation={navigation}
          jobsStatus={jobsStatus}
        />

        <Pagination
          fetchType="postsByEmployeeId"
          userId={user?._id}
          page={page}
          numberOfPages={numberOfPages}
        />
      </View>
    );
  };

  return (
    <ScrollView
      className="bg-white"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <View className=" flex flex-row justify-center items-center mb-5">
        <TouchableOpacity
          onPress={() => {
            setJobsStatus("pending");
          }}
          className={`${
            jobsStatus === "pending"
              ? "bg-[#FE6F07]"
              : "bg-white"
          } flex justify-center items-center rounded-xl border-[1px] border-[#FE6F07] rounded-r-none w-[20%] p-2`}
        >
          <Text
            className={`${
              jobsStatus === "pending"
                ? "text-white"
                : "text-[#FE6F07]"
            }`}
          >
            {translateText(
              "Pending",
              "قيد الانتظار"
            )}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setJobsStatus("hired");
          }}
          className={`${
            jobsStatus === "hired"
              ? "bg-[#FE6F07]"
              : "bg-white"
          } flex justify-center items-center rounded-xl border-[1px] border-[#FE6F07] rounded-l-none w-[20%] p-2`}
        >
          <Text
            className={`${
              jobsStatus === "hired"
                ? "text-white"
                : "text-[#FE6F07]"
            }`}
          >
            {translateText("Hired", "تم")}
          </Text>
        </TouchableOpacity>
      </View>

      {user?.type === "employee" ? (
        <EmployeeMyJobs />
      ) : (
        <EmployerMyJobs />
      )}
    </ScrollView>
  );
};

export default memo(MyJobs);
