import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  users: null,
  error: null,
};

export const fetchAllUsersThunk = createAsyncThunk(
  "allUsers/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/users/all");
      return response.data;
    } catch (error) {
      console.log("Error in fetchAllUsersThunk() thunk");
      console.error(error);
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        return rejectWithValue({ message: "No response from server" });
      } else {
        return rejectWithValue({
          message: error.message || "Unknown error occured",
        });
      }
    }
  },
);

export const allUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsersThunk.pending, (state) => {
        state.status = "fetching";
        state.error = null;
      })
      .addCase(fetchAllUsersThunk.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = action.payload.allUsers;
        state.error = null;
      })
      .addCase(fetchAllUsersThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export default allUsersSlice.reducer;
