import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL || "http://192.168.1.3:5000";

const userSlice = createSlice({
  name: "user",
  initialState: {
    appLanguage: null,
    userInfo: {},
    jobPosts: [],
    employeesByJobId: [],
    jobPostId: null,
    currentPage: 1,
    numberOfPages: null,
    pending: false,
    error: false,
    errorType: null,
  },
  reducers: {
    startAPI: (state) => {
      state.pending = true;
    },
    editLanguageSuccess: (state, action) => {
      state.pending = false;
      state.appLanguage = action?.payload;
    },
    loginSuccess: (state, action) => {
      state.pending = false;
      state.userInfo = action?.payload.result;
    },
    logoutSuccess: (state) => {
      state.pending = false;
      state.userInfo = null;
    },
    sendOtpSuccess: (state) => {
      state.pending = false;
    },
    createSuccess: (state, action) => {
      state.pending = false;
      state.jobPosts.push(action.payload);
    },
    updatePostSuccess: (state, action) => {
      state.pending = false;
      state.jobPosts = state.jobPosts.map((job) =>
        job._id === action.payload._id ? action.payload : job
      );
    },
    deleteSuccess: (state, action) => {
      state.pending = false;
      state.jobPosts = state.jobPosts?.filter(
        (post) => post._id !== action.payload
      );
    },
    editSuccess: (state, action) => {
      state.pending = false;
      state.userInfo = action.payload;
    },
    changePageSuccess: (state, action) => {
      state.pending = false;
      state.currentPage = action.payload;
    },
    fetchByIdSuccess: (state, action) => {
      state.pending = false;
      state.jobPosts = action.payload.data;
      state.numberOfPages = action.payload.numberOfPages;
    },
    fetchEmployeesSuccess: (state, action) => {
      state.pending = false;
      state.jobPostId = action.payload.jobId;
      state.employeesByJobId = action.payload.data;
    },
    hireSuccess: (state, action) => {
      state.pending = false;
      state.employeesByJobId = [];
      state.jobPosts = state.jobPosts?.filter(
        (item, index) => item._id !== action.payload
      );
    },
    errorAPI: (state) => {
      state.pending = null;
      state.error = true;
    },
  },
});

export const editAppLanguage = async (language, navigation, dispatch) => {
  dispatch(userSlice.actions.startAPI());

  try {
    dispatch(userSlice.actions.editLanguageSuccess(language));

    await AsyncStorage.setItem("language", language);

    navigation?.navigate("onBoarding");
  } catch (error) {
    dispatch(userSlice.actions.errorAPI());
    console.log("error: ", error);
  }
};

export const editUser = async (userInfo, screenName, navigation, dispatch) => {
  dispatch(userSlice.actions.startAPI());

  try {
    dispatch(userSlice.actions.editSuccess(userInfo));

    if (screenName) {
      const token = JSON.parse(await AsyncStorage.getItem("profile"))?.token;
      await AsyncStorage.setItem(
        "profile",
        JSON.stringify({ result: userInfo, token: token })
      );

      if (screenName !== "choose") {
        await AsyncStorage.setItem("screenName", screenName);
      }

      navigation?.navigate(screenName);
    }
  } catch (error) {
    dispatch(userSlice.actions.errorAPI());
    console.log("error: ", error);
  }
};

export const createJobPost = async (postsInfo, dispatch) => {
  dispatch(userSlice.actions.startAPI());

  try {
    const res = await fetch(`${BASE_URL}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postsInfo),
    });

    const data = await reson();

    dispatch(userSlice.actions.createSuccess(data));
  } catch (error) {
    dispatch(userSlice.actions.errorAPI());
    console.log("error: ", error);
  }
};
export const updateJobPost = async (postsInfo, dispatch) => {
  dispatch(userSlice.actions.startAPI());

  try {
    const token = JSON.parse(await AsyncStorage.getItem("profile")).token;

    const res = await fetch(`${BASE_URL}/post`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postsInfo),
    });

    const data = await reson();

    dispatch(userSlice.actions.updatePostSuccess(data));
  } catch (error) {
    dispatch(userSlice.actions.errorAPI());
    console.log("error: ", error);
  }
};

export const deletePost = async (selectedPostId, dispatch) => {
  dispatch(userSlice.actions.startAPI());

  try {
    await fetch(`${BASE_URL}/post/${selectedPostId}`, {
      method: "DELETE",
    });
    dispatch(userSlice.actions.deleteSuccess(selectedPostId));
  } catch (error) {
    dispatch(userSlice.actions.errorAPI());
    console.log("error: ", error);
  }
};

export const sendotp = async (phoneNumber, navigation, dispatch) => {
  dispatch(userSlice.actions.startAPI());

  try {
    const res = await fetch(`${BASE_URL}/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber: phoneNumber }),
    });

    if (res.status !== 200) {
      const data = await reson();

      dispatch(userSlice.actions.errorAPI());

      return data.message;
    }

    dispatch(userSlice.actions.sendOtpSuccess());
    navigation.navigate("verification");
  } catch (error) {
    dispatch(userSlice.actions.errorAPI());
    console.log("error: ", error);
  }
};

export const resendotp = async (phoneNumber, dispatch) => {
  dispatch(userSlice.actions.startAPI());

  console.log(phoneNumber);

  try {
    const res = await fetch(`${BASE_URL}/resend-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber: phoneNumber }),
    });

    if (res.status !== 200) {
      const data = await reson();

      dispatch(userSlice.actions.errorAPI());

      return data.message;
    }

    dispatch(userSlice.actions.sendOtpSuccess());
  } catch (error) {
    dispatch(userSlice.actions.errorAPI());
    console.log("error: ", error);
  }
};

export const signup = async (userInfo, navigation, dispatch) => {
  dispatch(userSlice.actions.startAPI());

  console.log("base URL: ", BASE_URL);

  try {
    const res = await fetch(`${BASE_URL}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    const data = await reson();

    dispatch(userSlice.actions.loginSuccess(data));

    await AsyncStorage.setItem("profile", JSON.stringify({ ...data }));
    await AsyncStorage.setItem("screenName", "choose");

    navigation.navigate("choose");
  } catch (error) {
    dispatch(userSlice.actions.errorAPI());
    console.log("error: ", error);
  }
};

export const login = async (userInfo, navigation, dispatch) => {
  dispatch(userSlice.actions.startAPI());

  try {
    const res = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    const data = await reson();

    if (res.status !== 200) {
      dispatch(userSlice.actions.errorAPI());

      return data.message;
    }

    dispatch(userSlice.actions.loginSuccess(data));

    await AsyncStorage.setItem("profile", JSON.stringify({ ...data }));

    navigation.navigate("HomeTabs", { screen: "home" });
  } catch (error) {
    dispatch(userSlice.actions.errorAPI());
    console.log("error: ", error);
  }
};

export const logout = async (navigation, dispatch) => {
  dispatch(userSlice.actions.startAPI());

  try {
    dispatch(userSlice.actions.logoutSuccess());

    await AsyncStorage.removeItem("profile");

    navigation.navigate("onBoarding");
  } catch (error) {
    dispatch(userSlice.actions.errorAPI());
    console.log("error: ", error);
  }
};

export const updateUser = async (newUser, navigation, dispatch) => {
  dispatch(userSlice.actions.startAPI());

  try {
    const token = JSON.parse(await AsyncStorage.getItem("profile")).token;

    const res = await fetch(`${BASE_URL}/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newUser),
    });

    const data = await reson();

    console.log(data);
    dispatch(userSlice.actions.editSuccess(data));

    await AsyncStorage.setItem(
      "profile",
      JSON.stringify({ result: data, token: token })
    );

    navigation.navigate("HomeTabs", { screen: "home" });
  } catch (error) {
    dispatch(userSlice.actions.errorAPI());
    console.log("error: ", error);
  }
};

export const changePage = async (page, dispatch) => {
  dispatch(userSlice.actions.startAPI());

  try {
    dispatch(userSlice.actions.changePageSuccess(page));
  } catch (error) {
    dispatch(userSlice.actions.errorAPI());
    console.log("error: ", error);
  }
};

export const fetchJobsByEmployer = async (userId, page, dispatch) => {
  dispatch(userSlice.actions.startAPI());

  try {
    const res = await fetch(`${BASE_URL}/employer/${userId}/${page}/posts`, {
      method: "GET",
    });

    const data = await reson();

    dispatch(userSlice.actions.fetchByIdSuccess(data));
  } catch (error) {
    dispatch(userSlice.actions.errorAPI());
    console.log("error: ", error);
  }
};

export const fetchPostsAplliedToByUser = async (userId, page, dispatch) => {
  dispatch(userSlice.actions.startAPI());

  try {
    const res = await fetch(`${BASE_URL}/employee/${userId}/${page}/posts`, {
      method: "GET",
    });

    const data = await reson();

    dispatch(userSlice.actions.fetchByIdSuccess(data));
  } catch (error) {
    dispatch(userSlice.actions.errorAPI());
    console.log("error: ", error);
  }
};

export const fetchEmployeesByJobId = async (jobId, dispatch) => {
  dispatch(userSlice.actions.startAPI());

  try {
    const res = await fetch(`${BASE_URL}/job/${jobId}/employees`, {
      method: "GET",
    });

    const data = await reson();

    dispatch(
      userSlice.actions.fetchEmployeesSuccess({ data: data, jobId: jobId })
    );
  } catch (error) {
    dispatch(userSlice.actions.errorAPI());
    console.log("error: ", error);
  }
};

export const hireEmployee = async (jobId, employeeId, navigation, dispatch) => {
  dispatch(userSlice.actions.startAPI());

  try {
    await fetch(`${BASE_URL}/job/${jobId}/employee/${employeeId}`, {
      method: "GET",
    });

    dispatch(userSlice.actions.hireSuccess(jobId));

    navigation.navigate("HomeTabs", { screen: "home" });
  } catch (error) {
    dispatch(userSlice.actions.errorAPI());
    console.log("error: ", error);
  }
};

export const handleApply = async (
  job_id,
  employee_id,
  employer_id,
  status,
  category,
  coverLetter,
  navigation
) => {
  try {
    await fetch(`${BASE_URL}/application`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        job_id,
        employee_id,
        employer_id,
        status,
        category,
        coverLetter,
      }),
    });

    navigation.navigate("HomeTabs");
  } catch (error) {
    console.log("error message: ", error);
  }
};

export default userSlice.reducer;
