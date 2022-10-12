import { useEffect } from "react";
import { Sidebar } from "../../component/sidebar/Sidebar";
import { Table } from "../../component/table/Table";
import { useNavigate } from "react-router-dom";
import "./review.css";
import "../../App.css";
import { useSelector } from "react-redux";
import { useMemo } from "react";

export const Review = () => {
  const navigate = useNavigate();
  const userkey = localStorage.getItem("userkey");

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    }
  }, [navigate]);

  const responder = useSelector((state) =>
    state.comment?.comments.filter(
      (c) => c.receiver.replace(/ +/g, "").toLowerCase() === userkey
    )
  );
  // var props = ["memoId","receiver"]
  console.log(responder.map((id) =>id.memoId.replace(/-/g, "")));
  const filteredMemos = useSelector((state) => state.memo?.Memo);

  const revs = useMemo(
    () => getMatchingMemos(filteredMemos, responder),
    [filteredMemos, responder]
  );

  function getMatchingMemos(m, c) {
    return m.filter((memo) => {
      return c.some((comment) => {
        return memo.memoId === comment.memoId;
      });
    });
  }

  var res = filteredMemos.filter(function (o1) {
    return responder.some(function (o2) {
      return o1.memoId=== "loyalty-1065-2022";
    });
  });

  console.log(res);
  return (
    <div className="container">
      <Sidebar />
      <div className="sent">
        <Table info={revs} />
      </div>
    </div>
  );
};