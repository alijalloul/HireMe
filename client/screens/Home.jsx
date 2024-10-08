import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import searchIMG from "@/assets/images/search.png";

import FilterModal from "@/components/FilterModal";
import HeaderLeft from "@/components/Header/HeaderLeft";
import JobPosts from "@/components/JobPosts";
import Pagination from "@/components/Pagination";
import { fetchPostsBySearch } from "@/redux/JobPost";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();

  const [numberOfFilters, setNumberOfFilters] = useState(0);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    console.log("user: ", user);
  }, [user]);

  const page = useSelector((state) => state.jobPosts.currentPage);
  const numberOfPages = useSelector((state) => state.jobPosts.numberOfPages);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderLeft
          setBottomSheetVisible={setBottomSheetVisible}
          numberOfFilters={numberOfFilters}
        />
      ),
    });
  }, [navigation, numberOfFilters]);

  useEffect(() => {
    const setItem = async () => {
      try {
        await AsyncStorage.setItem("screenName", "HomeTabs");
      } catch (error) {
        console.log("async set screenName to hometabs error: ", error);
      }
    };

    setItem();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      className="flex-1 bg-white pb-8 "
      contentContainerStyle={{
        alignItems: "center",
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="w-[90%]">
        <View className="mb-5">
          <GaramondText className="text-xl text-gray-500">
            Hello {user?.name?.split(" ")[0]},
          </GaramondText>
          <GaramondText
            className={`font-garamond-bold text-2xl ${
              user?.type === "employer" && "hidden"
            }`}
          >
            Find your perfect job
          </GaramondText>
        </View>

        <View className="">
          <View className="flex flex-row mb-4">
            <TextInput
              value={search}
              onChangeText={(text) => {
                setSearch(text);
              }}
              placeholder="Find your job"
              className="w-[85%] rounded-xl bg-gray-100 mr-2 pl-4"
            />

            <TouchableOpacity
              onPress={() => {
                fetchPostsBySearch(search, page, dispatch);
              }}
              className="w-[15%] p-2 aspect-square rounded-xl "
              style={{ backgroundColor: Colors.primary }}
            >
              <Image
                source={searchIMG}
                resizeMode="contain"
                className="w-full h-full"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <JobPosts navigation={navigation} />

      <Pagination
        fetchType={"posts"}
        page={page}
        numberOfPages={numberOfPages}
      />

      <FilterModal
        bottomSheetVisible={bottomSheetVisible}
        setBottomSheetVisible={setBottomSheetVisible}
        navigation={navigation}
        page={page}
        setNumberOfFilters={setNumberOfFilters}
      />
    </ScrollView>
  );
};

export default Home;
