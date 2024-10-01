import { createSlice } from "@reduxjs/toolkit";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL || "http://192.168.1.3:5000";

const postSlice = createSlice({
  name: "post",
  initialState: {
    postInfoById: null,
    postsInfo: [],
    currentPage: 1,
    numberOfPages: null,
    pending: false,
    error: false,
  },
  reducers: {
    startAPI: (state) => {
      state.pending = true;
    },
    changePageSuccess: (state, action) => {
      state.pending = false;
      state.currentPage = action.payload;
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

export const changePage = async (page, dispatch) => {
  dispatch(postSlice.actions.startAPI());

  try {
    dispatch(postSlice.actions.changePageSuccess(page));
  } catch (error) {
    dispatch(postSlice.actions.errorAPI());
    console.log("error: ", error);
  }
};

export const fetchPosts = async (page, dispatch) => {
  dispatch(postSlice.actions.startAPI());

  try {
    const res = await fetch(`${BASE_URL}/posts/${page}`, {
      method: "GET",
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
    const res = await fetch(`${BASE_URL}/posts/search/${searchQuery || "none"}/${page}`, {
      mode: "cors",
    });
    const data = await res.json();

    dispatch(postSlice.actions.fetchSuccess(data));
  } catch (error) {
    dispatch(postSlice.actions.errorAPI());
    console.log("error: ", error);
  }
};

export const fetchPostsByFilter = async (company, location, country, category, skills, jobExperience, jobType, page, dispatch) => {
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
    const data = await res.json();

    dispatch(postSlice.actions.fetchSuccess(data));
  } catch (error) {
    dispatch(postSlice.actions.errorAPI());
    console.log("error: ", error);
  }
};

export default postSlice.reducer;
