import { useEffect } from "react";
import { Sidebar } from "../../component/sidebar/Sidebar";
import { Table } from "../../component/table/Table";
import { useNavigate } from "react-router-dom";
import "./sentmemos.css";
import "../../App.css";
import { useSelector } from "react-redux";

export const Sent = () => {
  const navigate = useNavigate();
  const userkey = localStorage.getItem("userkey");

  const filteredMemos = useSelector((state) =>
    state.memo.Memo?.filter(
      (memo) => memo.from.replace(/ +/g, "").toLowerCase() === userkey
    )
  );

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="container">
      <Sidebar />
      <div className="sent">
        <Table info={filteredMemos} />
      </div>
    </div>
  );
};
