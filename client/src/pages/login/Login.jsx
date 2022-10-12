import { useEffect } from "react";
import "./login.css";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginStart, loginSuccess } from "../../redux/userRedux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//error handling
const notify = (message) => toast.error(message);
const success = (message) => toast.success(message);

export const Login = () => {
  const [fname, setId] = useState("");
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
        notify(error.message);
      }
      setId("");
      setPassword("");
    } else {
      notify("login details incorrect");
    }
  };
  return (
    <div className="back">
      <form className="login">
        <p>EasyMemo</p>
        <input
          type="text"
          style={{ textTransform: "uppercase" }}
          placeholder="Enter your firstname"
          autoComplete="true"
          value={fname}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="password"
          style={{ textTransform: "uppercase" }}
          placeholder="Enter password"
          autoComplete="true"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="loginBtn" onClick={handleSubmit}>
          LOGIN
        </button>
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
