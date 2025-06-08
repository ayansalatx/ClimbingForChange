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

const ProgressTable = ({rows, columns}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(rows.length);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
        <FullscreenToggleButton sx={{ml: ".25rem"}}/>

        <TablePagination
          rowsPerPageOptions={[15, 25, 100, {label: "All", value: rows.length}]}
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
