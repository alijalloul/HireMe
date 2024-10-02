import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";
import { LinearGradient } from "expo-linear-gradient";
import { MotiText, MotiView, useDynamicAnimation } from "moti";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { editUser } from "@/redux/User";

const Choose = ({ navigation }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  const [type, setType] = useState(null);
  const [error, setError] = useState(false);

  const JobCardBackgroundAnimation = useDynamicAnimation(() => {
    return {
      backgroundColor: "white",
      borderColor: "black",
    };
  });

  const JobTextBackgroundAnimation = useDynamicAnimation(() => {
    return {
      color: "black",
    };
  });

  const animateJobCardBackground = () => {
    if (type === "employee") {
      JobCardBackgroundAnimation.animateTo(() => ({
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
      }));

      JobTextBackgroundAnimation.animateTo(() => ({
        color: "white",
      }));
    } else if (type === "employer") {
      JobCardBackgroundAnimation.animateTo(() => ({
        backgroundColor: "white",
        borderColor: "black",
      }));

      JobTextBackgroundAnimation.animateTo(() => ({
        color: "black",
      }));
    } else if (error) {
      console.log(error);
      JobCardBackgroundAnimation.animateTo(() => ({
        borderColor: "red",
      }));
    } else {
      JobCardBackgroundAnimation.animateTo(() => ({
        borderColor: "black",
      }));
    }
  };

  const ClientCardBackgroundAnimation = useDynamicAnimation(() => {
    return {
      backgroundColor: "white",
      borderColor: "black",
    };
  });

  const ClientTextBackgroundAnimation = useDynamicAnimation(() => {
    return {
      color: "black",
    };
  });

  const animateClientCardBackground = () => {
    if (type === "employer") {
      ClientCardBackgroundAnimation.animateTo(() => ({
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
      }));

      ClientTextBackgroundAnimation.animateTo(() => ({
        color: "white",
      }));
    } else if (type === "employee") {
      ClientCardBackgroundAnimation.animateTo(() => ({
        backgroundColor: "white",
        borderColor: "black",
      }));

      ClientTextBackgroundAnimation.animateTo(() => ({
        color: "black",
      }));
    } else if (error) {
      ClientCardBackgroundAnimation.animateTo(() => ({
        borderColor: "red",
      }));
    } else {
      ClientCardBackgroundAnimation.animateTo(() => ({
        borderColor: "black",
      }));
    }
  };

  useEffect(() => {
    animateClientCardBackground();
    animateJobCardBackground();

    if (type) {
      setError(false);
    }
  }, [type, error]);

  return (
    <View className="flex-1 bg-white items-center">
      <View className="my-5 flex justify-center items-center">
        <GaramondText className={`text-sm text-red-500 ${!error && "hidden"}`}>
          You need to choose an account type
        </GaramondText>
        <GaramondText className="text-5xl font-garamond">
          I am looking for...
        </GaramondText>
      </View>

      <MotiView
        state={JobCardBackgroundAnimation}
        className={`mb-10 w-[85%] h-[33%] border-[1px] rounded-lg `}
      >
        <View className="w-full h-full ">
          <View
            className={`absolute right-0 top-0 mr-2 mt-2 ${
              type === "employee" ? "bg-[#ffffffb5]" : "bg-white"
            } border-2 rounded-full p-[6px]`}
          >
            <LinearGradient
              colors={[
                "white",
                type === "employee" ? Colors.primary : "rgba(0,0,0,0.4)",
              ]}
              start={{ x: 0, y: 0.4 }}
              className="p-[8px] rounded-full"
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              setType("employee");
            }}
            className="w-full h-full flex justify-center items-center"
          >
            <MotiText state={JobTextBackgroundAnimation} className=" text-5xl">
              A Job
            </MotiText>
          </TouchableOpacity>
        </View>
      </MotiView>

      <MotiView
        state={ClientCardBackgroundAnimation}
        className={`mb-10 w-[85%] h-[33%] border-[1px] rounded-lg `}
      >
        <View className="w-full h-full">
          <View
            className={`absolute right-0 top-0 mr-2 mt-2 ${
              type === "employer" ? "bg-[#ffffffb5]" : "bg-white"
            } border-2 rounded-full p-[6px]`}
          >
            <LinearGradient
              colors={[
                "white",
                type === "employer" ? `${Colors.primary}` : "rgba(0,0,0,0.4)",
              ]}
              start={{ x: 0, y: 0.4 }}
              className="p-[8px] rounded-full"
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              setType("employer");
            }}
            className="w-full h-full flex justify-center items-center"
          >
            <MotiText
              state={ClientTextBackgroundAnimation}
              className=" text-5xl"
            >
              An Employee
            </MotiText>
          </TouchableOpacity>
        </View>
      </MotiView>

      <TouchableOpacity
        onPress={() => {
          type
            ? editUser({ ...userInfo, type: type }, "CV", navigation, dispatch)
            : setError(true);
        }}
        className={`absolute bottom-0 right-0 mb-3 mr-3 bg-[${Colors.primary}] rounded-xl px-10 py-2`}
      >
        <GaramondText className="text-lg text-white">Next</GaramondText>
      </TouchableOpacity>
    </View>
  );
};

export default Choose;
