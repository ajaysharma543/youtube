import { createSlice } from "@reduxjs/toolkit";
import authApi from "../../api/userapi";

// ✅ Initial state
const initialState = {
  data: null,
  loading: false,
  error: null,
};

// ✅ Create slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    setUserSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    setUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.data = null;
    },
  },
});

export const { setUserStart, setUserSuccess, setUserFailure, logoutUser } =
  userSlice.actions;

export const fetchCurrentUser = () => async (dispatch) => {
  try {
    dispatch(setUserStart());
    const res = await authApi.getcurrentuser();
    dispatch(setUserSuccess(res.data.data));
  } catch (error) {
    dispatch(
      setUserFailure(error.response?.data || "Failed to fetch current user")
    );
  }
};

// ✅ Export reducer
export default userSlice.reducer;
