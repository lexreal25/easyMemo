import { useEffect } from "react";
import { Sidebar } from "../../component/sidebar/Sidebar";

import { useNavigate } from "react-router-dom";
import "./home.css";
import "../../App.css";

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    }
  }, [navigate]);


  return (
    <div className="container">
      <Sidebar />
      <div className="home">{/* <Table info={filteredMemos} /> */}</div>
    </div>
  );
};
