import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import EmployeeJobs from "@/components/EmployeeJobs";
import Pagination from "@/components/Pagination";

const EmployeeMyJobs = ({ navigation, jobsStatus }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.userInfo);
  const page = useSelector((state) => state.user.currentPage);
  const numberOfPages = useSelector((state) => state.user.numberOfPages);

  return (
    <View className="flex-1 flex justify-center items-center">
      <EmployeeJobs navigation={navigation} jobsStatus={jobsStatus} />

      <Pagination
        fetchType="postsByEmployeeId"
        userId={user?.id}
        page={page}
        numberOfPages={numberOfPages}
      />
    </View>
  );
};

export default EmployeeMyJobs;
