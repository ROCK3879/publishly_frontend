import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const editCategory = createAsyncThunk(
  "post/editCategory",
  async (
    { category_id, category_name, category_slug },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/category/update/${category_id}/`,
        {
          category_name: category_name,
          category_slug: category_slug,
        }
      );
      const data = response.data;
      console.log("Response from  update category", data);
      if (response.status === 200) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
