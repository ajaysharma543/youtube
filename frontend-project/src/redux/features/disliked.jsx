import { createSlice } from "@reduxjs/toolkit";
import dislikeApi from "../../api/dislike";

const dislikesSlice = createSlice({
  name: "dislike",
  initialState: {
    isDisliked: false,
    dislikeCount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    resetdislikeState: (state) => {
      state.loading = true;
      state.error = null;
    },
    setdislikeState: (state, action) => {
      const { isDisliked, dislikeCount } = action.payload;
      if (isDisliked !== undefined) state.isDisliked = isDisliked;
      if (dislikeCount !== undefined) state.dislikeCount = dislikeCount;
      state.loading = false;
    },
    toggledislikeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { resetdislikeState, setdislikeState, toggledislikeFailure } =
  dislikesSlice.actions;
export default dislikesSlice.reducer;

// ✅ Thunk
export const toggledislikes = (videoId) => async (dispatch) => {
  try {
    dispatch(resetdislikeState());
    const res = await dislikeApi.toggleVideodisLike(videoId);
    const { isDisliked, dislikeCount, likeCount } = res.data?.data || {};
    dispatch(setdislikeState({ isDisliked, dislikeCount }));
    return { isDisliked, dislikeCount, likeCount };
  } catch (error) {
    dispatch(
      toggledislikeFailure(
        error.response?.data?.message || "Failed to toggle dislike"
      )
    );
    throw error;
  }
};
