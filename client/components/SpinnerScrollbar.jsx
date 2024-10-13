import { useSelector } from "react-redux";
import { ScrollView, RefreshControl, View } from "react-native";
import Spinner from "@/components/Spinner";
import { useCallback, useState } from "react";

const SpinnerScrollbar = ({ children }) => {
  const pending = useSelector(
    (state) => state.user.pending || state.jobPosts.pending
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View className="flex-1 justify-center bg-white">
      {pending && (
        <>
          <View className="absolute w-full h-full justify-center items-center">
            <Spinner />
          </View>
          <View className="bg-white z-20 absolute h-full w-full opacity-50"></View>
        </>
      )}

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {children}
      </ScrollView>
    </View>
  );
};

export default SpinnerScrollbar;
