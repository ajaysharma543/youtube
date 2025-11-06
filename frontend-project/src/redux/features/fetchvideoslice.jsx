import { createSlice } from "@reduxjs/toolkit";
import dashboardApi from "../../api/dashboard";

const initialState = {
  videos: [],
  loading: false,
  error: null,
};

const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    fetchVideosStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchVideosSuccess: (state, action) => {
      state.loading = false;
      state.videos = action.payload;
    },
    fetchVideosFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchVideosStart, fetchVideosSuccess, fetchVideosFailure } =
  videoSlice.actions;

// ✅ Thunk to fetch user videos
export const fetchUserVideos = () => async (dispatch) => {
  try {
    dispatch(fetchVideosStart());
    const res = await dashboardApi.dashboardvidoes();
    dispatch(fetchVideosSuccess(res.data.data));
  } catch (error) {
    dispatch(
      fetchVideosFailure(error.response?.data || "Failed to fetch videos")
    );
  }
};

export default videoSlice.reducer;
