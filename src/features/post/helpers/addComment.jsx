import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addComment = createAsyncThunk(
  "/post/addComment",
  async (
    { post_id, token, comment_content, commented_by },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/comment/create/${post_id}/`,
        {
          comment_content: comment_content,
          commented_by: commented_by,
        },
        { headers: { authorization: token } }
      );
      console.log("Response from  create comment", response);
      const data = response.data;

      if (response.status === 201) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
