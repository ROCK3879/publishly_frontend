import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const deleteComment = createAsyncThunk(
  "/post/deleteComment",
  async ({ comment_id }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://publishly-backend-8e89adfbeaf2.herokuapp.com/api/comment/${comment_id}/`
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
