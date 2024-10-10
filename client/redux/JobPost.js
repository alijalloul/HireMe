import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

import BASE_URL_LOCAL from "./BASE_URL_LOCAL";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL || BASE_URL_LOCAL;

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

export const fetchPosts = async (page, dispatch) => {
  dispatch(postSlice.actions.startAPI());

  try {
    const token = JSON.parse(await AsyncStorage.getItem("profile")).token;

    const res = await fetch(`${BASE_URL}/jobPosts/${page}`, {
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

export const fetchPostsBySearch = async (searchQuery, page, dispatch) => {
  dispatch(postSlice.actions.startAPI());

  try {
    const res = await fetch(
      `${BASE_URL}/posts/search/${searchQuery || "none"}/${page}`,
      {
        mode: "cors",
      }
    );
    const data = await reson();

    dispatch(postSlice.actions.fetchSuccess(data));
  } catch (error) {
    dispatch(postSlice.actions.errorAPI());
    console.log("error: ", error);
  }
};

export const fetchPostsByFilter = async (
  company,
  location,
  country,
  category,
  skills,
  jobExperience,
  jobType,
  page,
  dispatch
) => {
  dispatch(postSlice.actions.startAPI());

  try {
    const queryParams = new URLSearchParams({
      company: company || "none",
      location: location || "none",
      country: country || "none",
      category: category || "none",
      skills: skills || "none",
      jobExperience: jobExperience || "none",
      jobType: jobType || "none",
      page: page || "1", // Set a default value for page if it's not provided
    });

    const url = `${BASE_URL}/filter?${queryParams.toString()}`;

    const res = await fetch(url, {
      mode: "cors",
    });
    const data = await reson();

    dispatch(postSlice.actions.fetchSuccess(data));
  } catch (error) {
    dispatch(postSlice.actions.errorAPI());
    console.log("error: ", error);
  }
};

export default postSlice.reducer;
