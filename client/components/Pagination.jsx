import GaramondText from "@/components/GaramondText";
import { Image, TouchableWithoutFeedback, View } from "react-native";
import { useSelector } from "react-redux";

import chevronLeft from "@/assets/images/chevronLeft.png";
import chevronRight from "@/assets/images/chevronRight.png";
import doubleChevronLeft from "@/assets/images/doubleChevronLeft.png";
import doubleChevronRight from "@/assets/images/doubleChevronRight.png";

const Pagination = ({ currentPage, setCurrentPage }) => {
  const numberOfPages = useSelector((state) => state.jobPosts.numberOfPages);

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
