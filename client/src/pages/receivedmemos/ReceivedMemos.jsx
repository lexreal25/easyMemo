import { useEffect } from "react";
import { Sidebar } from "../../component/sidebar/Sidebar";
import { Table } from "../../component/table/Table";
import { useNavigate } from "react-router-dom";
import "./received.css";
import "../../App.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { allComments } from "../../redux/commentRedux";

export const Received = () => {
  const [memos, setMemos] = useState([]);

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

  return (
    <div className="container">
      <Sidebar />
      <div className="sent">
        <Table info={filteredMemos} />
      </div>
    </div>
  );
};
