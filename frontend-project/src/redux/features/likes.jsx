import { createSlice } from "@reduxjs/toolkit";
import likeApi from "../../api/like";

const likesSlice = createSlice({
  name: "like",
  initialState: {
    isliked: false,
    loading: false,
    error: null,
  },
  reducers: {
    resetlikeState: (state) => {
      state.loading = true;
      state.error = null;
    },

    setlikeState: (state, action) => {
      state.isliked = action.payload;
      state.loading = false;
    },

    togglelikeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  resetlikeState,
  setlikeState,
  togglelikeFailure,
} = likesSlice.actions;

export default likesSlice.reducer;

export const togglelikes = (videoId) => async (dispatch) => {
  try {
    dispatch(resetlikeState());
    const res = await likeApi.toggleVideoLike(videoId);
    const liked = res.data?.data.isliked ?? false;
    dispatch(setlikeState(liked));
    console.log(res);
    
    return liked;
  } catch (error) {
    dispatch(
      togglelikeFailure(error.response?.data?.message || "Failed to toggle like")
    );
    throw error;
  }
};
