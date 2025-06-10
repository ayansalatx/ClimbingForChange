import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableDataRows from "./TableDataRows";
import TableHeaderRow from "./TableHeaderRow";

// temporary mock data
import mockData from "../../../../mock-data/mountain-data.json";

// Define columns
const fullColumns = [
  { id: "mountainName", label: "Mountain", minWidth: 270 },
  { id: "elevation", label: "Elevation", minWidth: 85 },
];

const rows = mockData;

const MountainsTable = () => {
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

export default MountainsTable;