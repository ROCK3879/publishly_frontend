import { createSlice } from "@reduxjs/toolkit";
import {
  getUsers,
  deleteUser,
  updateUser,
  getProfiles,
  followUser,
  unFollowUser,
} from "./helpers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createProfile } from "./helpers/createProfile";
toast.configure();

const initialState = {
  users: [],
  profiles: [],
  upLoadingPhoto: false,
  isLoading: false,
  error: "",
  searchResults: [],
  searchQuery: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    startUpLoading: (state) => {
      state.upLoadingPhoto = true;
    },
    searchUser: (state, { payload }) => {
      state.searchQuery = payload;
      state.searchResults = state.users.filter(
        (user) =>
          user.user_username
            .toLowerCase()
            .includes(payload.trim().toLowerCase()) ||
          user.user_firstname
            .toLowerCase()
            .includes(payload.trim().toLowerCase()) ||
          user.user_lastname
            .toLowerCase()
            .includes(payload.trim().toLowerCase())
      );
    },
  },
  extraReducers: {
    //getUser

    [getUsers.pending]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.users = payload;
    },
    [getUsers.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    //get profiles

    [getProfiles.pending]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [getProfiles.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.profiles = payload;
    },
    [getProfiles.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },

    // Create Profile

    [createProfile.pending]: (state) => {
      state.upLoadingPhoto = false;
      state.error = "";
    },
    [createProfile.fulfilled]: (state, { payload }) => {
      state.posts = [payload, ...state.profiles]; // Add the new post to the posts array
      toast("Profile Created", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    },
    //Delete user
    [deleteUser.fulfilled]: (state, { payload }) => {
      // Remove the deleted user from the users array
      state.users = state.users.filter(
        (user) => user.user_id !== payload.user_id
      );
      toast("User Deleted", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    },
    [deleteUser.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    // updateUser

    [updateUser.pending]: (state) => {
      state.upLoadingPhoto = true;
      state.error = "";
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      state.upLoadingPhoto = false;
      state.users = state.users.map((user) =>
        user.username === payload.username ? payload : user
      );

      toast("Updated Profile", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    },

    [updateUser.rejected]: (state, { payload }) => {
      state.upLoadingPhoto = false;
      state.error = payload;
    },

    // follow user

    [followUser.pending]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [followUser.fulfilled]: (state, { payload }) => {
      // Get the user being followed and the user who is following
      const followedUserId = payload.followUser.user_id; // ID of the user being followed
      const followingUserId = payload.currentUser.user_id; // ID of the user following

      // Update the followers list of the followed user
      state.users = state.users.map((user) => {
        if (user.user_id === followedUserId) {
          // If this is the followed user, update their followers list
          return {
            ...user,
            followers: [
              ...user.followers,
              {
                user_id: followingUserId,
                user_username: payload.currentUser.user_username,
              },
            ],
          };
        }

        if (user.user_id === followingUserId) {
          // If this is the current user, update their following list
          return {
            ...user,
            following: [
              ...user.following,
              {
                user_id: followedUserId,
                user_username: payload.followUser.user_username,
              },
            ],
          };
        }

        return user;
      });

      state.isLoading = false;

      // Show notification
      toast("User Followed", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    },

    [followUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },

    //unfollow user

    [unFollowUser.pending]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [unFollowUser.fulfilled]: (state, { payload }) => {
      state.users = state.users.map((user) => {
        if (user.username === payload.followUser.username) {
          return payload.followUser;
        }
        if (user.username === payload.user.username) {
          return payload.user;
        }
        return user;
      });
      state.isLoading = false;
      toast("User Unfollowed", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    },
    [unFollowUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const { setLoading, startUpLoading, searchUser } = userSlice.actions;

export default userSlice.reducer;
