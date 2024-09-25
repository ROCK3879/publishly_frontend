import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async ({ postId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://publishly-backend-8e89adfbeaf2.herokuapp.com/api/post/${postId}/`
      );
      console.log("Response post", response);
      const data = response.data;

      if (response.status === 200) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
