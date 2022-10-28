import axios from "axios";
import { useEffect, useState } from "react";
import "./signatories.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import "./table/table.css";

export const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
     const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/`, {
        headers: {
          token: "Bearer " + localStorage.getItem("token"),
        },
      });
      setUsers(res.data)
    };
    getUsers();
  }, []);
  console.log(users)
  const columns = [
    { field: "_id", headerName: "ID", width: 70 },
    { field: "createdAt", headerName: "DATE", width: 90, type: "text" },
    { field: "roleId", headerName: "ROLE ID", width: 80, type: "text" },
    { field: "role", headerName: "ROLE", width: 150, type: "text" },
    // {
    //   field: "title",
    //   headerName: "Subject",
    //   description: "This column has a value getter and is not sortable.",
    //   sortable: false,
    //   width: 220,
    //   //   valueGetter: (params) =>
    //   //     `${params.row.title || ""} ${params.row.lastName || ""}`,
    // },
    // { field: "status", headerName: "Status", width: 90 },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/edit/" + params.row.id}>
              <button className="memo-view">VIEW</button>
            </Link>
          </>
        );
      },
    },
  ];


  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        getRowId={(row) => row._id}
      />
    </div>
  );
};
