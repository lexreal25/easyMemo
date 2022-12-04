import { useEffect, useState } from "react";
import { Sidebar } from "../../component/sidebar/Sidebar";
import { Table } from "../../component/table/Table";
import { useNavigate } from "react-router-dom";
import "./sentmemos.css";
import "../../App.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import BasicCard from "../../component/table/Card";
import { Message } from "../../component/noMemo/message";

export const Sent = () => {
  const [sentmemos, setSentMemos] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    }
  }, [navigate]);

  const userkey = localStorage.getItem("userkey");
  const filteredMemos = sentmemos.filter(
    (memo) => memo.from.replace(/ +/g, "").toLowerCase() === userkey
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URI}/memo/`, {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        });
        setSentMemos(res.data);
      } catch (error) {}
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="container">
      <Sidebar />
      <div className="sent">
        {filteredMemos.length !== 0 ? (
          <Table info={filteredMemos} />
        ) : (
          <Message />
        )}
      </div>
    </div>
  );
};
