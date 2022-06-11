import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import {
  CheckCircleOutline,
  Create,
  Done,
  ExitToApp,
  History,
  Home,
  MoreHoriz,
  Settings,
} from "@material-ui/icons";
export const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <div
            className="meu-home"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <h3 className="sidebarTitle">Admin |</h3>
            <li
              className=" active"
              style={{
                textDecoration: "underline",
                display: "flex",
                alignItems: "center",
                marginLeft: "10px",
              }}
            >
              <Link to="/" className="links">
                <Home style={{ fontSize: "12px" }} />
                <span style={{ fontSize: "12px", marginLeft: "5px" }}>
                  ALL MEMO
                </span>
              </Link>
            </li>
          </div>
          <ul className="sidebarList">
            <li className="sidebarItems">
              <Link to="/memo" className="links">
                <Create className="sidebarIcon" />
                <span className="menu-item">CREATE MEMO</span>
              </Link>
            </li>
            {/* <li className="sidebarItems">
              <Link to="/pending" className="links">
                <MoreHoriz className="sidebarIcon" />
                <span className="menu-item">PENDING MEMO</span>
              </Link>
            </li> */}
            {/* <li className="sidebarItems">
              <Link to="/pending" className="links">
                <CheckCircleOutline className="sidebarIcon" />
                <span className="menu-item">APPROVED MEMO</span>
              </Link>
            </li> */}
            <li className="sidebarItems">
              <Link to="/users" className="links">
                <Done className="sidebarIcon" />
                <span className="menu-item">USERS</span>
              </Link>
            </li>
            <li className="sidebarItems">
              <Link to="/archives" className="links">
                <History className="sidebarIcon" />
                <span className="menu-item">ARCHIVES</span>
              </Link>
            </li>
            <li className="sidebarItems">
              <Link to="/settings" className="links">
                <Settings className="sidebarIcon" />
                <span className="menu-item">Settings</span>
              </Link>
            </li>
            <li className="sidebarItems">
              <ExitToApp className="sidebarIcon" />
              <span className="menu-item">LOGOUT</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
