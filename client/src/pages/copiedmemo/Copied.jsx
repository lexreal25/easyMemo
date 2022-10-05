import { Sidebar } from "../../component/sidebar/Sidebar";
import "./pending.css";
import "../../App.css";
import { Table } from "../../component/table/Table";
import { useSelector } from "react-redux";

export const CopiedMemos = () => {
  const userkey = localStorage.getItem("userkey");
  const memo = useSelector((state) =>
    state.memo.Memo.filter(
      (memo) => memo.copy.replace(/ +/g, " ").toLowerCase() === userkey
    )
  );
  return (
    <div className="container">
      <Sidebar />
      <div className="pending">
        <Table info={memo} />
      </div>
    </div>
  );
};
