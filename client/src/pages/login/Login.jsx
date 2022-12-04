import { useEffect } from "react";
import "./login.css";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginStart, loginSuccess } from "../../redux/userRedux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//error handling
const notify = (message) => toast.error(message);
const success = (message) => toast.success(message);

export const Login = () => {
  const [fname, setFname] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== "" || fname !== "") {
      try {
        dispatch(loginStart());
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URI}/auth/login`,
          {
            fname,
            password,
          }
        );
        dispatch(loginSuccess(res.data));
        const accessToken = await JSON.stringify(res.data.accessToken);
        localStorage.setItem("token", accessToken);
        if (accessToken) {
          success("Login successful redirecting to homepage");
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 2000);
        }
      } catch (error) {
        notify(error.response.data);
      }
      setFname("");
      setPassword("");
    } else {
      notify("login details incorrect");
    }
  };
  const userid = useSelector((state) =>
    state.user.currentUser?.role.replace(/ +/g, "").toLowerCase()
  );
  localStorage.setItem("userkey", userid);
  return (
    <div className="login-container">
      <div className="side-img">heoo</div>
      <form className="login">
        <div>
          <h2>SIGN IN</h2>
          {/* <p>Enter your first name and password</p> */}
        </div>
        <input
          type="text"
          placeholder="Firstname in caps*"
          autoComplete="true"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password *"
          autoComplete="false"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="loginBtn" onClick={handleSubmit}>
          LOGIN
        </button>
        <span style={{marginTop:'15px',fontSize: "12px",fontFamily:'cursive',textDecoration:'underline'}}>Contact I.T to reset your password if forgotten.</span>
      </form>
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
    </div>
  );
};
