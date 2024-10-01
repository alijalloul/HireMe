import React from "react";
import {
  I18nManager,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import blobTop from "@/assets/images/blobTop.png";
import { hireEmployee } from "@/redux/User";

const UserDetails = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const { userId } = route.params;
  const jobPostId = useSelector(
    (state) => state.user?.jobPostId
  );
  const user = useSelector(
    (state) => state.user?.employeesByJobId
  )?.filter(
    (item) => item._id === userId && item
  )[0];

  const handleHire = () => {
    hireEmployee(
      jobPostId,
      userId,
      navigation,
      dispatch
    );
  };

  const translateText = (text, arabicText) => {
    return I18nManager.isRTL ? arabicText : text;
  };

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={blobTop}
        className="absolute -top-72 opacity-90"
      />

      <View className="my-8 w-full">
        <Text className="font-garamond text-center text-5xl text-white">
          {translateText(
            user?.name,
            "اسم المستخدم"
          )}
        </Text>
      </View>

      <View style={{ width: 250, height: 250 }}>
        <Image
          source={
            user?.image !== ""
              ? { uri: user?.image }
              : null
          }
          className="rounded-full w-full h-full"
        />
      </View>

      <Text className="font-garamond text-center text-xl ">
        {translateText(
          user?.profession,
          "المهنة"
        )}
      </Text>

      <View className="w-[90%] my-8">
        <Text className="font-garamond text-center text-xl ">
          {translateText(
            user?.introduction,
            "مقدمة"
          )}
        </Text>
      </View>

      <View className="w-full my-5 flex-1">
        <View className="flex-1 w-[90%] self-center">
          <Text
            style={{ fontSize: 32 }}
            className="font-garamond-semibold mb-5"
          >
            {translateText(
              "Work Experience",
              "خبرة العمل"
            )}
          </Text>
          <View>
            {user?.workExperience?.length > 0 ? (
              user?.workExperience.map(
                (work, index) => (
                  <View
                    key={index}
                    className="relative w-full border-[1px] rounded-2xl p-5 pt-3 pr-3 mb-4"
                  >
                    <View className="flex flex-row w-full justify-end items-center"></View>
                    <Text className="font-garamond text-3xl">
                      {translateText(
                        work.title,
                        work.title
                      )}
                    </Text>
                    <Text className="font-garamond text-[15px]">
                      {translateText(
                        work.company,
                        work.company
                      )}
                    </Text>
                    <Text className="font-garamond text-xl">
                      {translateText(
                        work.startMonthWork +
                          " " +
                          work.startYear +
                          " - " +
                          work.endMonthWork +
                          " " +
                          work.endYear,
                        work.startMonthWork +
                          " " +
                          work.startYear +
                          " - " +
                          work.endMonthWork +
                          " " +
                          work.endYear
                      )}
                    </Text>
                    <Text className="font-garamond text-[15px] opacity-70 mb-3">
                      {translateText(
                        work.country +
                          ", " +
                          work.location,
                        work.country +
                          ", " +
                          work.location
                      )}
                    </Text>
                    <Text className="font-garamond text-lg opacity-70">
                      {translateText(
                        work.description,
                        work.description
                      )}
                    </Text>
                  </View>
                )
              )
            ) : (
              <Text className="text-center opacity-50 font-garamond">
                {translateText(
                  "no work experience",
                  "لا توجد خبرة عمل"
                )}
              </Text>
            )}
          </View>
        </View>
      </View>

      <View className="w-full my-5 flex-1">
        <View className="flex-1 w-[90%] self-center">
          <Text
            style={{ fontSize: 32 }}
            className="font-garamond-semibold mb-5"
          >
            {translateText(
              "Education",
              "التعليم"
            )}
          </Text>

          <View>
            {user?.education?.length > 0 ? (
              user?.education?.map(
                (educ, index) => (
                  <View
                    key={index}
                    className="relative w-full border-[1px] rounded-2xl p-5 pt-3 pr-3 mb-4"
                  >
                    <View className="flex flex-row w-full justify-end items-center"></View>
                    <Text className="font-garamond text-3xl">
                      {translateText(
                        educ.degree +
                          (educ.major
                            ? " in"
                            : " from"),
                        educ.degree +
                          (educ.major
                            ? " في"
                            : " من")
                      )}
                    </Text>
                    {educ.major && (
                      <Text className="font-garamond text-[15px]">
                        {translateText(
                          educ.major + " from",
                          educ.major + " من"
                        )}
                      </Text>
                    )}
                    <Text className="font-garamond text-lg">
                      {translateText(
                        educ.school,
                        educ.school
                      )}
                    </Text>
                    <Text className="font-garamond text-[15px] opacity-70 mb-3">
                      {translateText(
                        educ.startYear +
                          " - " +
                          educ.endYear,
                        educ.startYear +
                          " - " +
                          educ.endYear
                      )}
                    </Text>
                    <Text className="font-garamond text-lg opacity-70">
                      {translateText(
                        educ.note,
                        educ.note
                      )}
                    </Text>
                  </View>
                )
              )
            ) : (
              <Text className="text-center opacity-50 font-garamond">
                {translateText(
                  "no education",
                  "لا توجد تعليم"
                )}
              </Text>
            )}
          </View>
        </View>
      </View>

      <View className="w-full my-5 flex-1">
        <View className="flex-1 w-[90%] self-center">
          <Text
            style={{ fontSize: 32 }}
            className="font-garamond-semibold mb-5"
          >
            {translateText("Languages", "اللغات")}
          </Text>
          <View>
            {user?.language?.length > 0 ? (
              user?.language.map(
                (langArr, index) => (
                  <View
                    key={index}
                    className="relative w-full py-3 border-t-[1px] border-b-[1px] mb-4"
                  >
                    <View className="flex flex-row justify-center items-center">
                      <View
                        onPress={() => {
                          setLanguageIndex(index);
                          setIsEditing(true);

                          setLanguage(
                            langArr.language
                          );
                          setProficiency(
                            langArr.proficiency
                          );

                          setBottomSheetVisible(
                            true
                          );
                        }}
                        className="border-[1px] rounded-2xl px-2 py-2 mr-2 w-[35%] flex flex-row justify-between items-center"
                      >
                        <Text className="font-garamond text-xl">
                          {translateText(
                            langArr.language,
                            langArr.language
                          )}
                        </Text>
                      </View>
                      <View
                        onPress={() => {
                          setLanguageIndex(index);
                          setIsEditing(true);

                          setLanguage(
                            langArr.language
                          );
                          setProficiency(
                            langArr.proficiency
                          );

                          setBottomSheetVisible(
                            true
                          );
                        }}
                        className="border-[1px] rounded-2xl px-2 py-2 mr-3 w-[45%] flex flex-row justify-between items-center"
                      >
                        <Text className="font-garamond text-xl">
                          {translateText(
                            langArr.proficiency,
                            langArr.proficiency
                          )}
                        </Text>
                      </View>
                    </View>
                  </View>
                )
              )
            ) : (
              <Text className="text-center opacity-50 font-garamond">
                {translateText(
                  "no languages",
                  "لا توجد لغات"
                )}
              </Text>
            )}
          </View>
        </View>

        <View className="w-[90%] flex self-center">
          <Text className="font-garamond text-2xl mb-4">
            {translateText(
              "Cover Letter",
              "رسالة تغطية"
            )}
          </Text>

          <View className="border-[1px] rounded-xl p-5">
            <Text className="font-garamond">
              {translateText(
                user?.coverLetter,
                user?.coverLetter
              )}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          handleHire();
        }}
        className="self-end w-32 h-12 flex justify-center items-center bottom-0 right-0 mr-3 mb-3 bg-[#FE6F07] rounded-xl"
      >
        <Text className="text-lg font-garamond text-white">
          {translateText("Hire", "توظيف")}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default UserDetails;
