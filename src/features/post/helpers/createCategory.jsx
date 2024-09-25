import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createCategory = createAsyncThunk(
  "post/createCategory",
  async ({ category_name, category_slug }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://publishly-backend-8e89adfbeaf2.herokuapp.com/api/category/create/",
        {
          category_name: category_name,
          category_slug: category_slug,
        }
      );
      console.log("Response from  create category", response);
      const data = response.data;

      if (response.status === 201) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
