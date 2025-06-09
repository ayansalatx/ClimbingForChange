import React from "react";
import {
  Paper,
  Table,
  TableContainer,
  TablePagination,
  Box,
} from "@mui/material";
import TableDataRows from "./TableDataRows";
import TableHeaderRow from "./TableHeaderRow";
import FullscreenToggleButton from "./FullscreenToggleButton";

const ProgressTable = ({ rows, columns }) => {
  // State for current page number
  const [page, setPage] = React.useState(0);

  // State for number of rows per page (default is full list if less than 100)
  const [rowsPerPage, setRowsPerPage] = React.useState(
    rows.length > 100 ? 100 : rows.length
  );

  // Handle page change via pagination controls
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle changing how many rows to show per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // reset to first page
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ height: "65vh" }}>
        <Table stickyHeader aria-label="team/participant progress table">
          <TableHeaderRow columns={columns} />
          <TableDataRows
            columns={columns}
            rows={rows}
            page={page}
            rowsPerPage={rowsPerPage}
          />
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FullscreenToggleButton sx={{ ml: ".25rem" }} />

        <TablePagination
          rowsPerPageOptions={[
            15,
            25,
            100,
            { label: "All", value: rows.length },
          ]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Paper>
  );
};

export default ProgressTable;
