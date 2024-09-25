import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateUser = createAsyncThunk(
  "user/update",
  async (
    { token, profile_id, profilePicture, user_bio, user_website },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `https://publishly-backend-8e89adfbeaf2.herokuapp.com/api/profile/update/${profile_id}/`,
        {
          user_profile_picture: profilePicture,
          user_website: user_website,
          user_bio: user_bio,
        },
        { headers: { authorization: token } }
      );
      const data = response.data;

      console.log("Response from  update profile", data);

      if (response.status === 200) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
