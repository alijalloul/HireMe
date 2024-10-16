import GaramondText from "@/components/GaramondText";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

import SpinnerScrollbar from "@/components/SpinnerScrollbar";
import EmployeeMyJobs from "./components/EmployeeMyJobs";
import EmployerMyJobs from "./components/EmployerMyJobs/EmployerMyJobs.jsx";

const MyJobs = ({ navigation }) => {
  const user = useSelector((state) => state.user.user);

  const [jobsStatus, setJobsStatus] = useState("pending");

  return (
    <SpinnerScrollbar>
      <View className=" flex flex-row justify-center items-center mb-5">
        <TouchableOpacity
          onPress={() => {
            setJobsStatus("pending");
          }}
          className="flex justify-center items-center rounded-xl border  rounded-r-none w-[20%] p-2"
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
          className="flex justify-center items-center rounded-xl border  rounded-l-none w-[20%] p-2"
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
        user?.accountType === "employer" && (
          <EmployerMyJobs navigation={navigation} jobsStatus={jobsStatus} />
        )
      )}
    </SpinnerScrollbar>
  );
};

export default MyJobs;
