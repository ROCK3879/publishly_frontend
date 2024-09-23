import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export const signUpHandler = createAsyncThunk(
  "auth/signUp",
  async (
    { user_firstname, user_lastname, user_username, user_email, password },
    { rejectWithValue }
  ) => {
    try {
      // Make the request to the login API
      const response = await axios.post(
        "http://127.0.0.1:8000/api/users/create/",
        {
          user_firstname: user_firstname,
          user_lastname: user_lastname,
          user_username: user_username,
          user_email: user_email,
          password: password,
        }
      );
      const data = response.data;

      // Log the response to verify
      console.log("Response", data);

      // If the response is successful, store the token and user data in localStorage
      if (response.status === 201) {
        localStorage.setItem(
          "Publishly_User",
          JSON.stringify({
            token: data.encodedToken,
            userData: data.foundUser,
          })
        );

        // Show success toast
        toast.success("Welcome Back!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });

        // Return the response data to Redux
        return data;
      } else {
        // If response status is not 200, throw an error
        throw new Error("Registration failed!");
      }
    } catch (error) {
      console.error("Error during registration request", error);

      // Show error toast
      toast.error("Registration failed!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });

      // Reject the promise with the error to handle it in the reducer
      return rejectWithValue(error.response.data || "Registration failed");
    }
  }
);
