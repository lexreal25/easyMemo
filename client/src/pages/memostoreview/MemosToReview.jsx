import { useEffect, useState } from "react";
import { Sidebar } from "../../component/sidebar/Sidebar";
import { Table } from "../../component/table/Table";
import { useNavigate } from "react-router-dom";
import "./review.css";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import axios from "axios";

export const Review = () => {
  const [review, setReview] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userkey = localStorage.getItem("userkey");

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    }
  }, [navigate]);

  const responder = useSelector((state) =>
    state.comment?.comments.filter(
      (c) => c?.receiver.replace(/ +/g, "").toLowerCase() === userkey
    )
  );
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
  }, [dispatch]);

  const filteredMemos = review.filter(
    (memo) => memo.from.replace(/ +/g, "").toLowerCase() === userkey
  );
  const revs = useMemo(
    () => getMatchingMemos(filteredMemos, responder),
    [filteredMemos, responder]
  );

  function getMatchingMemos(m, c) {
    return m.filter((memo) => {
      return c.some((comment) => {
        return memo.id === comment.memoId;
      });
    });
  }
  // var res = filteredMemos.filter(function (o1) {
  //   return !responder.some(function (o2) {
  //     return o1.id.toString() === o2.memoId.toString();
  //   });
  // });

  return (
    <div className="container">
      <Sidebar />
      <div className="sent">
        <Table info={revs} />
      </div>
    </div>
  );
};
