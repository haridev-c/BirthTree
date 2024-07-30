import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

const initialState = {
  userDetails: null,
  status: "idle",
  error: null,
};

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/users/login", { email, password });
      return response.data;
    } catch (error) {
      console.log(error);
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        return rejectWithValue({ message: "No response from the server" });
      } else {
        return rejectWithValue({
          message: error.message || "An unknown error occured",
        });
      }
    }
  },
);

export const fetchUserFromTokenThunk = createAsyncThunk(
  "user/fetchUser",
  async () => {
    try {
      const response = await axios.get("/users/user");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.userDetails = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.userDetails = action.payload.userDetails;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message || "An error occured";
      })
      .addCase(fetchUserFromTokenThunk.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.userDetails = action.payload.user;
      })
      .addCase(fetchUserFromTokenThunk.rejected, (state) => {
        state.userDetails = null;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
