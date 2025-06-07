import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableDataRows from "./TableDataRows";
import TableHeaderRow from "./TableHeaderRow";

// temporary mock data
import mockData from "../../mock-data/progressboard-team-only.json";

// Define columns for full width screen
const fullColumns = [
  { id: "team-name", label: "Team", minWidth: 270 },
  { id: "mountain", label: "Mountain", minWidth: 85 },
  { id: "elevation", label: "Elevation", minWidth: 85 },
  { id: "current-elevation", label: "Current Elevation", minWidth: 85 },
  { id: "total-laps", label: "Total Laps", minWidth: 85 },
  { id: "laps-completed", label: "Laps Completed", minWidth: 85 },
  { id: "laps-to-go", label: "Laps To Go", minWidth: 85 },
  { id: "best-lap", label: "Best Lap", minWidth: 85 },
  { id: "time-elapsed", label: "Time Elapsed", minWidth: 90 },
];

const rows = mockData;

const ProgressTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHeaderRow columns={fullColumns} />
          <TableDataRows
            rows={rows}
            columns={fullColumns}
            page={page}
            rowsPerPage={rowsPerPage}
          />
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ProgressTable;
