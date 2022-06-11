import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import "./table.css";
import { useEffect, useState } from "react";
import axios from "axios";

export const Table = () => {
  const [memo, setMemo] = useState("");
  // const [list, setList] = useState([]);
  //fetch memo from database
  useEffect(() => {
    fetchData();
    // setList(memo)
  }, []);
  //delete memo
  // const handleDelete = (id) => {
  //   setList(list.filter(item => item.id !== id))
  // }
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/memo/");
      setMemo(res.data);
      console.log(res.data);
    } catch (error) {}
  };
  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "date", headerName: "Date", width: 100, type: "date" },
    { field: "to", headerName: "Sent By", width: 200, type: "text" },
    { field: "from", headerName: "Set To", width: 200, type: "text" },
    {
      field: "subject",
      headerName: "Subject",
      sortable: false,
      width: 150,
    },
    { field: "status", headerName: "Status", width: 90 },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/memo/" + params.row.id}>
              <button className="memo-view">VIEW</button>
            </Link>
            {/* <Link>
              <button className="memo-view" onClick={handleDelete(params.row.id)}>DELETE</button>
            </Link> */}
          </>
        );
      },
    },
  ];

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        sx={{
          boxShadow: 2,
          border: 1,
          fontSize: 12,
          fontStyle: "normal",
          borderColor: "primary.light",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
        rows={memo}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        getRowId={(row) => row.id}
      />
    </div>
  );
};
