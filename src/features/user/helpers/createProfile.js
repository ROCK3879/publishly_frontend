import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createProfile = createAsyncThunk(
  "profile/create",
  async (
    { token, user_id, profilePicture, user_bio, user_website },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `https://publishly-backend-8e89adfbeaf2.herokuapp.com/api/profile/create/${user_id}/`,
        {
          user_profile_picture: profilePicture,
          user_website: user_website,
          user_bio: user_bio,
        },
        { headers: { authorization: token } }
      );
      const data = response.data;

      console.log("Response from  create profile", data);

      if (response.status === 201) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
