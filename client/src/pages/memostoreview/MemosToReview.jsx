import { useEffect, useState } from "react";
import { Sidebar } from "../../component/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import "./review.css";
import "../../App.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Notification } from "../../component/notification/notification";
import { Message } from "../../component/noMemo/message";
import { Table } from "../../component/table/Table";

export const Review = () => {
  const [review, setReview] = useState([]);
  const [comment, setComment] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userkey = localStorage.getItem("userkey");

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    }
  }, [navigate]);

  const responder = comment?.filter(
    (c) => c?.receiver.replace(/ +/g, "").toLowerCase() === userkey
  );

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
      setComment(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URI}/memo/`, {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        });
        setReview(res.data);
      } catch (error) {}
    };
    fetchData();
    fetchComment();
    getMatchingMemos(review, responder);
  }, [dispatch, review, responder]);

  function getMatchingMemos(m, c) {
    return m.filter((memo) => {
      return c.some((comment) => {
        return memo.id === comment.memoId;
      });
    });
  }
  const revs = getMatchingMemos(review, responder);

  return (
    <div className="container">
      <Sidebar />
      <div className="sent">
      {revs.length !== 0 ? (
          <Table details={revs} />
        ) : (
         <Message/>
        )}
      </div>
      {revs?.map((memo) =>
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
