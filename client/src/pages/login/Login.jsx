// import axios from "axios";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { login } from "../../redux/apiCall";
import { loginStart, loginSuccess } from "../../redux/userRedux";
import "./login.css";
export const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit =async (e) => {
    e.preventDefault();
    if (password !== "" || id !== "") {
      try {
        dispatch(loginStart())
        const res= await axios.post('http://localhost:4000/api/auth/login',{
          id, password
        })
        dispatch(loginSuccess(res.data))
        const accessToken = JSON.stringify(res.data.accessToken)
        const token = localStorage.setItem('token', accessToken)
        if(token){
          localStorage.getItem("token")
          navigate("/", {replace: true})
        }
      } catch (error) {
        console.log(error);
      }
      setId("")
      setPassword("");
    } else {
      console.log("login details incorrect");
    }
  };
  return (
    <div className="back">
      <form className="login">
        <p>easyMemo</p>
        <input
          type="text"
          placeholder="Enter your id"
          autoComplete="true"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          autoComplete="true"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="loginBtn" onClick={handleSubmit}>
          LOGIN
        </button>
      </form>
    </div>
  );
};
