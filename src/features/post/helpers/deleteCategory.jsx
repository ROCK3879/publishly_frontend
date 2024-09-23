import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteCategory = createAsyncThunk(
  "post/deleteCategory",
  async ({ category_id }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/category/${category_id}/`
      );
      console.log("Response Category", response);
      const data = response.data;

      if (response.status === 200) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
