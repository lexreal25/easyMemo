// import {useHistory} from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import {
  Create,
  ExitToApp,
  Home,
  Settings,
  SendOutlined,
  MailOutlined,
  RateReviewOutlined,
} from "@material-ui/icons";

export const Sidebar = () => {
  // const history = useHistory();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("userDetails");
    // history.push("/login");
  };

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
            <h3 className="sidebarTitle">Menu |</h3>
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
            <li className="sidebarItems">
              <Link to="/" className="links">
                <SendOutlined className="sidebarIcon" />
                <span className="menu-item">SENT MEMOS</span>
              </Link>
            </li>
            <li className="sidebarItems">
              <Link to="/" className="links">
                <MailOutlined className="sidebarIcon" />
                <span className="menu-item">RECEIVED MEMOS</span>
              </Link>
            </li>
            <li className="sidebarItems">
              <Link to="/" className="links">
                <RateReviewOutlined className="sidebarIcon" />
                <span className="menu-item">MEMOS TO REVIEW</span>
              </Link>
            </li>
            <li className="sidebarItems">
              <Link to="/edit/:userId" className="links">
                <Settings className="sidebarIcon" />
                <span className="menu-item">Settings</span>
              </Link>
            </li>

            <li className="sidebarItems">
              <ExitToApp className="sidebarIcon" />
              <span className="menu-item" onClick={handleLogout}>
                LOGOUT
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
