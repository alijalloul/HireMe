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
    applicants: [],
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

      state.user = action.payload;
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
        job.id === action.payload?.id ? action.payload : job
      );
    },
    deleteSuccess: (state, action) => {
      state.pending = false;
      state.jobPosts = state.jobPosts?.filter(
        (post) => post?.id !== action.payload
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
      state.applicants.push(action.payload);
    },
    applySuccess: (state, action) => {
      state.pending = false;
    },
    hireSuccess: (state, action) => {
      state.pending = false;
      state.employeesByJobId = [];
      state.jobPosts = state.jobPosts?.filter(
        (item, index) => item?.id !== action.payload
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
  console.log("signing up");

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
      await AsyncStorage.setItem("token", JSON.stringify(data.token));

      if (data.user.accountType === "employee") {
        navigation.navigate("CV");
      } else if (data.user.accountType === "employer") {
        navigation.navigate("HomeTabs");
      }
    } else {
      dispatch(userSlice.actions.errorAPI());
    }
  } catch (error) {
    dispatch(userSlice.actions.errorAPI());
    console.log("error on signup: ", error);
  }
};

export const login = async (dispatch, user, navigation) => {
  dispatch(userSlice.actions.startAPI());
  console.log("logging in");

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

    dispatch(userSlice.actions.loginSuccess(data.user));

    await AsyncStorage.setItem("token", JSON.stringify(data.token));

    navigation.navigate("HomeTabs", { screen: "home" });
  } catch (error) {
    dispatch(userSlice.actions.errorAPI());
    console.log("error on login: ", error);
  }
};

export const logout = async (dispatch, navigation) => {
  dispatch(userSlice.actions.startAPI());
  console.log("loging out");

  try {
    dispatch(userSlice.actions.logoutSuccess());

    await AsyncStorage.removeItem("token");

    navigation.reset({
      index: 0,
      routes: [{ name: "onBoarding" }],
    });
  } catch (error) {
    dispatch(userSlice.actions.errorAPI());
    console.log("error on logout: ", error);
  }
};

export const updateUser = async (dispatch, newUser, navigation) => {
  dispatch(userSlice.actions.startAPI());
  console.log("updating user");

  try {
    const token = JSON.parse(await AsyncStorage.getItem("token"));

    const res = await fetch(`${BASE_URL}/users/${newUser?.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newUser),
    });

    const data = await res.json();

    dispatch(userSlice.actions.editSuccess(data));

    navigation.navigate("HomeTabs", { screen: "home" });
  } catch (error) {
    dispatch(userSlice.actions.errorAPI());

    console.log("error updating the user: ", error);
  }
};

export const editUser = async (dispatch, user, screenName, navigation) => {
  dispatch(userSlice.actions.editSuccess(user));

  if (navigation) {
    navigation.navigate(screenName);
  }
};

export const createJobPost = async (dispatch, postsInfo) => {
  dispatch(userSlice.actions.startAPI());
  console.log("creating job post");

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
  } catch (error) {
    dispatch(userSlice.actions.errorAPI());
    console.log("error creating job post: ", error);
  }
};

export const updateJobPost = async (dispatch, postsInfo) => {
  dispatch(userSlice.actions.startAPI());
  console.log("updating job post");

  try {
    const token = JSON.parse(await AsyncStorage.getItem("token"));

    const res = await fetch(`${BASE_URL}/jobPosts/${postsInfo?.id}`, {
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
    console.log("error updating job post: ", error);
  }
};

export const deleteJobPost = async (dispatch, postId) => {
  dispatch(userSlice.actions.startAPI());
  console.log("deleting job post");

  try {
    const token = JSON.parse(await AsyncStorage.getItem("token"));

    const apiUrl = `${BASE_URL}/jobPosts/${postId}`;

    await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    dispatch(userSlice.actions.deleteSuccess(postId));
  } catch (error) {
    dispatch(userSlice.actions.errorAPI());
    console.log("error deleting job post: ", error);
  }
};

export const fetchJobsByEmployer = async (dispatch, userId) => {
  dispatch(userSlice.actions.startAPI());
  console.log("fetching jobs by employer");

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
    console.log("error fetching jobs by employer: ", error);
  }
};

export const fetchPostsAplliedToByUser = async (dispatch, userId) => {
  dispatch(userSlice.actions.startAPI());
  console.log("fetching posts applied to by user");

  try {
    const token = JSON.parse(await AsyncStorage.getItem("token"));

    const res = await fetch(`${BASE_URL}/users/${userId}/applications`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    dispatch(userSlice.actions.fetchByIdSuccess(data));
  } catch (error) {
    dispatch(userSlice.actions.errorAPI());
    console.log("error fetching posts applied to by user: ", error);
  }
};

export const fetchApplicants = async (dispatch, jobId) => {
  dispatch(userSlice.actions.startAPI());
  console.log("fetching applicants");

  try {
    const token = JSON.parse(await AsyncStorage.getItem("token"));

    console.log("jobId: ", jobId);

    const res = await fetch(`${BASE_URL}/jobPosts/${jobId}/applicants`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    dispatch(userSlice.actions.fetchEmployeesSuccess(data));
  } catch (error) {
    dispatch(userSlice.actions.errorAPI());
    console.log("error fetching applicants: ", error);
  }
};

export const hireEmployee = async (dispatch, jobId, employeeId, navigation) => {
  dispatch(userSlice.actions.startAPI());
  console.log("hiring employee");

  try {
    await fetch(`${BASE_URL}/job/${jobId}/employee/${employeeId}`, {
      method: "GET",
    });

    dispatch(userSlice.actions.hireSuccess(jobId));

    navigation.navigate("HomeTabs", { screen: "home" });
  } catch (error) {
    dispatch(userSlice.actions.errorAPI());
    console.log("error hiring employee: ", error);
  }
};

export const handleApply = async (
  dispatch,
  jobId,
  employeeId,
  employerId,
  coverLetter,
  navigation
) => {
  dispatch(userSlice.actions.startAPI());
  console.log("applying to job");

  try {
    const token = JSON.parse(await AsyncStorage.getItem("token"));

    await fetch(`${BASE_URL}/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        jobId,
        employeeId,
        employerId,
        coverLetter,
      }),
    });

    dispatch(userSlice.actions.applySuccess());

    navigation.navigate("home");
  } catch (error) {
    dispatch(userSlice.actions.errorAPI());
    console.log("error applying to job: ", error);
  }
};

export const { loginSuccess, errorAPI } = userSlice.actions;
export default userSlice.reducer;
