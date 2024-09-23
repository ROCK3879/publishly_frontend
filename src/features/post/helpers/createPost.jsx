import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createPost = createAsyncThunk(
  "post/createPost",
  async (
    { content, category_id, url, token, user_id },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/post/create/${user_id}/`,
        {
          post_content: content,
          post_image_url: url,
          category_id: category_id,
        },
        { headers: { authorization: token } }
      );
      console.log("Response from  create post", response);
      const data = response.data;

      if (response.status === 201) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
