import { useEffect } from "react";
import { Sidebar } from "../../component/sidebar/Sidebar";
import { Table } from "../../component/table/Table";
import { useNavigate } from "react-router-dom";
import "./received.css";
import "../../App.css";
import { useSelector } from "react-redux";

export const Received = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    }
  }, [navigate]);

  const userkey = localStorage.getItem("userkey");

  const filteredMemos = useSelector((state) =>
    state.memo.Memo?.filter(
      (memo) => 
        memo.to.replace(/ +/g, "").toLowerCase()  === userkey
    )
  );
  return (
    <div className="container">
      <Sidebar />
      <div className="sent">
        <Table info={filteredMemos} />
      </div>
    </div>
  );
};
