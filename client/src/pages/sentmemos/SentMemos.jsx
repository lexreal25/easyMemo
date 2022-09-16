import { useEffect } from "react";
import { Sidebar } from "../../component/sidebar/Sidebar";
import { Table } from "../../component/table/Table";
import { useNavigate } from "react-router-dom";
import "./sentmemos.css";
import "../../App.css";

export const Sent = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    }
  }, [navigate]);
  const data = [
    {
      id: 1,
      to: "amoateng",
      from: "danny",
      date: new Date(),
      subject: "Request for payment",
    },
    {
      id: 2,
      to: "james",
      from: "degraft",
      date: new Date(),
      subject: "Request for payment",
    },
  ];
  return (
    <div className="container">
      <Sidebar />
      <div className="sent">
        <Table info={data} />
      </div>
    </div>
  );
};
