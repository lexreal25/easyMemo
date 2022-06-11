import { NotificationsNone, Settings } from "@material-ui/icons";
import React from "react";
import "./topbar.css";
// import { Link } from "react-router-dom";
export const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">
            easyMemo{" "}
            <sup style={{ fontSize: "8px", fontWeight: "normal" }}>eM</sup>{" "}
          </span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBag">10</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
        </div>
      </div>
    </div>
  );
};
