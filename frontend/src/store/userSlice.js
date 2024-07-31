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

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete("users/token");
      return response.data;
    } catch (error) {
      console.log("Error in logout thunk");
      console.error(error);
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        return rejectWithValue({ message: "No response from server" });
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
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/users/user");
      return response.data;
    } catch (error) {
      console.log(error);
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        return rejectWithValue({ message: "No response from server" });
      } else {
        return rejectWithValue({ message: error.message || "Unknow error" });
      }
    }
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
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
      .addCase(fetchUserFromTokenThunk.pending, (state) => {
        state.status = "fetching";
        state.error = null;
      })
      .addCase(fetchUserFromTokenThunk.fulfilled, (state, action) => {
        state.status = "idle";
        state.userDetails = action.payload.user;
        state.error = null;
      })
      .addCase(fetchUserFromTokenThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(logout.pending, (state) => {
        state.status = "logging out user";
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "idle";
        state.userDetails = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
