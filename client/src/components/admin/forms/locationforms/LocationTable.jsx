import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableDataRows from "./TableDataRows";
import TableHeaderRow from "./TableHeaderRow";

// temporary mock data
import mockData from "../../../../mock-data/location-data.json"

// Define columns for full width screen
const fullColumns = [
  { id: "locationName", label: "Location", minWidth: 270 },
  { id: "address", label: "Address", minWidth: 85 },
  { id: "city", label: "City", minWidth: 85 },
  { id: "province", label: "Province", minWidth: 85 },
  { id: "country", label: "Country", minWidth: 85 },
  { id: "lap", label: "Laps", minWidth: 85 },
];

const rows = mockData;

const LocationTable = () => {
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

export default LocationTable;
