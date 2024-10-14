import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

import BASE_URL from "./BASE_URL";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      telephone: "76131445",
      address: "lebanon",
      introduction: "wassup",
      profession: "web dev",
      workExperience: [
        {
          title: "Software Engineer",
          company: "TechCo Inc.",
          location: "San Francisco",
          country: "United States",
          startMonth: "January",
          startYear: "2018",
          endMonth: "December",
          endYear: "2022",
          description: "Developed web applications using React and Node.",
        },
        {
          title: "Product Manager",
          company: "Globex Corporation",
          location: "New York",
          country: "United States",
          startMonth: "March",
          startYear: "2015",
          endMonth: "January",
          endYear: "2018",
          description: "Led product development and strategy.",
        },
        {
          title: "UX Designer",
          company: "DesignTech Solutions",
          location: "London",
          country: "United Kingdom",
          startMonth: "July",
          startYear: "2013",
          endMonth: "December",
          endYear: "2014",
          description:
            "Designed user interfaces for mobile and web applications.",
        },
      ],
      education: [
        {
          degree: "Doctor of Philosophy (PHD)",
          major: "Computer Science",
          school: "University of Harvard",
          startYear: "2010",
          endYear: "2021",
          note: "Graduated with honors",
        },
        {
          degree: "Bachelor of Science (BS)",
          major: "Art and Design",
          school: "University of Tokyo",
          startYear: "2013",
          endYear: "2023",
          note: "Excellent student",
        },
      ],
      language: [{ language: "English", proficiency: "Native" }],
    },
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

    loginSuccess: (state, action) => {
      state.pending = false;

      state.user = action.payload.user;
      state.jobPosts = action.payload.jobPosts;
    },
    logoutSuccess: (state) => {
      state.pending = false;
      state.user = null;
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

      state.user = { ...state.user, ...action.payload };
    },

    fetchByIdSuccess: (state, action) => {
      state.pending = false;
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

export const signup = async (dispatch, user, navigation) => {
  dispatch(userSlice.actions.startAPI());

  try {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (res.status === 200) {
      const data = await res.json();

      dispatch(userSlice.actions.loginSuccess(data.user));

      await AsyncStorage.setItem("token", JSON.stringify(data));

      if (data.accountType === "employee") {
        navigation.navigate("CV");
      } else {
        navigation.navigate("HomeTabs");
      }
    } else {
      dispatch(userSlice.actions.errorAPI());
    }
  } catch (error) {
    dispatch(userSlice.actions.errorAPI());
    console.log("error: ", error);
  }
};

export const login = async (dispatch, user, navigation) => {
  dispatch(userSlice.actions.startAPI());

  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (res.status !== 200) {
      dispatch(userSlice.actions.errorAPI());

      return data.message;
    }

    dispatch(
      userSlice.actions.loginSuccess({
        user: data.user,
        jobPosts: user.jobPosts,
      })
    );

    await AsyncStorage.setItem("token", JSON.stringify(data.token));

    navigation.navigate("HomeTabs", { screen: "home" });
  } catch (error) {
    dispatch(userSlice.actions.errorAPI());
    console.log("error: ", error);
  }
};

export const logout = async (dispatch, navigation) => {
  dispatch(userSlice.actions.startAPI());

  try {
    dispatch(userSlice.actions.logoutSuccess());

    await AsyncStorage.removeItem("token");

    navigation.navigate("onBoarding");
  } catch (error) {
    dispatch(userSlice.actions.errorAPI());
    console.log("error: ", error);
  }
};

export const updateUser = async (dispatch, newUser, navigation) => {
  dispatch(userSlice.actions.startAPI());

  try {
    const token = JSON.parse(await AsyncStorage.getItem("token"));

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

export const editUser = async (dispatch, user, screenName, navigation) => {
  dispatch(userSlice.actions.startAPI());

  try {
    dispatch(userSlice.actions.editSuccess(user));

    if (navigation) {
      navigation.navigate(screenName);
    }

    // if (screenName) {
    //   const token = JSON.parse(await AsyncStorage.getItem("token"))?.token;

    //   await AsyncStorage.setItem(
    //     "profile",
    //     JSON.stringify({ user: user, token: token })
    //   );

    //   if (screenName !== "choose") {
    //     await AsyncStorage.setItem("screenName", screenName);
    //   }

    // }
  } catch (error) {
    dispatch(userSlice.actions.errorAPI());
    console.log("error: ", error);
  }
};

export const createJobPost = async (dispatch, postsInfo) => {
  dispatch(userSlice.actions.startAPI());

  try {
    const token = JSON.parse(await AsyncStorage.getItem("token"));

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

    await AsyncStorage.setItem("jobPosts", JSON.stringify(jobPosts.push(data)));
  } catch (error) {
    dispatch(userSlice.actions.errorAPI());
    console.log("error: ", error);
  }
};

export const updateJobPost = async (dispatch, postsInfo) => {
  dispatch(userSlice.actions.startAPI());

  try {
    const token = JSON.parse(await AsyncStorage.getItem("token"));

    const res = await fetch(`${BASE_URL}/jobPosts/${postsInfo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postsInfo),
    });

    const data = await res.json();

    dispatch(userSlice.actions.updatePostSuccess(data));
  } catch (error) {
    dispatch(userSlice.actions.errorAPI());
    console.log("error: ", error);
  }
};

export const deletePost = async (dispatch, selectedPostId) => {
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

export const fetchJobsByEmployer = async (dispatch, userId) => {
  dispatch(userSlice.actions.startAPI());

  try {
    const token = JSON.parse(await AsyncStorage.getItem("token"));

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

export const fetchPostsAplliedToByUser = async (dispatch, userId, page) => {
  dispatch(userSlice.actions.startAPI());

  try {
    const res = await fetch(`${BASE_URL}/employee/${userId}/${page}/posts`, {
      method: "GET",
    });

    const data = await res.json();

    dispatch(userSlice.actions.fetchByIdSuccess(data));
  } catch (error) {
    dispatch(userSlice.actions.errorAPI());
    console.log("error: ", error);
  }
};

export const fetchEmployeesByJobId = async (dispatch, jobId) => {
  dispatch(userSlice.actions.startAPI());

  try {
    const res = await fetch(`${BASE_URL}/job/${jobId}/employees`, {
      method: "GET",
    });

    const data = await res.json();

    dispatch(
      userSlice.actions.fetchEmployeesSuccess({ data: data, jobId: jobId })
    );
  } catch (error) {
    dispatch(userSlice.actions.errorAPI());
    console.log("error: ", error);
  }
};

export const hireEmployee = async (dispatch, jobId, employeeId, navigation) => {
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
    console.log("error: ", error);
  }
};

export const { loginSuccess, errorAPI } = userSlice.actions;
export default userSlice.reducer;
