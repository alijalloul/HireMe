import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";
import React, { memo, useCallback, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import EmployeeMyJobs from "./components/EmployeeMyJobs";
import EmployerMyJobs from "./components/EmployerMyJobs/EmployerMyJobs.jsx";

const MyJobs = ({ navigation }) => {
  const user = useSelector((state) => state.user.userInfo);

  const [jobsStatus, setJobsStatus] = useState("pending");

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      className="bg-white"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className=" flex flex-row justify-center items-center mb-5">
        <TouchableOpacity
          onPress={() => {
            setJobsStatus("pending");
          }}
          className="flex justify-center items-center rounded-xl border-[1px]  rounded-r-none w-[20%] p-2"
          style={
            jobsStatus === "pending"
              ? { backgroundColor: Colors.primary, borderColor: Colors.primary }
              : { backgroundColor: "white", borderColor: Colors.primary }
          }
        >
          <GaramondText
            style={
              jobsStatus === "pending"
                ? { color: "white" }
                : { color: Colors.primary }
            }
          >
            Pending
          </GaramondText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setJobsStatus("hired");
          }}
          className="flex justify-center items-center rounded-xl border-[1px]  rounded-l-none w-[20%] p-2"
          style={
            jobsStatus !== "pending"
              ? { backgroundColor: Colors.primary, borderColor: Colors.primary }
              : { backgroundColor: "white", borderColor: Colors.primary }
          }
        >
          <GaramondText
            style={
              jobsStatus !== "pending"
                ? { color: "white" }
                : { color: Colors.primary }
            }
          >
            Hired
          </GaramondText>
        </TouchableOpacity>
      </View>

      {user?.accountType === "employee" ? (
        <EmployeeMyJobs navigation={navigation} jobsStatus={jobsStatus} />
      ) : (
        <EmployerMyJobs navigation={navigation} jobsStatus={jobsStatus} />
      )}
    </ScrollView>
  );
};

export default memo(MyJobs);
