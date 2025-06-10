import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableDataRows from "./TableDataRows";
import TableHeaderRow from "./TableHeaderRow";

// temporary mock data
import mockData from "../../../../mock-data/event-data.json"

// Define columns for full width screen
const fullColumns = [
  { id: "eventName", label: "Event", minWidth: 270 },
  { id: "location", label: "Location", minWidth: 85 },
  { id: "start", label: "Start-Time", minWidth: 85 },
  { id: "end", label: "End-Time", minWidth: 85 },
  { id: "duration", label: "Duration", minWidth: 85 },
  { id: "lap", label: "Lap", minWidth: 85 },
  { id: "active", label: "Active", minWidth: 90 },
];

const rows = mockData;

const EventsTable = () => {
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
}

export default EventsTable;
