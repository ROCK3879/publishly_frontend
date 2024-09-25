import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllPosts = createAsyncThunk(
  "post/getPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://publishly-backend-8e89adfbeaf2.herokuapp.com/api/posts/"
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
