import { useEffect } from "react";
import { Sidebar } from "../../component/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { allComments } from "../../redux/commentRedux";

import "./received.css";
import "../../App.css";
import { Notification } from "../../component/notification/notification";
import { Message } from "../../component/noMemo/message";
import { Table } from "../../component/table/Table";

export const Received = () => {
  const [memos, setMemos] = useState([]);
  // const [count, setCount] = useState(10);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userkey = localStorage.getItem("userkey");

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    }
  }, [navigate]);

  const filteredMemos = memos.filter(
    (allmemos) => allmemos.to.replace(/ +/g, "").toLowerCase() === userkey
  );

  const fetchData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URI}/memo/`, {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      });
      setMemos(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URI}/comment/`,
          {
            headers: {
              token: "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
          }
        );
        dispatch(allComments(res.data));
      } catch (error) {}
    };
    fetchComment();
  }, [dispatch]);
  console.log(filteredMemos);
  return (
    <div className="container">
      <Sidebar />
      <div className="sent">
        {filteredMemos.length !== 0 ? (
          <Table info={filteredMemos} />
        ) : (
         <Message/>
        )}
      </div>
      {filteredMemos?.map((memo) =>
        memo.status ==="Pending" ? (
          <Notification
            message={{
              id: memo?.id,
              sender: memo?.sender,
              subject: memo?.subject,
            }}
          />
        ) : null
      )}
    </div>
  );
};
