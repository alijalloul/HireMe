import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import GaramondText from "@/components/GaramondText";
import { fetchPostsAplliedToByUser } from "@/redux/User";
import { useEffect } from "react";
import PostJobDisplayer from "./PostJobDisplayer";

const EmployeeMyJobs = ({ navigation, jobsStatus }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const jobs = user.jobPosts?.filter((job) => job.status === jobsStatus);
  const userId = user.user?.id;

  useEffect(() => {
    console.log("fetching the jobs employer...");

    fetchPostsAplliedToByUser(dispatch, userId);
  }, []);

  return (
    <View className="flex-1 flex justify-center items-center w-full">
      <View className="flex-1 w-[90%] mb-5">
        {!jobs.length && (
          <View className="flex-1 justify-center items-center">
            <GaramondText className="mb-5 text-lg opacity-60">
              {jobsStatus === "pending" &&
                "You Have Not Applied to Any Job Yet."}
            </GaramondText>
          </View>
        )}

        <View className="flex-1 self-center w-full">
          <PostJobDisplayer />
        </View>
      </View>
    </View>
  );
};

export default EmployeeMyJobs;
