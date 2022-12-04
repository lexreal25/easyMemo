import { Sidebar } from "../../component/sidebar/Sidebar";
import "./pending.css";
import "../../App.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Notification } from "../../component/notification/notification.js";
import axios from "axios";
import BasicCard from "../../component/table/Card";
import { Message } from "../../component/noMemo/message";
import { Table } from "../../component/table/Table";

export const CopiedMemos = () => {
  const [copied, setCopied] = useState([]);
  const [count] = useState(1);

  const dispatch = useDispatch();
  const userkey = localStorage.getItem("userkey");

  const filteredMemos = copied.filter(
    (allmemos) =>
      allmemos.copy.replace(/ +/g, "").toLowerCase() ||
      allmemos.through.replace(/ +/g, "").toLowerCase() === userkey
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URI}/memo/`, {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        });
        setCopied(res.data);
      } catch (error) {}
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="container">
      <Sidebar msg={count} />
      <div className="pending">
      {filteredMemos.length !== 0 ? (
          <Table info={filteredMemos} />
        ) : (
         <Message/>
        )}
      </div>
      {filteredMemos?.map((memo) =>
        memo.new ? (
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
