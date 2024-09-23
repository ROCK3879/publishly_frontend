import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProfiles = createAsyncThunk(
  "user/getProfiles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/profiles/");
      console.log("Response profiles", response);
      const data = response.data;

      if (response.status === 200) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
