import React from "react";
import { TableHead, TableRow, TableCell } from "@mui/material";

const TableHeaderRow = ({ columns }) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align || "left"}
            style={{ minWidth: column.minWidth }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeaderRow;
