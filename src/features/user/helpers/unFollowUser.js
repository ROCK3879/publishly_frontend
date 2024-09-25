import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const unFollowUser = createAsyncThunk(
  "user/unfollow",
  async ({ user_id, follower_user_id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://publishly-backend-8e89adfbeaf2.herokuapp.com/api/user/unfollow/${user_id}/`,
        {
          headers: { authorization: token },
          data: { follower_user_id: follower_user_id }, // Send data in 'data' field for DELETE requests
        }
      );

      const data = response.data;

      console.log("Response from unfollow user", data);

      if (response.status === 200) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
