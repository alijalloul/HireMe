import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

import BASE_URL from "./BASE_URL";

const postSlice = createSlice({
  name: "post",
  initialState: {
    postInfoById: null,
    postsInfo: [],
    numberOfPages: null,
    pending: false,
    error: false,
  },
  reducers: {
    startAPI: (state) => {
      state.pending = true;
    },

    fetchSuccess: (state, action) => {
      state.pending = false;
      state.postsInfo = action.payload.data;
      state.numberOfPages = action.payload.numberOfPages;
    },
    errorAPI: (state) => {
      state.pending = null;
      state.error = true;
    },
  },
});

export const fetchPosts = async (dispatch, page, searchQuery) => {
  dispatch(postSlice.actions.startAPI());

  try {
    const token = JSON.parse(await AsyncStorage.getItem("token")).token;

    const res = await fetch(
      `${BASE_URL}/jobPosts?search=${searchQuery || "none"}&page=${page}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    console.log("number of opages: ", data.numberOfPages);

    dispatch(postSlice.actions.fetchSuccess(data));
  } catch (error) {
    dispatch(postSlice.actions.errorAPI());
    console.log("error: ", error);
  }
};

// export const fetchPostsByFilter = async (
//   company,
//   location,
//   country,
//   category,
//   skills,
//   jobExperience,
//   jobType,
//   page,
//   dispatch
// ) => {
//   dispatch(postSlice.actions.startAPI());

//   try {
//     const queryParams = new URLSearchParams({
//       company: company || "none",
//       location: location || "none",
//       country: country || "none",
//       category: category || "none",
//       skills: skills || "none",
//       jobExperience: jobExperience || "none",
//       jobType: jobType || "none",
//       page: page || "1", // Set a default value for page if it's not provided
//     });

//     const url = `${BASE_URL}/filter?${queryParams.toString()}`;

//     const res = await fetch(url, {
//       mode: "cors",
//     });
//     const data = await res.json();

//     dispatch(postSlice.actions.fetchSuccess(data));
//   } catch (error) {
//     dispatch(postSlice.actions.errorAPI());
//     console.log("error: ", error);
//   }
// };

export default postSlice.reducer;
