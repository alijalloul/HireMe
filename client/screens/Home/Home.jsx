import GaramondText from "@/components/GaramondText";
import { Colors } from "@/constants/Colors";
import { useEffect, useLayoutEffect, useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import searchIMG from "@/assets/images/search.png";

import HeaderLeft from "@/components/Header/HeaderLeft";
import Pagination from "@/components/Pagination";
import SpinnerScrollbar from "@/components/SpinnerScrollbar";
import { fetchPosts } from "@/redux/JobPost";
import FilterModal from "@/screens/Home/components/FilterModal";
import JobPosts from "@/screens/Home/components/JobPosts";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();

  const [numberOfFilters, setNumberOfFilters] = useState(0);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    company: "",
    location: "",
    country: "",
    category: "",
    skills: [],
    experienceRequired: "",
    jobType: "",
  });

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const user = useSelector((state) => state.user.user);

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
    console.log("filters: ", filters);
  }, [filters]);

  useEffect(() => {
    fetchPosts(dispatch, currentPage, search, filters);
  }, [currentPage, filters]);

  return (
    <SpinnerScrollbar>
      <View className="w-[90%]">
        <View className="mb-5">
          <GaramondText className="text-xl text-gray-500">
            Hello {user?.name?.split(" ")[0]},
          </GaramondText>
          <GaramondText
            className={`font-garamond-bold text-2xl ${
              user?.accountType === "employer" && "hidden"
            }`}
          >
            Find your perfect job
          </GaramondText>
        </View>

        <View>
          <View className="flex flex-row justify-between items-center w-full">
            <TextInput
              value={search}
              onChangeText={(text) => {
                setSearch(text);
              }}
              placeholder="Find your job"
              className="w-[80%] rounded-xl bg-gray-100 h-full  pl-4"
            />

            <TouchableOpacity
              onPress={() => {
                fetchPosts(dispatch, currentPage, search, filters);
              }}
              className="w-[15%] p-2 aspect-square rounded-xl  "
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

      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <FilterModal
        filters={filters}
        setFilters={setFilters}
        bottomSheetVisible={bottomSheetVisible}
        setBottomSheetVisible={setBottomSheetVisible}
        setNumberOfFilters={setNumberOfFilters}
      />
    </SpinnerScrollbar>
  );
};

export default Home;
