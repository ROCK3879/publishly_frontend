import { LineStyle, PermIdentity, Storefront } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to={"/admin/"} className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to={"/admin/users"} className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>

            <Link to={"/admin/posts"} className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Posts
              </li>
            </Link>

            <Link to={"/admin/categories"} className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Categories
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
