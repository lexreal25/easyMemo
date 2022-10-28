import { Sidebar } from "../../component/sidebar/Sidebar";
import "./pending.css";
import "../../App.css";
import { Table } from "../../component/table/Table";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

export const CopiedMemos = () => {
  const [copied, setCopied] = useState([]);
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
      <Sidebar />
      <div className="pending">
        <Table info={filteredMemos} />
      </div>
    </div>
  );
};
