import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const followUser = createAsyncThunk(
  "user/follow",
  async ({ user_id, follower_user_id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://publishly-backend-8e89adfbeaf2.herokuapp.com/api/user/follow/${user_id}/`,
        {
          follower_user_id: follower_user_id,
        },
        { headers: { authorization: token } }
      );
      const data = response.data;

      console.log("Response from  follow user", data);

      if (response.status === 201) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
