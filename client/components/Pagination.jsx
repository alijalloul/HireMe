import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";
import { useIsFocused } from "@react-navigation/native";
import React, { memo, useEffect, useState } from "react";
import { Image, Text, TouchableWithoutFeedback, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import chevronLeft from "@/assets/images/chevronLeft.png";
import chevronRight from "@/assets/images/chevronRight.png";
import doubleChevronLeft from "@/assets/images/doubleChevronLeft.png";
import doubleChevronRight from "@/assets/images/doubleChevronRight.png";
import { fetchPosts } from "@/redux/JobPost.js";
import { fetchJobsByEmployer, fetchPostsAplliedToByUser } from "@/redux/User";

const Pagination = ({ fetchType }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const userId = useSelector((state) => state.user.user)?.id;
  const numberOfPages = useSelector((state) => state.jobPosts.numberOfPages);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (userId) {
      if (fetchType === "postsByUserId") {
        fetchJobsByEmployer(userId, dispatch);
      } else if (fetchType === "postsByEmployeeId") {
        fetchPostsAplliedToByUser(userId, currentPage, dispatch);
      } else if (fetchType === "posts") {
        fetchPosts(dispatch, currentPage);
      }
    }
  }, [currentPage, isFocused]);

  if (numberOfPages < 2) return null;

  return (
    <View className="flex flex-row justify-between items-center w-[90%] mb-10">
      <View className="flex flex-row justify-center items-center">
        <Chevron
          image={doubleChevronLeft}
          value={1}
          setCurrentPage={setCurrentPage}
        />

        <View className="mx-4"></View>

        <Chevron
          image={chevronLeft}
          value={currentPage - 1 > 0 && currentPage - 1}
          setCurrentPage={setCurrentPage}
        />
      </View>

      <GaramondText className=" font-garamond-bold text-xl">
        {currentPage}/{numberOfPages}
      </GaramondText>

      <View className="flex flex-row justify-center items-center">
        <Chevron
          image={chevronRight}
          value={currentPage < numberOfPages && currentPage + 1}
          setCurrentPage={setCurrentPage}
        />

        <View className="mx-4"></View>

        <Chevron
          image={doubleChevronRight}
          value={numberOfPages}
          setCurrentPage={setCurrentPage}
        />
      </View>
    </View>
  );
};

export default Pagination;

const Chevron = ({ image, value, setCurrentPage }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setCurrentPage(value);
      }}
      className=""
    >
      <Image source={image} className="w-5 h-5" />
    </TouchableWithoutFeedback>
  );
};
