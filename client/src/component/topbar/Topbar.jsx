// import { NotificationsNone } from "@material-ui/icons";
import React from "react";
import "./topbar.css";
import Logo from "../../assets/Logo.png"
export const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <img src={Logo} alt="logo"  />
          <span className="logo">
           DOCUMENT MANAGEMENT SYSTEM
          </span>
        </div>
        <div className="topRight">
          {/* <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBag">2</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};
