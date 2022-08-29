import "./table.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getMemoSuccess } from "../../redux/memoRedux";

export const Table = () => {
  const dispatch = useDispatch();

  // const userid = useSelector((state) => state.user.currentUser.name);
  const memos = useSelector((state) =>state.memo.Memo) //.find((memo) => memo.to === userid

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/memo/`);
        dispatch(getMemoSuccess(res.data));
        console.log(res.data);
      } catch (error) {}
    };
    fetchData();
  }, [dispatch]);

  //delete memo
  // const handleDelete = (id) => {
  //   setList(list.filter(item => item.id !== id))
  // }
  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "date", headerName: "Date", width: 100, type: "date" },
    { field: "to", headerName: "Sent By", width: 200, type: "text" },
    { field: "from", headerName: "Sent To", width: 200, type: "text" },
    // { field: "reviewed", headerName: "Set To", width: 200, type: "text" },
    {
      field: "subject",
      headerName: "Subject",
      sortable: false,
      width: 150,
    },
    { field: "status", headerName: "Status", width: 80 },
    // { field: "review", headerName: "Reviewed", width: 90 },
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
          boxShadow: 1,
          border: 1,
          fontSize: 12,
          fontStyle: "normal",
          borderColor: "primary.light",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
        rows={memos}
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
