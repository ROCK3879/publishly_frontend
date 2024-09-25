import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProfiles = createAsyncThunk(
  "user/getProfiles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://publishly-backend-8e89adfbeaf2.herokuapp.com/api/profiles/"
      );
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
