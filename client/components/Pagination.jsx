import { Colors } from '@/constants/Colors'
import GaramondText from "@/components/GaramondText";
import { useIsFocused } from "@react-navigation/native";
import React, { memo, useEffect, useState } from "react";
import { Image, Text, TouchableWithoutFeedback, View } from "react-native";
import { useDispatch } from "react-redux";

import chevronLeft from "@/assets/images/chevronLeft.png";
import chevronRight from "@/assets/images/chevronRight.png";
import doubleChevronLeft from "@/assets/images/doubleChevronLeft.png";
import doubleChevronRight from "@/assets/images/doubleChevronRight.png";
import { changePage, fetchPosts } from "@/redux/JobPost";
import {
  changeUserPostsPage,
  fetchJobsByEmployer,
  fetchPostsAplliedToByUser,
} from "@/redux/User";

const Pagination = ({ fetchType, userId, page, numberOfPages }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (fetchType === "postsById") {
      fetchJobsByEmployer(userId, page, dispatch);
    } else if (fetchType === "posts") {
      fetchPosts(page, dispatch);
    } else if (fetchType === "postsByEmployeeId") {
      fetchPostsAplliedToByUser(userId, page, dispatch);
    }
  }, [page, isFocused]);
  useEffect(() => {
    if (currentPage !== page) {
      if (fetchType === "postsById") {
        changeUserPostsPage(currentPage, dispatch);
      } else if (fetchType === "posts") {
        changePage(currentPage, dispatch);
      }
    }
  }, [currentPage]);

  const Chevron = ({ image, value }) => {
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

  return (
    <View
      className={`flex flex-row justify-between items-center w-[90%] ${
        numberOfPages ? numberOfPages < 2 && "hidden" : "hidden"
      }`}
    >
      <View className="flex flex-row justify-center items-center">
        {<Chevron image={doubleChevronLeft} value={1} />}
        <View className="mx-4"></View>
        {
          <Chevron
            image={chevronLeft}
            value={currentPage - 1 > 0 && currentPage - 1}
          />
        }
      </View>

      <GaramondText className=" font-garamond-bold text-xl">
        {currentPage}/{numberOfPages}
      </GaramondText>

      <View className="flex flex-row justify-center items-center">
        {
          <Chevron
            image={chevronRight}
            value={currentPage < numberOfPages && currentPage + 1}
          />
        }
        <View className="mx-4"></View>
        {<Chevron image={doubleChevronRight} value={numberOfPages} />}
      </View>
    </View>
  );
};

export default memo(Pagination);
