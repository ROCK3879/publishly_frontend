import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const deleteComment = createAsyncThunk(
  "/post/deleteComment",
  async ({ comment_id }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/comment/${comment_id}/`
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
