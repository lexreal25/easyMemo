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
  InboxOutlined,
} from "@material-ui/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

export const Sidebar = ({ msg }) => {
  const navigate = useNavigate();
  const role = useSelector((state) => state.user.currentUser?.role);
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
              flexDirection: "coloumn",
              alignItems: "center",
            }}
          >
            <h3 className="sidebarTitle">Menu |</h3>
            <div
              className=" active"
              style={{
                textDecoration: "underline",
                display: "flex",
                alignItems: "center",
                marginLeft: "5px",
              }}
            >
              <div className="">
                <Person className="sidebarIcon" />
                <span className="menu-item username">
                  {role?.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
          <ul className="sidebarList">
            <Link to="/" className="links">
              <li className="sidebarItems">
                <InboxOutlined className="sidebarIcon" />
                <div>
                  <span className="menu-item">RECEIVED MEMOS</span>
                  {/* <span className="notify"> {msg}</span> */}
                </div>
              </li>
            </Link>
            <Link to="/memo" className="links">
              <li className="sidebarItems">
                <Create className="sidebarIcon" />
                <span className="menu-item">CREATE MEMO</span>
              </li>
            </Link>

            <Link to="/sent" className="links">
              <li className="sidebarItems">
                <SendOutlined className="sidebarIcon" />
                <span className="menu-item">SENT MEMOS</span>
              </li>
            </Link>

            <Link to="/copied" className="links">
              <li className="sidebarItems">
                <MailOutlined className="sidebarIcon" />
                <span className="menu-item">COPIED MEMOS</span>
                {/* <span className="notify"> {msg}</span> */}
              </li>
            </Link>
            <Link to="/review" className="links">
              <li className="sidebarItems">
                <RateReviewOutlined className="sidebarIcon" />
                <span className="menu-item">MEMOS TO REVIEW</span>
              </li>
            </Link>
            <Link to="/edit/:userId" className="links">
              <li className="sidebarItems">
                <Settings className="sidebarIcon" />
                <span className="menu-item">SETTINGS</span>
              </li>
            </Link>
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
