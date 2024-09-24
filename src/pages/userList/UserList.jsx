import React, { useState, useEffect } from "react";
import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutline from "@mui/icons-material/DeleteOutline";

import { getUsers } from "../../features/user/helpers";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { useSelector } from "react-redux";

export default function UserList() {
  const {
    posts: { posts },
    user: { users },
  } = useSelector((state) => state);
  console.log("All Posts", posts);
  const [data, setData] = useState(
    users.filter((user) => !user.is_superuser) // Exclude users with is_superuser set to true
  );

  const dispatch = useDispatch();
  const navigate = useNavigate(); // For redirection

  useEffect(() => {
    dispatch(getUsers()); // Fetch users
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 }, // Using user_id as id
    {
      field: "user",
      headerName: "Username",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src="/publishly_logo.jpg" alt="" />
            {params.row.user_username}
          </div>
        );
      },
    },
    { field: "user_email", headerName: "Email", width: 230 },
    { field: "user_firstname", headerName: "First Name", width: 150 },
    { field: "user_lastname", headerName: "Last Name", width: 150 },
    {
      field: "followers",
      headerName: "Followers",
      width: 150,
      valueGetter: (params) => params.row.followers.length, // Show count of followers
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/user/${params.row.id}`}>
              <button className="userListEdit">View</button>
            </Link>
          </>
        );
      },
    },
  ];

  // Map user data to fit the DataGrid's expected `id` format
  const rows = data.map((user) => ({
    id: user.user_id, // Mapping user_id to id for DataGrid
    user_username: user.user_username,
    user_email: user.user_email,
    user_firstname: user.user_firstname || "N/A",
    user_lastname: user.user_lastname || "N/A",
    followers: user.followers,
  }));

  return (
    <div className="userList">
      {/* Header with Create User Button */}
      <div className="userListHeader">
        <h2>Users</h2>
        <button
          className="createUserButton"
          onClick={() => navigate("/admin/newUser")} // Redirect to create user page
        >
          Create User
        </button>
      </div>

      <DataGrid
        rows={rows}
        disableSelectionOnClick
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 15]}
        checkboxSelection
      />
    </div>
  );
}
