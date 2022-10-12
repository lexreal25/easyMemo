import "./sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import {
  Create,
  ExitToApp,
  Settings,
  SendOutlined,
  MailOutlined,
  RateReviewOutlined,
  Person,
} from "@material-ui/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

export const Sidebar = () => {
  const navigate = useNavigate();
  const { fname, lname } = useSelector((state) => state.user.currentUser);
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    notify("Logout successful");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const notify = (message) => toast.success(message);

  return (
    <div className="sidebar">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
              <div className="">
                <Person className="sidebarIcon" />
                <span className="menu-item username">
                  {fname.toUpperCase() + " " + lname.toUpperCase()}
                </span>
              </div>
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
                <Create className="sidebarIcon" />
                <span className="menu-item">RECEIVED MEMOS</span>
              </Link>
            </li>

            <li className="sidebarItems">
              <Link to="/sent" className="links">
                <SendOutlined className="sidebarIcon" />
                <span className="menu-item">SENT MEMOS</span>
              </Link>
            </li>
            <li className="sidebarItems">
              <Link to="/copied" className="links">
                <MailOutlined className="sidebarIcon" />
                <span className="menu-item">COPIED MEMOS</span>
              </Link>
            </li>
            <li className="sidebarItems">
              <Link to="/review" className="links">
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
