import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const dislikePost = createAsyncThunk(
  "post/dislikePost",
  async ({ postId, user_id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/posts/dislike/${postId}/`,
        {
          user_id: user_id,
        },
        { headers: { authorization: token } }
      );
      console.log("Response from  dislike a post", response);
      const data = response.data;

      if (response.status === 200) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
