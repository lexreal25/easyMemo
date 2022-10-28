import { useState } from "react";
import "./login.css";

export const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="back">
      <form className="login">
        <p>easyMemo</p>
        <input
          type="text"
          placeholder="Enter your id"
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="loginBtn" onClick={handleSubmit}>
          LOGIN
        </button>
      </form>
    </div>
  );
};
