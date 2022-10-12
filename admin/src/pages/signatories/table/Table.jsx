import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import "./table.css";
import { rows } from "../../../dummyData"
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "date", headerName: "Name", width: 90, type: "text" },
  { field: "to", headerName: "Sent By", width: 200, type: "text" },
  { field: "from", headerName: "Set To", width: 150, type: "text" },
  {
    field: "title",
    headerName: "Subject",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 220,
    //   valueGetter: (params) =>
    //     `${params.row.title || ""} ${params.row.lastName || ""}`,
  },
  { field: "status", headerName: "Status", width: 90 },
  {
    field: "action",
    headerName: "Action",
    width: 100,
    renderCell: (params) => {
      return (
        <>
          <Link to={"/edit/"+params.row.id}>
            <button className="memo-view">VIEW</button>
          </Link>
        </>
      );
    },
  },
];

export const Table = () => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};
