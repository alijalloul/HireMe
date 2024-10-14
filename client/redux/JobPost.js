import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

import BASE_URL from "./BASE_URL";

console.log("BASE_URL: ", BASE_URL);

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

export const fetchPosts = async (dispatch, page, searchQuery, filters) => {
  dispatch(postSlice.actions.startAPI());

  try {
    const token = JSON.parse(await AsyncStorage.getItem("token"));

    const queryString = `?company=${encodeURIComponent(
      filters.company
    )}&location=${encodeURIComponent(
      filters.location
    )}&country=${encodeURIComponent(
      filters.country
    )}&category=${encodeURIComponent(
      filters.category
    )}&skills=${encodeURIComponent(
      filters.skills.join(",")
    )}&experienceRequired=${encodeURIComponent(
      filters.experienceRequired
    )}&jobType=${encodeURIComponent(
      filters.jobType
    )}&page=${page}&searchQuery=${encodeURIComponent(searchQuery)}`;

    const apiUrl = `${BASE_URL}/jobPosts${queryString}`;

    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    dispatch(postSlice.actions.fetchSuccess(data));
  } catch (error) {
    dispatch(postSlice.actions.errorAPI());
    console.log("error: ", error);
  }
};

export default postSlice.reducer;
