import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllCategories = createAsyncThunk(
  "post/categories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://publishly-backend-8e89adfbeaf2.herokuapp.com/api/categories/"
      );
      console.log("Response categories", response);
      const data = response.data;

      if (response.status === 200) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
