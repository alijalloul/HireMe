import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

import BASE_URL_LOCAL from "./BASE_URL_LOCAL";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL || BASE_URL_LOCAL;

const userSlice = createSlice({
  name: "user",
  initialState: {
    appLanguage: null,
    userInfo: {},
    jobPosts: [],
    employeesByJobId: [],
    jobPostId: null,
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
    signupSuccess: (state) => {
      state.pending = false;
    },
    loginSuccess: (state, action) => {
      state.pending = false;
      state.userInfo = action?.payload;
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
        job.id === action.payload.id ? action.payload : job
      );
    },
    deleteSuccess: (state, action) => {
      state.pending = false;
      state.jobPosts = state.jobPosts?.filter(
        (post) => post.id !== action.payload
      );
    },
    editSuccess: (state, action) => {
      state.pending = false;
      state.userInfo = action.payload;
    },

    fetchByIdSuccess: (state, action) => {
      state.pending = false;

      console.log("action payload: ", action.payload);
      state.jobPosts = action.payload;
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
        (item, index) => item.id !== action.payload
      );
    },
    errorAPI: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
});

export const signup = async (userInfo, navigation, dispatch) => {
  dispatch(userSlice.actions.startAPI());

  console.log(userInfo);

  try {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    dispatch(userSlice.actions.signupSuccess());

    navigation.navigate("onBoarding");
  } catch (error) {
    dispatch(userSlice.actions.errorAPI());
    console.log("error: ", error);
  }
};

export const login = async (userInfo, navigation, dispatch) => {
  dispatch(userSlice.actions.startAPI());

  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    const data = await res.json();

    if (res.status !== 200) {
      dispatch(userSlice.actions.errorAPI());

      return data.message;
    }

    dispatch(userSlice.actions.loginSuccess(data.user));

    await AsyncStorage.setItem("profile", JSON.stringify(data));

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

    const res = await fetch(`${BASE_URL}/users/${newUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newUser),
    });

    const data = await res.json();

    dispatch(userSlice.actions.editSuccess(data));

    await AsyncStorage.setItem(
      "profile",
      JSON.stringify({ user: data, token: token })
    );

    navigation.navigate("HomeTabs", { screen: "home" });
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
    const token = JSON.parse(await AsyncStorage.getItem("profile")).token;

    const res = await fetch(`${BASE_URL}/jobPosts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postsInfo),
    });

    const data = await res.json();

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

export const fetchJobsByEmployer = async (userId, dispatch) => {
  dispatch(userSlice.actions.startAPI());

  try {
    const token = JSON.parse(await AsyncStorage.getItem("profile")).token;

    console.log("userId: ", userId);
    const res = await fetch(`${BASE_URL}/users/${userId}/jobPosts`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

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
  jobid,
  employeeid,
  employerid,
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
        jobid,
        employeeid,
        employerid,
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

export const { loginSuccess, errorAPI } = userSlice.actions;
export default userSlice.reducer;
