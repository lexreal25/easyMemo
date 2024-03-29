import "./table.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

export const Table = ({ info }) => {
  const columns = [
    {
      field: "new",
      headerName: "Status",
      width: 80,
    },
    {
      field: "id",
      headerName: "Id",
      width: 150,
    },
    { field: "date", headerName: "Date", width: 100, type: "date" },
    { field: "to", headerName: "Sent To", width: 200, type: "text" },
    { field: "from", headerName: "Sent By", width: 200, type: "text" },
    {
      field: "subject",
      headerName: "Subject",
      sortable: false,
      width: 150,
    },
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
          fontFamily: "sans-serif",
          fontStyle: "normal",
          borderColor: "primary.light",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
        rows={info}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        getRowId={(row) => row.id}
        getRowClassName={(row) =>row.new === true ?"a" : ""}
      />
    </div>
  );
};
