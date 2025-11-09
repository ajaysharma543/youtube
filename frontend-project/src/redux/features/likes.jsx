import { createSlice } from "@reduxjs/toolkit";
import likeApi from "../../api/like";

const likesSlice = createSlice({
  name: "like",
  initialState: {
    isLiked: false,
    likeCount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    resetlikeState: (state) => {
      state.loading = true;
      state.error = null;
    },
    setlikeState: (state, action) => {
      const { isLiked, likeCount } = action.payload;
      if (isLiked !== undefined) state.isLiked = isLiked;
      if (likeCount !== undefined) state.likeCount = likeCount;
      state.loading = false;
    },
    togglelikeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { resetlikeState, setlikeState, togglelikeFailure } = likesSlice.actions;
export default likesSlice.reducer;

// ✅ Thunk
export const togglelikes = (videoId) => async (dispatch) => {
  try {
    dispatch(resetlikeState());
    const res = await likeApi.toggleVideoLike(videoId);
    const { isLiked, likeCount, dislikeCount } = res.data?.data || {};
    dispatch(setlikeState({ isLiked, likeCount }));
    return { isLiked, likeCount, dislikeCount };
  } catch (error) {
    dispatch(togglelikeFailure(error.response?.data?.message || "Failed to toggle like"));
    throw error;
  }
};
